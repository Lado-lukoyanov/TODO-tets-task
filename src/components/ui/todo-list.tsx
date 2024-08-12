import type { Todo } from "../../lib/types/types";
import { TodoItem } from "../lib/todo-item/todo-items";

import styles from "./todo-list.module.css";

type TodoListProps = {
  todos: Todo[];
  selectTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};
export const TodoList = ({ todos, selectTodo, removeTodo }: TodoListProps) => (
  <ul className={styles.todoList}>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} selectTodo={selectTodo} removeTodo={removeTodo} />
    ))}
  </ul>
);
