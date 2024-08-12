import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./todo-list";
import type { Todo } from "../../lib/types/types";

const todos: Todo[] = [
  { id: 1, text: "Test Todo 1", completed: false },
  { id: 2, text: "Test Todo 2", completed: true },
];

describe("TodoList", () => {
  test("renders the list of todos", () => {
    render(<TodoList todos={todos} selectTodo={jest.fn()} removeTodo={jest.fn()} />);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  test("calls selectTodo when a TodoItem's checkbox or text is clicked", () => {
    const selectTodoMock = jest.fn();
    render(<TodoList todos={todos} selectTodo={selectTodoMock} removeTodo={jest.fn()} />);

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(selectTodoMock).toHaveBeenCalledWith(todos[0].id);

    fireEvent.click(screen.getByText("Test Todo 1"));
    expect(selectTodoMock).toHaveBeenCalledWith(todos[0].id);
  });

  test("calls removeTodo when a TodoItem's remove button is clicked", () => {
    const removeTodoMock = jest.fn();
    render(<TodoList todos={todos} selectTodo={jest.fn()} removeTodo={removeTodoMock} />);

    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(removeTodoMock).toHaveBeenCalledWith(todos[0].id);
  });
});
