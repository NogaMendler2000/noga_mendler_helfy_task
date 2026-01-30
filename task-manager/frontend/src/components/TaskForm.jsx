import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("low");

  function submit(e) {
    e.preventDefault();
    if (!title) return;

    onAdd({ title, description, priority });
    setTitle("");
    setDesc("");
  }

  return (
    <form onSubmit={submit}>
      <input placeholder="Title" value={title}
        onChange={e => setTitle(e.target.value)} />

      <input placeholder="Description" value={description}
        onChange={e => setDesc(e.target.value)} />

      <select value={priority}
        onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button>Add</button>
    </form>
  );
}

export default TaskForm;