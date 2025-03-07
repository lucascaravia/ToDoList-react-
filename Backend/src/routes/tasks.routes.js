import express from "express";
import { createTask, getTasks, deleteTask, updateTask, getTask } from "../controllers/tasks.controllers.js";

import { auth } from "../middlewares/auth.middleware.js"; // Importar autenticación

const router = express.Router();

router.get("/tasks", auth, getTasks);
router.post("/tasks", auth, createTask); 
router.delete("/tasks/:id", auth, deleteTask);
router.put("/tasks/:id", auth, updateTask);
router.get("/tasks/:id", auth, getTask);

export default router;
