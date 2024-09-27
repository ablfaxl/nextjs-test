import React from "react";
import { Button } from "@nextui-org/react";
import { Tasks } from "@/types/tasks.type";

interface TaskCardProps {
  task: string;
  column: keyof Tasks;
  removeTask: (task: string, from: keyof Tasks) => void;
  moveTask: (task: string, from: keyof Tasks, to: keyof Tasks) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  column,
  removeTask,
  moveTask,
}) => {
  return (
    <li className="flex justify-between items-center border-b border-gray-200 py-2">
      <span>{task}</span>
      <div>
        {column === "done" ? (
          <Button
            size="sm"
            color="danger"
            onClick={() => removeTask(task, "done")}
          >
            Remove
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() =>
              moveTask(task, column, column === "todo" ? "inProgress" : "done")
            }
          >
            {column === "todo" ? "→ In Progress" : "→ Done"}
          </Button>
        )}
        {column === "inProgress" && (
          <Button
            size="sm"
            color="danger"
            onClick={() => moveTask(task, column, "todo")}
            className="ml-2"
          >
            Back to To Do
          </Button>
        )}
      </div>
    </li>
  );
};

export default TaskCard;
