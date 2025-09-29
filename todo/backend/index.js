const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const products = [
  { id: 1, name: "MacBook" },
  { id: 1, name: "iMac" },
];

app.use(cors());

app.get("/", (req, res) => {
  // anything
  res.send("Hello World!");
});

const tasks = [];

app.get("/tasks", (req, res) => {
  // fetch all tasks
  res.send([]);
});

app.post("/tasks", (req, res) => {
  // fetch all tasks
  res.send([]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  // fetch all tasks
  res.send([]);
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  // fetch all tasks
  res.send([]);
});

app.get("/products", (req, res) => {
  // fetch database products
  res.json(products);
});

app.post("/products", (req, res) => {
  // add product to database
  res.send("POST Products");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
