import { itemsLeft } from "./items-left.util";
import type { Todo } from "../types/types";

const todos: Todo[] = [
  {
    id: 1,
    text: "value 1",
    completed: false,
  },
  {
    id: 2,
    text: "value 2",
    completed: true,
  },
  {
    id: 3,
    text: "value 3",
    completed: false,
  },
];

describe("itemsLeft", () => {
  test("returns correct count of incomplete items", () => {
    const result = itemsLeft(todos);
    expect(result).toBe("2 items left");
  });

  test("returns '0 items left' when all todos are completed", () => {
    const completedTodos: Todo[] = todos.map((todo) => ({ ...todo, completed: true }));
    const result = itemsLeft(completedTodos);
    expect(result).toBe("0 items left");
  });

  test("returns correct count when no todos are completed", () => {
    const activeTodos: Todo[] = todos.map((todo) => ({ ...todo, completed: false }));
    const result = itemsLeft(activeTodos);
    expect(result).toBe("3 items left");
  });

  test("returns '0 items left' when there are no todos", () => {
    const result = itemsLeft([]);
    expect(result).toBe("0 items left");
  });
});
