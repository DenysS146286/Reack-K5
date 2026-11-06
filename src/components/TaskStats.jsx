function TaskStats({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const activeTasks = totalTasks - completedTasks;
  
    return (
      <div className="task-stats">
  
        <div className="stat">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
  
        <div className="stat">
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>
  
        <div className="stat">
          <h3>{activeTasks}</h3>
          <p>Active</p>
        </div>
  
      </div>
    );
  }
  
export default TaskStats;