import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search.jsx'
import List from './List.jsx'

const App = (props) => {
  const [repos, setRepos] = useState([])

  const onSubmit = (user) => {
    axios.post('/add', {search: user})
    .then(res => setRepos(res.data))
  }
  const onEdit = (repoId, note) => {
    axios.put('/update', {repoId, note})
    .then(res => setRepos(res.data))
  }
  const onDelete = (repoId) => {
    axios.delete('/del', {
      auth: {user: 'root'},
      data: {repoId},
    })
    .then(res => setRepos(res.data))
  }
  useEffect(()=> {
    axios('/get')
    .then(res => setRepos(res.data))
  }, [])
  return (
    <div>
    <h1>GitHub Fetcher App</h1>
    <Search onSubmit={onSubmit}/>

    <p></p>Top 25 Repos:
    <p></p><List repos={repos} onEdit={onEdit} onDelete={onDelete}/>
  </div>
  )
}

export default App;