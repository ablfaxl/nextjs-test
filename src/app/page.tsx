"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useTasks } from "@/hooks/use-tasks";
import TaskBoard from "@/features/tasks/taks-board";

export default function Home() {
  const { tasks, addTask, removeTask, moveTask } = useTasks();
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    addTask(taskInput);
    setTaskInput("");
  };

  return (
    <div className="container mx-auto items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:pt-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Add new task..."
          value={taskInput}
          labelPlacement="inside"
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <Button onClick={handleAddTask} color="primary" className="ml-2">
          Add Task
        </Button>
      </div>

      <TaskBoard tasks={tasks} removeTask={removeTask} moveTask={moveTask} />
    </div>
  );
}
