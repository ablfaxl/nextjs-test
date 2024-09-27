// features/tasks/hooks.ts
import { useLocalStorage } from "@/hooks/use-localstorage";
import { Tasks } from "@/types/tasks.type";

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Tasks>("tasks", {
    todo: [],
    inProgress: [],
    done: [],
  });

  const addTask = (task: string) => {
    if (!task.trim()) return;
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, task],
    }));
  };

  const removeTask = (task: string, from: keyof Tasks) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [from]: prevTasks[from].filter((t) => t !== task),
    }));
  };

  const moveTask = (task: string, from: keyof Tasks, to: keyof Tasks) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [from]: prevTasks[from].filter((t) => t !== task),
      [to]: [...prevTasks[to], task],
    }));
  };

  return { tasks, addTask, removeTask, moveTask };
};
