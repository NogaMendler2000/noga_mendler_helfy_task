const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

/**
 * Task structure:
 * {
 *   id: number,
 *   title: string,
 *   description: string,
 *   priority: "low" | "medium" | "high",
 *   status: "active" | "pending" | "completed",
 *   createdAt: string
 * }
 */

let tasks = [];
let nextId = 1;

/* =========================
   GET – all tasks
========================= */
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

/* =========================
   POST – create task
========================= */
app.post("/api/tasks", (req, res) => {
  const { title, description = "", priority = "low", status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: nextId++,
    title,
    description,
    priority,
    status: status || "active", // 👈 ברירת מחדל
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json(task);
});

/* =========================
   PUT – update task
========================= */
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, priority, status } = req.body;

  if (status && !["active", "pending", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (status !== undefined) task.status = status;

  res.json(task);
});

/* =========================
   DELETE – remove task
========================= */
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.sendStatus(204);
});

/* =========================
   Root (optional)
========================= */
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});