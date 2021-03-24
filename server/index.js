const express = require('express')
const app = express()
// const db = require('../database/mongo.js') // USE FOR MONGO
// const db = require('../database/sequelize.js') // USE FOR SEQUELIZE
const db = require('../database/mysql.js') // USE FOR MYSQL
const api = require('./github.js')
const port = 3000

app.use(express.static('./client/dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/get', async (req, res) => {
  try {
      const results = await db.top25();
      console.log('server test', results)
      return res.status(200).json(results);
  } catch (error) {
      console.log(error);
  }
});

// app.get('/get', async (req,res) => {
//   try {
//     let data = await db.top25()
//     console.log('server test', data)
//     res.send(data)
//   } catch(e) {
//     console.log('server get error')
//   }
// })
// app.get('/get', (req, res) => {
//   return db.top25()
//   .then(data => {
//     console.log('server test', data)
//     res.status(200).send(data)
//   })
//   .catch(err => {
//     res.status(404).send('server get error')
//   })
// })

app.post('/add', (req, res) => {
  return api.getReposByUsername(req.body.search)
  .then(response => {
    return db.create(response)
  })
  .then(results => {
    res.status(200).send(results)
  })
  .catch(err => {
    res.status(404).send('server post error')
  })
})

app.put('/update', (req, res)=> {
  db.update(req.body)
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(404).send('server update error')
  })
})

app.delete('/del', (req, res) => {
  db.del(req.body.repoId)
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(404).send('server delete error')
  })
})

app.listen(port, () => {
  console.log(`Listening at port ${port}.`)
})