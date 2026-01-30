const API_URL = "http://localhost:4000/api/tasks";

async function handle(res) {
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export const getTasks = () =>
  fetch(API_URL).then(handle);

export const createTask = task =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }).then(handle);

export const updateTask = (id, data) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(handle);

export const toggleTask = id =>
  fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" }).then(handle);

export const deleteTask = id =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });