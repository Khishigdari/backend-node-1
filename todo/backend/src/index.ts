import cors from "cors";
import express, { Application, Request, Response } from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";

// const express = require("express");
const app: Application = express();
const port = 3000;
// const cors = require("cors");

// let tasks = [
//   { id: "1", name: "Task-1", isDone: "false" },
//   { id: "2", name: "Task-2", isDone: "false" },
//   { id: "3", name: "Task-3", isDone: "false" },
//   { id: "4", name: "Task-4", isDone: "false" },
// ];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // anything
  res.send("Hello World!");
});

function getTasks() {
  const data = fs.readFileSync("data.txt", "utf8");
  const task = JSON.parse(data);
  return task;
}

function writeTasks(tasks: { id: string; name: string }) {
  fs.writeFile("data.txt", JSON.stringify(tasks), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//GET
app.get(`/tasks`, (req: Request, res: Response) => {
  const { filterStatus } = req.query;
  const tasks = getTasks();

  console.log({ tasks, filterStatus });

  const filteredTasks = tasks.filter((task: { isDone: boolean }) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Active") return !task.isDone;
    return task.isDone;
  });
  res.send(filteredTasks);
});
// fetch all tasks
// res.send([]);

//POST (add new task)
app.post("/tasks", (req: Request, res: Response) => {
  // fetch all tasks
  const id = nanoid();
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: "name is required" });
    return;
  }
  const tasks = getTasks();
  tasks.unshift({ id, name });
  writeTasks(tasks);
  res.status(201).send({ id });
});

//CLEAR (all completed)
app.delete("/tasks/clear", (req: Request, res: Response) => {
  const tasks = getTasks();
  // fetch all tasks
  const newTasks = tasks.filter((task: { isDone: boolean }) => !task.isDone);
  writeTasks(newTasks);
  res.sendStatus(204); //No Content
});

//DELETE
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = getTasks();
  // fetch all tasks
  console.log({ id });
  const newTasks = tasks.filter((task: { id: string }) => task.id !== id);
  writeTasks(newTasks);
  res.sendStatus(204); //No Content
});

//PUT (edit)
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const tasks = getTasks();
  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].name = name;
  writeTasks(tasks);
  // fetch all tasks
  res.sendStatus(204); //No Content
});

//PUT (checkbox)
app.patch("/tasks/:id/check", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = getTasks();
  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].isDone = !tasks[index].isDone;

  writeTasks(tasks);
  res.sendStatus(204); //No Content
});

// app.get("/products", (req: Request, res: Response) => {
//   // fetch database products
//   res.json(products);
// });

// app.post("/products", (req: Request, res: Response) => {
//   // add product to database
//   res.send("POST Products");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
