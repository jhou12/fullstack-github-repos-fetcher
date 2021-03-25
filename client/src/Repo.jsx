import React, { useState } from 'react'

const Repo = (props) => {
  const [note, setNote] = useState('')
  const onType = (e) => {
    setNote(e.target.value)
  }
  return (
    <div>
    Repo: <a href={props.repo.htmlUrl}>{props.repo.repoName}</a>,
    RepoId: {props.repo.repoId},
    Owner: {props.repo.owner},
    Description: {props.repo.description},
    Updated: {props.repo.updated}
    <br/>NOTE: {props.repo.note} <input type="text" name="note" onChange={(e)=>onType(e)}></input>
    <button onClick={()=>props.onEdit(props.repo.repoId, note)}>Edit Note</button>
    <button onClick={()=>props.onDelete(props.repo.repoId)}>Delete Repo</button><p></p>
  </div>
  )
}

export default Repo