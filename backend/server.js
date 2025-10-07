import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { auth } from './utils/auth.js'
import { db } from './db.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// TODO: for testing only
app.get('/users', async (req, res) => {
  res.send(await db.collection("users").find().limit(20).toArray())
})

app.get('/movies', async (req, res) => {
  res.send(await db.collection("movies").find().limit(20).toArray())
})
// TODO: for testing only

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

