import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskCard from "@/features/tasks/task-card";

// Mock the Button component from @nextui-org/react
jest.mock("@nextui-org/react", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe("TaskCard", () => {
  const mockRemoveTask = jest.fn();
  const mockMoveTask = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders task text", () => {
    render(
      <TaskCard
        task="Test Task"
        column="todo"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it('renders "→ In Progress" button for todo tasks', () => {
    render(
      <TaskCard
        task="Todo Task"
        column="todo"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    expect(screen.getByText("→ In Progress")).toBeInTheDocument();
  });

  it('renders "→ Done" button for inProgress tasks', () => {
    render(
      <TaskCard
        task="In Progress Task"
        column="inProgress"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    expect(screen.getByText("→ Done")).toBeInTheDocument();
  });

  it('renders "Remove" button for done tasks', () => {
    render(
      <TaskCard
        task="Done Task"
        column="done"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it('renders "Back to To Do" button for inProgress tasks', () => {
    render(
      <TaskCard
        task="In Progress Task"
        column="inProgress"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    expect(screen.getByText("Back to To Do")).toBeInTheDocument();
  });

  it('calls moveTask when "→ In Progress" button is clicked', () => {
    render(
      <TaskCard
        task="Todo Task"
        column="todo"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    fireEvent.click(screen.getByText("→ In Progress"));
    expect(mockMoveTask).toHaveBeenCalledWith(
      "Todo Task",
      "todo",
      "inProgress"
    );
  });

  it('calls moveTask when "→ Done" button is clicked', () => {
    render(
      <TaskCard
        task="In Progress Task"
        column="inProgress"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    fireEvent.click(screen.getByText("→ Done"));
    expect(mockMoveTask).toHaveBeenCalledWith(
      "In Progress Task",
      "inProgress",
      "done"
    );
  });

  it('calls removeTask when "Remove" button is clicked', () => {
    render(
      <TaskCard
        task="Done Task"
        column="done"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(mockRemoveTask).toHaveBeenCalledWith("Done Task", "done");
  });

  it('calls moveTask when "Back to To Do" button is clicked', () => {
    render(
      <TaskCard
        task="In Progress Task"
        column="inProgress"
        removeTask={mockRemoveTask}
        moveTask={mockMoveTask}
      />
    );
    fireEvent.click(screen.getByText("Back to To Do"));
    expect(mockMoveTask).toHaveBeenCalledWith(
      "In Progress Task",
      "inProgress",
      "todo"
    );
  });
});
