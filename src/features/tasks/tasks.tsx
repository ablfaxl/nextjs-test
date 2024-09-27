"use client";
import TaskBoard from "@/features/tasks/taks-board";
import { useTasks } from "@/hooks/use-tasks";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const Tasks = () => {
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
};

export default Tasks;
