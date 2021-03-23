const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/friday', {useNewUrlParser: true, useFindAndModify: false})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Mongoose connected.')
})

const repoSchema = new mongoose.Schema({
  repoId: String, // id
  repoName: String, // name
  owner: String, // owner.login
  htmlUrl: String, // html_url
  description: String, // description
  updated: String, // updated_at
  note: String // set as: [empty]
})

const Repo = mongoose.model('Repo', repoSchema)

let top25 = () => {
  return new Promise((resolve, reject) => {
    Repo.find({}).sort({updated: -1}).limit(25).exec(function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// let create = (apiArray, cb) => {
// // take in array, for each find one and update, then send back top 25 on last loop
//   for (let i = 0; i < apiArray.length; i++) {
//     Repo.findOneAndUpdate({repoId: apiArray[i].repoId}, apiArray[i], {upsert: true}, function(err, docs) {
//       if (err) {
//         console.log(err)
//       } else {
//         if (i === apiArray.length - 1) {
//           top25(cb)
//         }
//       }
//     })
//   }
// }

let create = (apiArray) => {
// take in array, for each find one and update, then send back top 25 on last loop

// SOLUTION #1: FOR LOOP WITH PUSHED PROMISES: Remember to make promise for each loop, NOT putting the for loop inside the promise!!!
// let arrayOfPromises = []
// for (let i = 0; i < apiArray.length; i++) {
//   let prom = new Promise((resolve, reject) => {
//     Repo.findOneAndUpdate({repoId: apiArray[i].repoId}, apiArray[i], {upsert: true}, function(err, docs) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(docs)
//       }
//     })
//   })
//   arrayOfPromises.push(prom)
//   }
// return Promise.all(arrayOfPromises)

// SOLUTION #2: ARRAY WITH MAP METHOD THAT RETURNS PROMISE FOR EACH ARRAY ELEMENT
 return apiArray.map(repo => {
    return new Promise((resolve, reject) => {
      Repo.findOneAndUpdate({repoId: repo.repoId}, repo, {upsert: true}, function(err, docs) {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
  })
})

// SOLUTION #3: ARRAY WITH MAP METHOD PLUS .EXEC WHICH RETURNS PROMISE AUTOMATICALLY
  // return apiArray.map(repo => {
  //     Repo.findOneAndUpdate({repoId: repo.repoId}, repo, {upsert: true}).exec()
  // })
}

let update = (edit) => {
  return new Promise((resolve, reject) => {
    console.log('db edit param', edit)
      Repo.findOneAndUpdate({repoId: edit.repoId}, {note: edit.note}, null, function(err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(top25())
        }
      })
  })
}

let del = (id) => {
  return new Promise((resolve, reject) => {
    Repo.deleteOne({repoId: id}, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(top25())
      }
    })
  })
}

module.exports.top25 = top25
module.exports.create = create
module.exports.update = update
module.exports.del = del