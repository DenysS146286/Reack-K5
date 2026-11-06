
import { useState } from "react";

import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";

import "./App.css";

function App() {
  // Main tasks state
  const [tasks, setTasks] = useState([]);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Add new task
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks([...tasks, newTask]);
  }

  // Complete or activate task
  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  // Delete task
  function deleteTask(id) {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <div className="app">

      <h1>My To-Do List</h1>

      <p className="subtitle">
        Organize your tasks and stay productive.
      </p>

      <TaskStats tasks={tasks} />

      <AddTaskForm onAddTask={addTask} />

      <div className="filters">

        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

    </div>
  );
}

export default App;
