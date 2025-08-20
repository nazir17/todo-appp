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

  handleDelete = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleEdit = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      ),
    }));
  };

  handleEditChange = (id, newText) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }));
  };

  handleEditSave = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
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
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) =>
                      this.handleEditChange(todo.id, e.target.value)
                    }
                  />
                ) : (
                  <>
                    <span>{todo.text}</span>
                  </>
                )}
                {todo.isEditing ? (
                  <button onClick={() => this.handleEditSave(todo.id)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => this.handleEdit(todo.id)}>Edit</button>
                )}
                <button onClick={() => this.handleDelete(todo.id)}>
                  Delete
                </button>
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
