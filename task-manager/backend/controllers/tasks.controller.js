let tasks = [];
let nextId = 1;

function findTask(id) {
  return tasks.find(t => t.id === id);
}

// GET 
exports.getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

// POST 
exports.createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required" });
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority" });
  }

  const task = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
    priority
  };

  tasks.push(task);
  res.status(201).json(task);
};

// PUT 
exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  const task = findTask(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, completed, priority } = req.body;

  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ error: "Invalid priority" });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;
  task.priority = priority ?? task.priority;

  res.status(200).json(task);
};

// DELETE 
exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
};

// PATCH 
exports.toggleTask = (req, res) => {
  const id = Number(req.params.id);
  const task = findTask(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.status(200).json(task);
};