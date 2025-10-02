"use client";

import { PenLine } from "lucide-react";
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

  // type TaskProps = {
  //   id: string;
  //   name: string;
  //   isDone: boolean;
  // };

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<
    { id: string; name: string; isDone: boolean }[]
  >([]);
  // const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);
  // const [tasks, setTasks] = useState<TaskProps[]>([]);

  async function createNewTask() {
    if (newTask) {
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
  }

  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }

  async function deleteTask(id: string) {
    if (confirm("Delete task?")) {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      loadTasks();
    }
  }

  async function editTask(task: { id: string; name: string }) {
    const newName = prompt("Edit", task.name);
    if (newName) {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      loadTasks();
    }
  }

  async function checkTask(id: string) {
    await fetch(`http://localhost:3000/check/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: false }),
    });
    loadTasks();
  }

  const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      createNewTask();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  console.log(tasks, "tasks");

  return (
    <div className="flex justify-center mt-50">
      <div className="card p-4 shadow-gray-400 shadow-lg">
        <p className="flex justify-center font-bold ">To-Do</p>
        <div className="flex mt-4">
          <input
            className="input mr-4 rounded-md w-100"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add tasks..."
            onKeyDown={handleKeyboardEvent}
          />
          {/* {newTask === "" ? (
          <button className="btn btn-neutral rounded-md">Add</button>
        ) : (
          <button
            className="btn btn-neutral rounded-md"
            onClick={createNewTask}
          >
            Add
          </button>
        )} */}
          <button
            disabled={!newTask}
            className="btn btn-neutral rounded-md"
            onClick={createNewTask}
          >
            Add
          </button>
        </div>
        {tasks.map((task, index) => (
          <div
            className="card p-4 border border-base-300 mt-4 w-119 hover:bg-base-200 hover:duration-[1s]"
            key={task.id}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <input
                  className="checkbox w-5 h-5 rounded-md"
                  type="checkbox"
                  defaultChecked={task.isDone}
                  onClick={() => checkTask(task.id)}
                />
                <p className={task.isDone ? "line-through" : ""}>{task.name}</p>
              </div>
              <div className="flex gap-1">
                <button
                  className="btn btn-ghost btn-xs rounded-md hover:duration-[0.3s]"
                  onClick={() => editTask(task)}
                >
                  <PenLine className="w-4 h-4" />
                </button>
                <button
                  className="btn btn-outline btn-error rounded-md btn-xs text-[12px] hover:duration-[0.3s]"
                  onClick={() => deleteTask(task.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
