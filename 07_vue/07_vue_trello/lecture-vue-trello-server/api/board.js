const models = require('../models')

const create = async (req, res) => {
  const userId = req.user.id
  let { title } = req.body
  
  if (!title) res.status(400).end('no title')

  const board = models.Board.build({ title, userId })
  await board.save()
  await models.List.bulkCreate([
    { title: 'Todo', pos: 65535,  boardId: board.id},
    { title: 'Doing', pos: 65535 * 2, boardId: board.id},
    { title: 'Done', pos: 65535 * 4, boardId: board.id},
  ])
  
  res.status(201).json({ item: board })
}

const query = async (req, res) => {
  const userId = req.user.id
  const list = await models.Board.findAll({ where: {userId} })
  res.json({ list })
}

const get = async (req, res) => {
  const { id } = req.params
  const item = await models.Board.findOne({ 
    where: { id },
    include: [{
      model: models.List,
      include: [{
        model: models.Card,
      }]
    }],
  })
  if (!item) return res.status(404).end()

  item.lists.sort((a, b) => a.pos - b.pos)
  item.lists.forEach(list => {
    list.cards.sort((a, b) => a.pos - b.pos)
  })

  res.json({ item })
}

const update = async (req, res) => {
  const { id } = req.params
  let body = req.body

  let board = await models.Board.findOne({ where: { id } })

  if (!board) return res.status(404).end()

  Object.keys(body).forEach(key => {
    let value = body[key]
    if (typeof value === 'string') value = value.trim()

    if (!value) return
    board[key] = value
  })

  await board.save()

  res.json({ item: board })
}

const destroy = async (req, res) => {
  const { id } = req.params
  await models.Board.destroy({ where: { id } })
  res.status(204).end()
}

module.exports = {
  create,
  query,
  get,
  update,
  destroy
}