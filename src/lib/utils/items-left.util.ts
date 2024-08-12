import type { Todo } from "../types/types";

export const itemsLeft = (todo: Todo[]): string => {
  const items = todo.filter((value) => !value.completed).length;

  return `${items} items left`;
};
