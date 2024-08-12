import { filteredTodos } from "./filtered-todos.util";

import type { Todo } from "../types/types";

const todos: Todo[] = [
  {
    id: Date.now(),
    text: "value 1",
    completed: false,
  },
  {
    id: Date.now() + 1,
    text: "value 2",
    completed: true,
  },
];

describe("filteredTodos", () => {
  test("filters todo array by active", () => {
    const result = filteredTodos(todos, "active");
    expect(result).toEqual([
      {
        id: expect.any(Number),
        text: "value 1",
        completed: false,
      },
    ]);
  });

  test("filters todo array by completed", () => {
    const result = filteredTodos(todos, "completed");
    expect(result).toEqual([
      {
        id: expect.any(Number),
        text: "value 2",
        completed: true,
      },
    ]);
  });

  test("returns all todos when filter is all", () => {
    const result = filteredTodos(todos, "all");
    expect(result).toEqual(todos);
  });
});
