import styles from "./todo-items.module.css";

import type { Todo } from "../../../lib/types/types";

type TodoItemProps = {
  todo: Todo;
  selectTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const TodoItem = ({ todo, selectTodo, removeTodo }: TodoItemProps) => (
  <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}>
    <input type="checkbox" checked={todo.completed} onChange={() => selectTodo(todo.id)} className={styles.checkbox} />
    <span className={styles.text} onClick={() => selectTodo(todo.id)}>
      {todo.text}
    </span>
    <button className={styles.removeButton} onClick={() => removeTodo(todo.id)}>
      x
    </button>
  </li>
);
