import { ObjectId } from "mongodb";
import { db } from "../db.js"

const getAllFeedbacks = async (req, res, next) => {
  try {
  const feedbacks = await db.collection('feedbacks').find({}).toArray()
  res.json(feedbacks)
} catch (err){
  next (err)
}
}

const createFeedback = async (req, res, next) => {
  try {
    const {message, rating, userId} = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required"});
    }

    const newFeedback = {
      message,
      rating: rating ?? null,
      userId: userId ?? null,
      createdAt: new Date()
    }
    const result = await db.collection('feedback').insertOne(newFeedback)
    res.status(201).json({_id: result.inserteId, ...newFeedback});
  } catch (err) {
    next (err)
  }
}

const updateFeedback = async (req,res,next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({error: "Invalid Feedback ID"});
    }
    const {message, rating} = req.body;

    const updateDoc = {};
    if (message !== undefined) updateDoc.message = message
    if (rating !== undefined) updateDoc.rating = rating

    const result= await db.collection("feedbacks").findOneandUpfate(
      {_id: new ObjectId(id) },
      {$set: updateDoc },
      {returnDocument: "after"}
    );
    if (!result.value) {
      return res.status(404).json({ error: "Feedback not found"});
    }
    res.json(result.value);
  }
  catch (err) {
    next(err)
  }
}

const deleteFeedback = async(req,res,next) => {
  try {
    const id =req.params.id;
    if (!objectId.isValid(id)) {
      return res.status(400).json({ error: "Feedback invalid"});
    }
    const result = await db.collection('feedbacks').deleteOne({_id: new ObjectId(id)});
    if(result.deleteCount === 0) {
      return res.status(404).json({error: "Feedback not found"});
    }
    res.status(204).end()
  } catch (err) {
    next (err)
  }
}
export { getAllFeedbacks, createFeedback, updateFeedback, deleteFeedback }
