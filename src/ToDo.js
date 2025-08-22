import { Component } from "react";
import "./ToDo.css";
import deleteImage from "./images/delete.svg";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      error: "",
      newDeadline: "",
      filter: "all",
    };
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
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

  setFilter = (filter) => {
    this.setState({ filter });
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
    const { todos, newTodo, error, newDeadline, filter } = this.state;

    const filteredTodos = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    return (
      <div className="todo-app">
        <div className="header">
          <form onSubmit={this.handleAdd} className="todo-form">
            <input
              type="text"
              className={`todo-input ${error ? "input-error" : ""}`}
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={this.handleChange}
            />
            <input
              type="date"
              className="deadline-input"
              value={newDeadline}
              onChange={this.handleDeadlineChange}
            />
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="todo-list-container">
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-left">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => this.handleToggle(todo.id)}
                  />
                  {todo.isEditing ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={todo.text}
                      onChange={(e) =>
                        this.handleEditChange(todo.id, e.target.value)
                      }
                    />
                  ) : (
                    <span className="todo-text">{todo.text}</span>
                  )}
                </div>

                <div className="todo-center">
                  {todo.deadline && (
                    <small className="deadline-text">
                      {this.getDeadlineStatus(todo.deadline)}
                    </small>
                  )}
                </div>

                <div className="todo-right">
                  {todo.isEditing ? (
                    <button
                      className="save-btn"
                      onClick={() => this.handleEditSave(todo.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => this.handleEdit(todo.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(todo.id)}
                  >
                    <img
                      src={deleteImage}
                      alt="delete-icon"
                      className="delete-image"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="todo-footer">
          <span>items left: {todos.filter((t) => !t.completed).length}</span>
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => this.setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => this.setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => this.setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDo;
