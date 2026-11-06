
import { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Check if input is empty
    if (task.trim() === "") {
      return;
    }

    // Add task
    onAddTask(task.trim());

    // Clear input
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">

      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default AddTaskForm;
