"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setProducts(data);
  //     });
  // }, []);

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);

  async function createNewTask() {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTask }),
    });
    loadTasks();
    setNewTask("");
  }

  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }

  function deleteTask(index: number) {
    const newTodos = tasks.filter((e, i) => index !== i);
    setTasks(newTodos);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  console.log(tasks, "tasks");

  return (
    <div className="m-8">
      <div className="flex">
        <input
          className="input mr-4 rounded-md"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {newTask === "" ? (
          <button className="btn btn-neutral rounded-md">Add</button>
        ) : (
          <button
            className="btn btn-neutral rounded-md"
            onClick={createNewTask}
          >
            Add
          </button>
        )}
      </div>
      {tasks.map((task, index) => (
        <div
          className="card p-4 border border-base-300 mt-4 w-100 hover:bg-base-200 hover:duration-[1s]"
          key={task.id}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <input className="checkbox" type="checkbox" />
              <p>{task.name}</p>
            </div>

            <button
              className="btn btn-outline btn-error rounded-md w-18"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
