const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Mongoose connected.')
})

const repoSchema = new mongoose.Schema({
  repoId: String, // id
  repoName: String, // name
  owner: String, // owner.login
  ownerUrl: String, // owner.html_url
  htmlUrl: String, // html_url
  description: String, // description
  updated: String, // updated_at
  note: String // set as: [empty]
})

const Repo = mongoose.model('Repo', repoSchema)

let top25 = async () => {
  try {
    let results = await Repo.find({}).sort({updated: -1}).limit(25)
    return results
  } catch(e) {
    console.log('db get error:',e)
  }
}

let create = async (apiArray) => {
  try {
      let arrayOfPromises = await apiArray.map(repo => Repo.findOneAndUpdate({repoId: repo.repoId}, repo, {upsert: true}))
      await Promise.all(arrayOfPromises)
      return apiArray
  } catch(e) {
    console.log('db create error:',e)
  }
}

let update = async (edit) => {
  try {
    await Repo.findOneAndUpdate({repoId: edit.repoId}, {note: edit.note})
    let results = await top25()
    return results
  } catch(e) {
    console.log('db update error:',e)
  }
}

let del = async (id) => {
  try {
    await Repo.deleteOne({repoId: id})
    let results = await top25()
    return results
  } catch(e) {
    console.log('db del error:',e)
  }
}

module.exports = {
  top25,
  create,
  update,
  del,
}