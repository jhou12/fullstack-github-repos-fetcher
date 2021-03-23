const axios = require('axios');
// const config = require('../config.js');

let getReposByUsername = (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      // 'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios(options) // REMEMBER TO RETURN AXIOS PROMISE!!!
  .then(res => {
    let formatted = []
    for (let i = 0; i < res.data.length; i++) {
      let repo = {}
      repo.repoId = res.data[i].id
      repo.repoName = res.data[i].name
      repo.owner = res.data[i].owner.login
      repo.htmlUrl = res.data[i].html_url
      repo.description = res.data[i].description
      repo.updated = res.data[i].updated_at
      repo.note = '[empty]'
      formatted.push(repo)
    }
    // console.log(formatted)
    return formatted
  })
}

module.exports.getReposByUsername = getReposByUsername;