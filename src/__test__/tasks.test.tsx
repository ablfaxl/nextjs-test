import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tasks from "../features/tasks/tasks";
import { useTasks } from "../hooks/use-tasks";

jest.mock("../hooks/use-tasks", () => ({
  useTasks: jest.fn(),
}));

jest.mock("../features/tasks/taks-board", () => {
  return function MockTaskBoard({}) {
    return <div data-testid="task-board">MockTaskBoard</div>;
  };
});

jest.mock("@nextui-org/react", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Input: ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: () => void;
  }) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data-testid="task-input"
    />
  ),
}));

describe("Tasks", () => {
  const mockAddTask = jest.fn();
  const mockRemoveTask = jest.fn();
  const mockMoveTask = jest.fn();
  const mockTasks = {
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"],
  };

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      addTask: mockAddTask,
      removeTask: mockRemoveTask,
      moveTask: mockMoveTask,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Tasks component", () => {
    render(<Tasks />);
    expect(screen.getByTestId("task-input")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByTestId("task-board")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<Tasks />);
    const input = screen.getByTestId("task-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input.value).toBe("New Task");
  });

  it("calls addTask when Add Task button is clicked", () => {
    render(<Tasks />);
    const input = screen.getByTestId("task-input") as HTMLInputElement;
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith("New Task");
    expect(input.value).toBe("");
  });

  it("passes correct props to TaskBoard", () => {
    render(<Tasks />);
    const taskBoard = screen.getByTestId("task-board");
    expect(taskBoard).toBeInTheDocument();
  });
});
