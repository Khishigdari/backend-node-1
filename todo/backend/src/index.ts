import cors from "cors";
import express, { Application, Request, Response } from "express";
import { nanoid } from "nanoid";

// const express = require("express");
const app: Application = express();
const port = 3000;
// const cors = require("cors");

// const products = [
//   { id: 1, name: "MacBook" },
//   { id: 1, name: "iMac" },
// ];

let tasks = [
  { id: "1", name: "Task-1" },
  { id: "2", name: "Task-2" },
  { id: "3", name: "Task-3" },
  { id: "4", name: "Task-4" },
];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // anything
  res.send("Hello World!");
});

app.get("/tasks", (req: Request, res: Response) => {
  // fetch all tasks
  // res.send([]);
  res.send(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  // fetch all tasks
  // res.send([]);
  const id = nanoid();
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "name is required" });
    return;
  }

  tasks.unshift({ id, name });
  // res.send("POST tasks");
  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // fetch all tasks
  console.log({ id });
  const newTasks = tasks.filter((task) => task.id !== id);
  tasks = newTasks;
  res.sendStatus(204); //No Content
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].name = name;
  // fetch all tasks
  res.sendStatus(204); //No Content
});

app.put("/check/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // let { isDone } = req.body;

  let checked = tasks.map((task) => id === task.id);
  const isDone = true;
  // checked = isDone;

  // tasks[checked].id = isDone;
  // fetch all tasks
  res.sendStatus(201); //No Content
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
