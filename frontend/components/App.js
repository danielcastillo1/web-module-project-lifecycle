import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data})
      })
      .catch()
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      this.state.todos.map(td => {
        return <div key={td.id}>{td.name}</div>
      })
    )
  }
}
