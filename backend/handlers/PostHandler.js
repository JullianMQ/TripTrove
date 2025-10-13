import { db } from "../db.js"

const getAllPosts = async (req, res) => {
  const posts = await db.collection('posts').find({}).toArray()
  res.json(posts)
}

export { getAllPosts }
