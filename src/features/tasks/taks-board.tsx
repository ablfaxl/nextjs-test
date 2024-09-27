import { Tasks } from "@/types/tasks.type";
import React from "react";
import TaskCard from "./task-card";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface TaskBoardProps {
  tasks: Tasks;
  removeTask: (task: string, from: keyof Tasks) => void;
  moveTask: (task: string, from: keyof Tasks, to: keyof Tasks) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  removeTask,
  moveTask,
}) => {
  const columns: Array<keyof Tasks> = ["todo", "inProgress", "done"];

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column) => (
        <Card key={column} className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <h2 className="font-bold capitalize text-black">{column}</h2>
          </CardHeader>
          <CardBody>
            <ul className="mt-2 text-black">
              {tasks[column].map((task) => (
                <TaskCard
                  key={task}
                  task={task}
                  column={column}
                  removeTask={removeTask}
                  moveTask={moveTask}
                />
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TaskBoard;
