import React from "react";
import { render, screen } from "@testing-library/react";
import { Tasks } from "@/types/tasks.type";
import TaskBoard from "@/features/tasks/taks-board";

// Mock the TaskCard component
jest.mock("../features/tasks/task-card.tsx", () => {
  return function MockTaskCard({ task }: { task: string }) {
    return <div data-testid="task-card">{task}</div>;
  };
});

describe("TaskBoard", () => {
  const mockTasks: Tasks = {
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4", "Task 5"],
  };

  const mockRemoveTask = jest.fn();
  const mockMoveTask = jest.fn();

  it("renders all columns", () => {
    render(
      <TaskBoard
        tasks={mockTasks}
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );

    expect(screen.getByText("todo")).toBeInTheDocument();
    expect(screen.getByText("inProgress")).toBeInTheDocument();
    expect(screen.getByText("done")).toBeInTheDocument();
  });

  it("renders correct number of TaskCards for each column", () => {
    render(
      <TaskBoard
        tasks={mockTasks}
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );

    const taskCards = screen.getAllByTestId("task-card");
    expect(taskCards).toHaveLength(5);
  });

  it("renders tasks in correct columns", () => {
    render(
      <TaskBoard
        tasks={mockTasks}
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
    expect(screen.getByText("Task 5")).toBeInTheDocument();
  });
});
