import { Component } from "react";
import "./ToDo.css";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      error: "",
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAdd = (event) => {
    event.preventDefault();
    const text = this.state.newTodo.trim();
    if (!text) {
      this.setState({ error: "Todo cannot be empty!" });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.setState((prev) => ({
      todos: [...prev.todos, newTodo],
      newTodo: "",
      error: "",
    }));
  };

  handleToggle = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  render() {
    const { todos, newTodo, error } = this.state;
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

            className={`${error ? "input-error" : ""}`}
            placeholder="Add Your Todo..."
            value={newTodo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {error}
        <div className="div">
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleToggle(todo.id)}
                />
                <span>{todo.text}</span>
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
