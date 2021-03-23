import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        user: ''
      }
      this.onType = this.onType.bind(this)
  }
  onType(e) {
    this.setState({
      user: e.target.value
    })
    // console.log(this.state)
  }
  render() {
    return (
      <div>
        <input type="text" name="search" onChange={(e)=>this.onType(e)}></input>
        <button onClick={()=>this.props.onSubmit(this.state.user)}>Submit</button>
      </div>
    )
  }
}

export default Search