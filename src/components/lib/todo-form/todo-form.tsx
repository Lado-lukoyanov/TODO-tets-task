import { FormEvent, useState } from "react";

import styles from "./todo-form.module.css";

type TodoFormProps = {
  addTodo: (text: string) => void;
};

export const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [todoText, setTodoText] = useState("");

  const onAddTodo = (event: FormEvent) => {
    event.preventDefault();
    if (todoText.trim()) {
      addTodo(todoText);
      setTodoText("");
    }
  };

  return (
    <form onSubmit={onAddTodo} className={styles.todoForm} data-testid="todo-form">
      <input
        className={styles.todoInput}
        type="text"
        placeholder="What needs to be done?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
    </form>
  );
};
