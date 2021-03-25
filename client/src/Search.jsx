import React, { useState } from 'react'

const Search = (props) => {
  const [user, setUser] = useState('')
  const onType = (e) => {
    setUser(e.target.value)
  }
  return (
    <div>
    <input type="text" name="search" onChange={(e)=>onType(e)}></input>
    <button onClick={()=>props.onSubmit(user)}>Submit</button>
  </div>
  )
}

export default Search