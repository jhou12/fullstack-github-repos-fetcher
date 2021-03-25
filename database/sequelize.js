const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.SQL_DB,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  logging: false,
});

sequelize.authenticate()
.then(() => console.log('Sequelize connected.'))
.catch(err => console.error('Sequelize connection error:', err))

const Repo = sequelize.define('Repo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  repoId: Sequelize.TEXT,
  repoName: Sequelize.TEXT,
  owner: Sequelize.TEXT,
  ownerUrl: Sequelize.TEXT,
  htmlUrl: Sequelize.TEXT,
  description: Sequelize.TEXT,
  updated: Sequelize.TEXT,
  note: Sequelize.TEXT
},{ timestamps: false
})

Repo.sync()
.then(() => console.log('Repo synced.'))
.catch(err => console.log('Repo sync error:', err))

let top25 = async () => {
  try {
    let results = await Repo.findAll({
      order: sequelize.literal('updated DESC'),
      limit: 25
    })
    return results
  } catch(e) {
    console.log('db top25 error:',e)
  }
}

let create = async (apiArray) => {
  try {
    await apiArray.map(repo => {
      Repo.findOrCreate({
        defaults: repo,
        where: { repoId: repo.repoId }
      })
    })
    return apiArray
  } catch(e) {
    console.log('db create error:',e)
  }
}

let update = async (edit) => {
  try {
    await Repo.update(
      {note: edit.note},
      {where: {repoId: edit.repoId}}
      )
    let results = await top25()
    return results
  } catch(e) {
    console.log('db update error:',e)
  }
}

let del = async (id) => {
  try {
    await Repo.destroy({where: {repoId: id}})
    let results = await top25()
    return results
  } catch(e) {
    console.log('db delete error:',e)
  }
}

module.exports = {
  top25,
  create,
  update,
  del,
}