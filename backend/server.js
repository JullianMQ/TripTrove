import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { auth } from './utils/auth.js'
import { db } from './db.js'
const app = express()
const router = express.Router()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

