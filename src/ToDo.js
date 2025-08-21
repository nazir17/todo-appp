import { Component } from "react";
import "./ToDo.css";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      error: "",
      newDeadline: "",
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleDeadlineChange = (event) => {
    this.setState({ newDeadline: event.target.value });
  };

  handleAdd = (event) => {
    event.preventDefault();
    const text = this.state.newTodo.trim();
    const deadline = this.state.newDeadline;
    
    if (!text) {
      this.setState({ error: "Todo cannot be empty!" });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      deadline: deadline || null,
    };

    this.setState((prev) => ({
      todos: [...prev.todos, newTodo],
      newTodo: "",
      error: "",
      newDeadline: "",
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

  getDeadlineStatus = (deadline) => {
    if (!deadline) return null;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 0) {
      return `Deadline Expired ${Math.abs(diffDays)} day(s) ago`;
    } else if (diffDays === 0) {
      return "Deadline Today";
    } else {
      return `Deadline in ${diffDays} day(s)`;
    }
  };
  render() {
    const { todos, newTodo, error, newDeadline } = this.state;
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
          <input
            type="date"
            value={newDeadline}
            onChange={this.handleDeadlineChange}
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

                    {todo.deadline && (
                      <small>{this.getDeadlineStatus(todo.deadline)}</small>
                    )}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;
