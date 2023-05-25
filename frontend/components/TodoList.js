import React from 'react'
import Todo from './Todo'

 class TodoList extends React.Component {
  render() {
    return (
      <div>
      {
        this.props.todos.reduce((acc, td) => {
          if (this.props.displayCompleted || !td.completed) return acc.concat(
            <Todo 
            key={td.id}
            toggleCompleted={this.props.toggleCompleted}
            todo={td}
            />
          )
          return acc
        }, [])
      }
      </div>
    )
  }
}
export default TodoList;