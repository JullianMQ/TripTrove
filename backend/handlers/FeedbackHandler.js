import { db } from "../db.js"

const getAllFeedbacks = async (req, res) => {
  const feedbacks = await db.collection('feedbacks').find({}).toArray()
  res.json(feedbacks)
}

export { getAllFeedbacks }
