"use client";

import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  type Task = { id: string; name: string; isDone: boolean };
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");

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
    fetch(`http://localhost:3000/tasks?filterStatus=${filterStatus}`)
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

  async function clearCompleted() {
    if (confirm("Clear all completed tasks?")) {
      await fetch(`http://localhost:3000/tasks/clear`, {
        method: "DELETE",
      });
      loadTasks();
    }
  }

  async function editTask(task: Task) {
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
    await fetch(`http://localhost:3000/tasks/${id}/check`, {
      method: "PATCH",
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
  }, [filterStatus]);

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
          <button
            disabled={!newTask}
            className="btn btn-neutral rounded-md"
            onClick={createNewTask}
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {["All", "Active", "Completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`btn rounded-md btn-md btn-ghost ${
                filterStatus === s ? "!btn-active !cursor-pointer" : ""
              }`}
            >
              {s}
            </button>
          ))}
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
                  onChange={() => checkTask(task.id)}
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
                {task.isDone ? (
                  <button
                    className="btn btn-outline btn-error rounded-md btn-xs text-[12px] hover:duration-[0.3s]"
                    onClick={() => deleteTask(task.id)}
                  >
                    Remove
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 ? (
          <p className="card bg-base-100 mt-5 text-gray-500 m-auto">
            No task to show
          </p>
        ) : (
          <div className="mt-5 flex justify-between">
            <div className="text-gray-500">
              {tasks.filter((task) => task.isDone === true).length} of{" "}
              {tasks.length} tasks completed
            </div>
            <div>
              <button
                className="text-red-500 hover:cursor-pointer text-[12px] hover:duration-[0.3s]"
                onClick={() => clearCompleted()}
              >
                Clear completed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
