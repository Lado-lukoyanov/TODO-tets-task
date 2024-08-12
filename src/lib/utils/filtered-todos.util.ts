import type { Todo } from "../types/types";

export const filteredTodos = (todos: Todo[], filter: string): Todo[] => {
  return todos.filter((todo) => {
    if (filter === "active") return !todo.completed;

    if (filter === "completed") return todo.completed;

    return true;
  });
};
