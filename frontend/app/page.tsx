"use client";

import { useState } from "react";
import { TodoComposer } from "../components/todo-composer";
import { TodoDetailsDialog } from "../components/todo-details-dialog";
import { TodoRegister } from "../components/todo-register";
import { useTodos } from "../hooks/use-todos";
import type { Todo } from "../types/todo";

export default function Home() {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const todos = useTodos();

  async function handleDelete(todo: Todo) {
    if (await todos.deleteTodo(todo)) setSelectedTodo(null);
  }

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="masthead-inner">
          <h1>Todo Tracker</h1>
          <p aria-live="polite">
            {todos.openCount} open <span aria-hidden="true">·</span> {todos.completedCount} complete
          </p>
        </div>
      </header>

      <main className="workbench">
        <TodoComposer
          total={todos.todos.length}
          completed={todos.completedCount}
          submitting={todos.submitting}
          error={todos.error}
          onCreate={todos.addTodo}
          onRetry={() => void todos.reload()}
        />
        <TodoRegister
          todos={todos.visibleTodos}
          hasTodos={todos.todos.length > 0}
          loading={todos.loading}
          error={todos.error}
          filter={todos.filter}
          openCount={todos.openCount}
          pendingId={todos.pendingId}
          actionsDisabled={todos.actionsDisabled}
          onFilterChange={todos.setFilter}
          onComplete={(todo) => void todos.completeTodo(todo)}
          onDelete={(todo) => void handleDelete(todo)}
          onSelect={setSelectedTodo}
        />
      </main>

      <TodoDetailsDialog todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </div>
  );
}
