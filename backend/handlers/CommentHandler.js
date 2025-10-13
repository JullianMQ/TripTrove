import { db } from "../db.js"

const getAllComments = async (req, res) => {
  const comments = await db.collection('comments').find({}).toArray()
  res.json(comments)
}

export { getAllComments }
