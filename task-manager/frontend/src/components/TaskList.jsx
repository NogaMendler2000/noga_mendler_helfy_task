import TaskItem from "./TaskItem";
import "../styles/carousel.css";

function TaskList({ tasks, paused, onSelectTask }) {
  if (!tasks.length) {
    return <p>No tasks available</p>;
  }

  const loopedTasks = [...tasks, ...tasks];

  return (
    <div className={`carousel ${paused ? "paused" : ""}`}>
      <div className="track">
        {loopedTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onClick={() => onSelectTask(task)}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;