function TaskItem({ task, onClick }) {
  return (
    <div className="task" onClick={onClick}>
      <span className={`badge ${task.priority}`}>
        {task.priority}
      </span>

      <span className={`status ${task.status}`}>
        {task.status}
      </span>

      <h3 className="task-title">{task.title}</h3>

      <p className="task-desc">
        {task.description || "No description"}
      </p>
    </div>
  );
}

export default TaskItem;