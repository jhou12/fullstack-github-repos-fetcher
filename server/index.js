const express = require('express')
const app = express()
// const db = require('../database/mongo.js')
const db = require('../database/sequelize.js')
// const db = require('../database/mysql.js')
const github = require('./github.js')

app.use(express.static('./client/dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.post('/repos', (req, res) => {
//   github.getReposByUsername(req.body.search, function(err, apiArray) {
//     if (err) {
//       console.log(err)
//     } else {
//       db.create(apiArray, function(err, data) {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(data)
//         }
//       })
//     }
//   })
// })

app.post('/repos', (req, res) => {
  return github.getReposByUsername(req.body.search)
  .then(response => {
    return db.create(response)
  })
  .then(data => {
    console.log('DATA FROM CREATE', data) // NOT NEEDED, CAN PUT EMPTY PARENS, ONLY HERE FOR DEMONSTRATION PURPOSES!!!
    return db.top25()
  })
  .then(results => {
    // console.log('RESULTS FROM .THEN25', results)
    res.send(results)
  })
  .catch(err => {
    console.log(err)
  })
})

app.get('/repos', (req, res) => {
  db.top25()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    console.log(err)
  })
})

app.put('/update', (req, res)=> {
  db.update(req.body)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    console.log(err)
  })
})

app.delete('/del', (req, res) => {
  db.del(req.body.repoId)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    console.log(err)
  })
})

app.listen(3000, () => {
  console.log('Listening at port 3000.')
})