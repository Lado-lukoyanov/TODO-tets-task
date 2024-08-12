import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./todo-items";

const todo = {
  id: 1,
  text: "Test Todo",
  completed: false,
};

describe("TodoItem", () => {
  test("renders the todo item", () => {
    render(<TodoItem todo={todo} selectTodo={jest.fn()} removeTodo={jest.fn()} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("calls selectTodo when checkbox is clicked", () => {
    const selectTodoMock = jest.fn();
    render(<TodoItem todo={todo} selectTodo={selectTodoMock} removeTodo={jest.fn()} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(selectTodoMock).toHaveBeenCalledWith(todo.id);
  });

  test("calls selectTodo when text is clicked", () => {
    const selectTodoMock = jest.fn();
    render(<TodoItem todo={todo} selectTodo={selectTodoMock} removeTodo={jest.fn()} />);

    fireEvent.click(screen.getByText("Test Todo"));
    expect(selectTodoMock).toHaveBeenCalledWith(todo.id);
  });

  test("calls removeTodo when remove button is clicked", () => {
    const removeTodoMock = jest.fn();
    render(<TodoItem todo={todo} selectTodo={jest.fn()} removeTodo={removeTodoMock} />);

    fireEvent.click(screen.getByRole("button"));
    expect(removeTodoMock).toHaveBeenCalledWith(todo.id);
  });
});
