import React from 'react'
import axios from 'axios'
import Search from './Search.jsx'
import List from './List.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  onSubmit(user) {
    console.log('user to be sent', user)
    axios.post('/repos', {search: user})
    .then(res => {
      console.log(res.data)
      this.setState({
        repos: res.data
      })
    })
  }
  onEdit(repoId, note) {
    console.log('onEdit', repoId, note)
    axios.put('/update', {repoId, note})
    .then(res => {
      console.log(res.data)
      this.setState({
        repos: res.data
      })
    })
  }
  onDelete(repoId) {
    console.log('del active')
    axios.delete('/del', {auth: {user: 'root'}, data: {repoId}})
    .then(res => {
      console.log(res.data)
      this.setState({
        repos: res.data
      })
    })
  }
  componentDidMount() {
    axios('/repos')
    .then(res => {
      console.log('test')
      this.setState({
        repos: res.data
      })
    })
  }
  render() {
    return (
      <div>
        <h1>GitHub Fetcher App</h1>
        <Search onSubmit={this.onSubmit}/>

        <p></p>Top 25 Repos:
        <p></p><List repos={this.state.repos} onEdit={this.onEdit} onDelete={this.onDelete}/>
      </div>
    )
  }
}

export default App;