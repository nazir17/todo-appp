import { Component } from "react";


class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAdd = (event) => {
    event.preventDefault();
    const text = this.state.newTodo.trim();
    if (!text) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text,
    };

    this.setState((prev) => ({
      todos: [...prev.todos, newTodo],
      newTodo: "",
    }));
  };
  
  render() {
    const { todos, newTodo } = this.state;
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.handleAdd}>
          <input
            type="text"
            placeholder="Add Your Todo..."
            value={newTodo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <div>
          <ul>
            {todos.map((todo) => (

              <li key={todo.id}>
                {todo.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;
