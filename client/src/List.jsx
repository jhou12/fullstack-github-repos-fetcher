import React from 'react'
import Repo from './Repo.jsx'

const List = (props) => {
  return (
    <div>
    <p></p> {props.repos.map(repo => <Repo repo={repo} onEdit={props.onEdit} onDelete={props.onDelete}/>)}
  </div>
  )
}

export default List