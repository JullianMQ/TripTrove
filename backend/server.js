import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { auth } from './utils/auth.js'
import { db } from './db.js'
import { getAllComments, get as getComment, post as createComment, update as updateComment, delete as deleteComment } from './handlers/CommentHandler.js'
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
// list comments and create a new comment
router.get('/comments', getAllComments)
router.post('/comments', createComment)

// single-item routes (get, update, delete)
router.get('/comments/:id', getComment)
router.put('/comments/:id', updateComment)
router.patch('/comments/:id', updateComment)
router.delete('/comments/:id', deleteComment)
//=============================Comments========================================


//=============================Feedbacks========================================
router.get('/feedbacks', getAllFeedbacks)
//=============================Feedbacks========================================


//=============================Posts========================================
router.get('/posts', getAllPosts)
//=============================Posts========================================

app.use(express.json());
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

