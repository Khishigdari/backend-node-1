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

const tasks = [
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
  tasks.unshift({ id, name });
  // res.send("POST tasks");
  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // fetch all tasks
  res.send("DELETE tasks");
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // fetch all tasks
  res.send("PUT tasks");
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
