import React from 'react'

 class TodoList extends React.Component {
  render() {
    return (
      <div>
      {
        this.props.todos.reduce((acc, td) => {
          if (this.props.displayCompleted || !td.completed) return acc.concat(
            <div onClick={this.props.toggleCompleted(td.id)} key={td.id}> {td.name} {td.completed ? " ✅" : ""}</div>
          )
          return acc
        }, [])
      }
      </div>
    )
  }
}
export default TodoList;