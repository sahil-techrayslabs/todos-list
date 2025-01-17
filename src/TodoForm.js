import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      addTodo(task, dueDate, priority);
      setTask("");
      setDueDate("");
      setPriority("Low");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Select Due Date"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        
      >
        <option value="Low">Priority:- Low</option>
        <option value="Medium">Priority:- Medium</option>
        <option value="High">Priority:- High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
