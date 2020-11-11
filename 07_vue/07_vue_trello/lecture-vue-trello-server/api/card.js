const models = require('../models')

const create = async (req, res) => {
  const userId = req.user.id
  let { title, listId, pos } = req.body

  if (!title) res.status(400).end('no title')
  if (!listId) res.status(400).end('no listId')

  const card = models.Card.build({ title, pos, listId, userId })
  await card.save()

  res.status(201).json({ item: card })
}

const get = async (req, res) => {
  const {id} = req.params
  if (!id) return res.status(400).json({error: 'no id'})

  const card = await models.Card.findOne({ 
    where: {id}
  })

  res.json({ item: card })
}

const update = async (req, res) => {
  const {id} = req.params
  let body = req.body

  if (!id) return res.status(400).json({error: 'no id'})

  const card = await models.Card.findOne({
    where: { id }
  })
  if (!card) return res.status(404).json({error: 'no card'})

  Object.keys(body).forEach(key => {
    let value = body[key]
    if (typeof value === 'string') value = value.trim()
    if (key === 'description' || value)  {
      card[key] = value
    }
  })

  await card.save()

  res.json({ item: card })
}

const destroy = async (req, res) => {
  const { id } = req.params
  await models.Card.destroy({ where: { id } })
  res.status(204).end()
}

module.exports = {
  create,
  get,
  update,
  destroy
}