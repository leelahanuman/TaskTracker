import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">
      <h1 className="title">📝 TaskTrack</h1>

      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a task..."
          className="input"
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span
              onClick={() => toggleComplete(index)}
              className={`task-text ${task.completed ? "completed" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") toggleComplete(index);
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              className="delete-btn"
              aria-label={`Delete task: ${task.text}`}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
