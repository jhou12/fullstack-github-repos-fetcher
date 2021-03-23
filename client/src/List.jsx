import React from 'react'
import Repo from './Repo.jsx'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: ''
    }
  }
  render() {
    return (
      <div>
        There are {this.props.repos.length} repos.
        <p></p> {this.props.repos.map(repo => <Repo repo={repo} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>)}
      </div>
    )
  }
}

export default List