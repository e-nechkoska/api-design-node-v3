// ne se povikuva pravilniot test ?
// what is mocking?
// what is compund index?
// what is payload

export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id })
  res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({ ...req.body, createdBy: req.user._id }) // what is ... object spread?
  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true } // to return the updated object
  )

  if (!doc) {
    return res.status(404).end()
  }
  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id
    })
    .exec()

  if (!doc) {
    return res.status(404).end()
  }
  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
