import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    todoNameInput: "",
    displayCompleted: "",
  }
  todoNameChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: "" })

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/ ${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }



  render() {
    return (
      <div>
        {
          this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleted || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}> {td.name} {td.completed ? " ✅" : ""}</div>
            )
            return acc
          }, [])

          

        }
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.todoNameChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}> {this.state.displayCompleted ? "Hide" : "Show"} Completed</button>
      </div>
    )
  }
}
