import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/tasksApi";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");           // 👈 חדש
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function onAdd(task) {
    try {
      const newTask = await createTask({
        ...task,
        status: "active"
      });
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      alert("Failed to create task");
    }
  }

  async function onUpdate(id, data) {
    try {
      const updated = await updateTask(id, data);
      setTasks(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
      setActiveTask(null);
    } catch (err) {
      alert("Failed to update task");
    }
  }

  async function onDelete(id) {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setActiveTask(null);
    } catch (err) {
      alert("Failed to delete task");
    }
  }

  const visibleTasks = tasks.filter(t =>
    filter === "active" ? t.status === "active" :
    filter === "pending" ? t.status === "pending" :
    filter === "completed" ? t.status === "completed" :
    true
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm onAdd={onAdd} />
      <TaskFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={visibleTasks}
        paused={!!activeTask}
        onSelectTask={setActiveTask}
      />

      {activeTask && (
        <EditTaskModal
          task={activeTask}
          onClose={() => setActiveTask(null)}
          onSave={onUpdate}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default App;