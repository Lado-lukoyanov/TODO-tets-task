import { render, screen, fireEvent } from "@testing-library/react";
import { TodoViews } from "./todo-views";

describe("TodoViews", () => {
  test("renders the todo view with header", () => {
    render(<TodoViews />);
    expect(screen.getByText("todos")).toBeInTheDocument();
  });

  test("allows adding a new todo", () => {
    render(<TodoViews />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("allows toggling a todo's completed state", () => {
    render(<TodoViews />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("allows removing a todo", () => {
    render(<TodoViews />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    const removeButton = screen.getByRole("button", { name: "x" });
    fireEvent.click(removeButton);

    expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
  });

  test("filters todos correctly", () => {
    render(<TodoViews />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "First Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));
    fireEvent.change(input, { target: { value: "Second Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckbox);

    fireEvent.click(screen.getByText("Active"));
    expect(screen.queryByText("First Todo")).not.toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.queryByText("Second Todo")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });

  test("clears completed todos", () => {
    render(<TodoViews />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "First Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));
    fireEvent.change(input, { target: { value: "Second Todo" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckbox);

    fireEvent.click(screen.getByText("Clear completed"));
    expect(screen.queryByText("First Todo")).not.toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });
});
