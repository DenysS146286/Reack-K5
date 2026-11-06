import { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    onAddTask(task.trim());

    setTask("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input type="text" placeholder="Enter a new task..." value={task} onChange={(e) => setTask(e.target.value)}/>
      <button type="submit"> Add Task </button>
    </form>
  );
}

export default AddTaskForm;