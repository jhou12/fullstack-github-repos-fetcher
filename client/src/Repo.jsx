import React from 'react'

class Repo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: ''
    }
    this.onType = this.onType.bind(this)
  }
  onType(e) {
    this.setState({
      note: e.target.value
    })
  }
  render() {
    return (
      <div>
        Repo: <a href={this.props.repo.htmlUrl}>{this.props.repo.repoName}</a>,
        RepoId: {this.props.repo.repoId},
        Owner: {this.props.repo.owner},
        Description: {this.props.repo.description},
        Updated: {this.props.repo.updated}
        <br/>NOTE: {this.props.repo.note} <input type="text" name="note" onChange={(e)=>this.onType(e)}></input>
        <button onClick={()=>this.props.onEdit(this.props.repo.repoId, this.state.note)}>Edit Note</button>
        <button onClick={()=>this.props.onDelete(this.props.repo.repoId)}>Delete Repo</button><p></p>
      </div>
    )
  }
}

export default Repo