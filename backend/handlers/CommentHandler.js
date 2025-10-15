import { ObjectId } from "mongodb";
import { db } from "../db.js"

// --- Core handlers (keep these names for compatibility) ---
const getAllComments = async (req, res, next) => {
  try {
    const comments = await db.collection('comments').find({}).toArray()
    res.json(comments)
  } catch (err) {
    next(err)
  }
}

const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const newComment = {
      content,
      userId: userId ?? null,
      postId: postId ?? null,
      createdAt: new Date()
    }

    const result = await db.collection('comments').insertOne(newComment)
    res.status(201).json({ _id: result.insertedId, ...newComment });
  } catch (err) {
    next(err)
  }
}

const updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Comment ID" });
    }

    const { content } = req.body;

    const updateDoc = {};
    if (content !== undefined) updateDoc.content = content;

    const result = await db.collection("comments").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(result.value);
  } catch (err) {
    next(err)
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Comment ID" });
    }

    const result = await db.collection('comments').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

// --- New, minimal express-style names requested (get/post/update/delete) ---
// `get` supports both collection and single-item fetch when `req.params.id` is provided.
const get = async (req, res, next) => {
  try {
    const id = req.params?.id
    if (id) {
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid Comment ID' })
      const comment = await db.collection('comments').findOne({ _id: new ObjectId(id) })
      if (!comment) return res.status(404).json({ error: 'Comment not found' })
      return res.json(comment)
    }
    return await getAllComments(req, res, next)
  } catch (err) {
    next(err)
  }
}

const post = createComment
const update = updateComment
// `delete` is a reserved word in some contexts; export it as an alias to deleteComment

export { getAllComments, createComment, updateComment, deleteComment }
export { get, post, update }
export { deleteComment as delete }
