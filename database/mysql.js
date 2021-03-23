const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'friday'
})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting' + err.stack)
    return;
  } else {
    console.log('MySQL connected.')
  }
})

let top25 = (cb) => {
  connection.query(`SELECT * FROM repos ORDER BY updated LIMIT 25;`, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      cb(null, results)
    }
  })
}

let create = (apiArray, cb) => {
  // loop thru array, for each element find element by id, if no elemetn found, insert, then ON LAST LOOP send back top25, if element found, update, then ON LAST LOOP send back top25
  for (let i = 0; i < apiArray.length; i++) {
    connection.query(`SELECT * FROM repos WHERE repoId='${apiArray[i].repoId}';`, function(error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results.length === 0) {
          connection.query(`INSERT INTO repos (repoId, repoName, owner, htmlUrl, description, updated, note) VALUE ('${apiArray[i].repoId}', '${apiArray[i].repoName}', '${apiArray[i].owner}', '${apiArray[i].htmlUrl}', '${apiArray[i].description}', '${apiArray[i].updated}', '${apiArray[i].note}');`, function(error, results, fields) {
            if (error) {
              throw error;
            } else {
              if (i === apiArray.length - 1) {
                top25(cb)
              }
            }
          })
        } else {
          connection.query(`UPDATE repos SET repoName='${apiArray[i].repoName}', owner='${apiArray[i].owner}', htmlUrl='${apiArray[i].htmlUrl}', description='${apiArray[i].description}', updated='${apiArray[i].updated}', note='${apiArray[i].note}' WHERE repoId='${apiArray[i].repoId}';`, function(error, results, fields) {
            if (error) {
              throw error;
            } else {
              if (i === apiArray.length - 1) {
                top25(cb)
              }
            }
          })
        }
      }
    })
  }
}

let read = (cb) => {
  top25(cb)
}

let update = (edit, cb) => {
  connection.query(`UPDATE repos SET note='${edit.note}' WHERE repoId='${edit.repoId}';`, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      top25(cb)
    }
  })
}

let del = (id, cb) => {
  connection.query(`DELETE FROM repos WHERE repoId='${id}';`, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      top25(cb)
    }
  })
}

module.exports.create = create
module.exports.read = read
module.exports.update = update
module.exports.del = del