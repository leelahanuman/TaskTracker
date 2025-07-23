// TaskList.jsx
import React from "react";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul style={{ marginTop: "20px" }}>
      {tasks.map((task, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
          <span
            onClick={() => onToggleComplete(index)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
          </span>
          <button
            onClick={() => onDelete(index)}
            style={{ marginLeft: "10px" }}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
