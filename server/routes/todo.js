import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Add todo

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1,$2) RETURNING *",
      [description, completed || false],
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get todo

router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server Error");
  }
});

// Update todo

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed || false, id],
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server failure");
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.send("Task deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
export default router;
