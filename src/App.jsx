import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "코딩 공부하기", completed: false },
    { id: 1, content: "잠 자기", completed: false },
    { id: 2, content: "블로그 포스팅하기", completed: false },
  ]);

  return (
    <div className="container">
      <header>
        <h1>My Todo App</h1>
      </header>
      <main>
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
        <hr />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </main>
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Number(new Date()),
      content: inputValue,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  return (
    <div className="input-group">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button className="add-btn" onClick={handleAddTodo}>
        추가하기
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  todoList: PropTypes.array.isRequired,
  setTodoList: PropTypes.func.isRequired,
};

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  setTodoList: PropTypes.func.isRequired,
};

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  // 삭제 기능
  const handleDelete = () => {
    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
  };

  // 수정 완료 기능
  const handleUpdate = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: editValue } : el
      )
    );
    setIsEditing(false); // 수정 후 다시 보기 모드로
  };

  // 완료 상태 변경 기능
  const handleToggleComplete = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
        
        {isEditing ? (
          <input
            className="edit-input"
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
          />
        ) : (
          <span className="text">{todo.content}</span>
        )}
      </div>

      <div className="button-group">
        {isEditing ? (
          <button className="update-btn" onClick={handleUpdate}>
            저장
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            수정
          </button>
        )}
        <button className="delete-btn" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setTodoList: PropTypes.func.isRequired,
};

export default App;


