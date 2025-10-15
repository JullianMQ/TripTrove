import { ObjectId } from "mongodb"
import { db } from "../db.js"

// GET all comments
const getAllComments = async (req, res, next) => {
  try {
    const comments = await db.collection("comments").find({}).toArray()
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
}

// POST a new comment
const addComment = async (req, res, next) => {
  try {
    const { author, text } = req.body

    if (!author || !text) {
      return res.status(400).json({ error: "Author and text are required" })
    }

    const newComment = {
      author,
      text,
      createdAt: new Date(),
    }

    const result = await db.collection("comments").insertOne(newComment)
    res.status(201).json({ _id: result.insertedId, ...newComment })
  } catch (err) {
    next(err)
  }
}

// UPDATE a comment by ID
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid comment ID" })
    }

    const { text } = req.body
    if (!text) {
      return res.status(400).json({ error: "Text field is required" })
    }

    const result = await db.collection("comments").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text, updatedAt: new Date() } },
      { returnDocument: "after" }
    )

    if (!result.value) {
      return res.status(404).json({ error: "Comment not found" })
    }

    res.json(result.value)
  } catch (err) {
    next(err)
  }
}

// DELETE a comment by ID
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid comment ID" })
    }

    const result = await db.collection("comments").deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" })
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export { getAllComments, addComment, updateComment, deleteComment }
