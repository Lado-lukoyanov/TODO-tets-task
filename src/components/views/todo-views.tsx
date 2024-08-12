import { useState } from "react";

import { TodoForm } from "../lib/todo-form/todo-form";
import { TodoList } from "../ui/todo-list";

import { filteredTodos } from "../../lib/utils/filtered-todos.util";
import { itemsLeft } from "../../lib/utils/items-left.util";

import styles from "./todo-view.module.css";

import type { Todo } from "../../lib/types/types";

export const TodoViews = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const selectTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className={styles.todoViews}>
      <h1 className={styles.title}>todos</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={filteredTodos(todos, filter)} selectTodo={selectTodo} removeTodo={removeTodo} />
      <div className={styles.todoFooter}>
        <p>{itemsLeft(todos)}</p>
        <div className={styles.filters}>
          <button className={filter === "all" ? styles.selected : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "active" ? styles.selected : ""} onClick={() => setFilter("active")}>
            Active
          </button>
          <button className={filter === "completed" ? styles.selected : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>
        <button onClick={removeCompleted}>Clear completed</button>
      </div>
    </div>
  );
};
