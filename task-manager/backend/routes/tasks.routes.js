const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

// REST endpoints
router.get("/", controller.getAllTasks);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/toggle", controller.toggleTask);

module.exports = router;