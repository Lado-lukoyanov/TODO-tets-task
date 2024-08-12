import { render, screen, fireEvent } from "@testing-library/react";
import { TodoForm } from "./todo-form";

describe("TodoForm", () => {
  test("renders the form", () => {
    render(<TodoForm addTodo={jest.fn()} />);
    expect(screen.getByTestId("todo-form")).toBeInTheDocument();
  });

  test("allows input and form submission", () => {
    const addTodoMock = jest.fn();
    render(<TodoForm addTodo={addTodoMock} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    expect(input).toHaveValue("New Todo");

    const form = screen.getByTestId("todo-form");
    fireEvent.submit(form);

    expect(addTodoMock).toHaveBeenCalledTimes(1);
    expect(addTodoMock).toHaveBeenCalledWith("New Todo");

    expect(screen.getByPlaceholderText("What needs to be done?")).toHaveValue("");
  });

  test("does not add empty todo", () => {
    const addTodoMock = jest.fn();
    render(<TodoForm addTodo={addTodoMock} />);

    const form = screen.getByTestId("todo-form");
    fireEvent.submit(form);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
