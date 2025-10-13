import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { auth } from './utils/auth.js'
import { db } from './db.js'
import { getAllComments } from './handlers/CommentHandler.js'
import { getAllFeedbacks } from './handlers/FeedbackHandler.js'
import { getAllPosts } from './handlers/PostHandler.js'

const app = express()
const router = express.Router()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

router.all('/auth/{*any}', toNodeHandler(auth));

//=============================Comments========================================
router.get('/comments', async (req, res) => {
  await getAllComments(req, res)
})
//=============================Comments========================================


//=============================Feedbacks========================================
router.get('/feedbacks', async (req, res) => {
  await getAllFeedbacks(req, res)
})
//=============================Feedbacks========================================


//=============================Posts========================================
router.get('/posts', async (req, res) => {
  await getAllPosts(req, res)
})
//=============================Posts========================================

app.use(express.json());
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

