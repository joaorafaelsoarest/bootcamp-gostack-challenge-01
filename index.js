
const express = require('express'); lodash = require('lodash')

let data = []

const server = express()
server.use(express.json())

// MIDDLEWARES

server.use((req, res, next) => {
  console.count(req)

  next()
})

const checkId = (req, res, next) => {
  const { id } = req.params
  const existId = lodash.some(data, { "id": id })

  if(!existId){
    return res.status(400).json({ error: "Id not found"})
  }
  next()
}

// CRUD Simple

server.get('/projects', (req, res) => {
  return res.json(data)
})

server.post('/projects', (req, res) => {
  data.push(req.body)

  return res.json(data)
})

server.post('/projects/:id/tasks', checkId, (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const indexData = lodash.findIndex(data, { id: id })
  data[indexData].tasks.push(name)

  return res.json(data);
})

server.put('/projects/:id', checkId, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const indexData = lodash.findIndex(data, { id: id })
  lodash.set(data[indexData], 'title', title)

  return res.send()
})

server.delete('/projects/:id', checkId, (req, res) => {
  const { id } = req.params
  const indexData = lodash.findIndex(data, { id: id })
  delete data[indexData]

  return res.json(data)
})

server.listen(3000)