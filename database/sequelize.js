const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
  // host: 'localhost', // don't need b/c default
  dialect: 'mysql',
  database: 'friday',
  username: 'root',
  password: ''
});

sequelize
.authenticate()
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
  htmlUrl: Sequelize.TEXT,
  description: Sequelize.TEXT,
  updated: Sequelize.TEXT,
  note: Sequelize.TEXT
},{ timestamps: false // must include or else get error!!!
})

Repo.sync()
.then(() => console.log('Repo synced.'))
.catch(err => console.log('Repo sync error:', err))

let top25 = () => {
    return Repo.findAll({
      order: sequelize.literal('updated DESC'), // make sure most recent first!!!
      limit: 25
    })
}

let create = (apiArray) => {
  return apiArray.map(repo => {
    Repo.findOrCreate({
      defaults: repo,
      where: {
        repoId: repo.repoId
      }
    })
  })
}

let update = (edit) => {
  return Repo.update({note: edit.note}, {where: {repoId: edit.repoId}})
  .then(() => top25())
  .catch(err => console.log(err))
}

let del = (id) => {
  return Repo.destroy({where: {repoId: id}})
  .then(() => top25())
  .catch(err => console.log(err))
}

module.exports.create = create
module.exports.top25 = top25
module.exports.update = update
module.exports.del = del
