import React from 'react'
import Repo from './Repo.jsx'

class List extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p></p> {this.props.repos.map(repo => <Repo repo={repo} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>)}
      </div>
    )
  }
}

export default List