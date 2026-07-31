"use client";

import type { Todo, TodoFilter } from "../types/todo";

type TodoRegisterProps = {
  todos: Todo[];
  hasTodos: boolean;
  loading: boolean;
  error: string | null;
  filter: TodoFilter;
  openCount: number;
  pendingId: number | null;
  actionsDisabled: boolean;
  onFilterChange: (filter: TodoFilter) => void;
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onSelect: (todo: Todo) => void;
};

export function TodoRegister({
  todos,
  hasTodos,
  loading,
  error,
  filter,
  openCount,
  pendingId,
  actionsDisabled,
  onFilterChange,
  onComplete,
  onDelete,
  onSelect,
}: TodoRegisterProps) {
  return (
    <section className="register" aria-labelledby="register-title">
      <div className="register-heading">
        <div>
          <h2 id="register-title">Today&apos;s work</h2>
          <p>Keep the register current as work moves.</p>
        </div>
        <span>{openCount === 1 ? "1 task left" : `${openCount} tasks left`}</span>
      </div>

      <div className="register-toolbar">
        <div className="task-filters" role="group" aria-label="Filter tasks">
          {(["all", "open", "completed"] as const).map((value) => (
            <button
              className="filter-action"
              data-active={filter === value}
              type="button"
              key={value}
              onClick={() => onFilterChange(value)}
              aria-pressed={filter === value}
            >
              {value === "all" ? "All" : value === "open" ? "Open" : "Completed"}
            </button>
          ))}
        </div>
      </div>

      <div className="register-columns" aria-hidden="true">
        <span>Task</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {loading ? (
        <div className="register-message" role="status">
          <span className="loading-mark" aria-hidden="true" />
          <div>
            <strong>Loading the register</strong>
            <p>Fetching your saved tasks.</p>
          </div>
        </div>
      ) : !hasTodos ? (
        <div className="register-message">
          <span className="empty-mark" aria-hidden="true" />
          <div>
            <strong>{error ? "Register unavailable" : "The register is clear"}</strong>
            <p>
              {error
                ? "Try loading again after the API is available."
                : "Use the form to add your first task."}
            </p>
          </div>
        </div>
      ) : todos.length === 0 ? (
        <div className="register-message">
          <span className="empty-mark" aria-hidden="true" />
          <div>
            <strong>No {filter} tasks</strong>
            <p>Choose another filter to review the rest of the register.</p>
          </div>
        </div>
      ) : (
        <ul className="task-list">
          {todos.map((todo) => (
            <li
              className="task-row"
              data-completed={todo.completed}
              aria-busy={pendingId === todo.id}
              key={todo.id}
            >
              <div className="task-copy">
                <button
                  className="task-details-trigger"
                  type="button"
                  onClick={() => onSelect(todo)}
                  disabled={actionsDisabled}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${todo.title}`}
                >
                  <strong>{todo.title}</strong>
                </button>
                {todo.description && <p>{todo.description}</p>}
              </div>

              {todo.completed ? (
                <span className="completed-label">Completed</span>
              ) : (
                <button
                  className="state-action"
                  type="button"
                  onClick={() => onComplete(todo)}
                  disabled={actionsDisabled}
                  aria-label={`Complete ${todo.title}`}
                >
                  <span className="state-mark" aria-hidden="true" />
                  {pendingId === todo.id ? "Updating…" : "Complete"}
                </button>
              )}

              <button
                className="delete-action"
                type="button"
                onClick={() => onDelete(todo)}
                disabled={actionsDisabled}
                aria-label={`Delete ${todo.title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {pendingId !== null ? "Updating task" : ""}
      </span>
    </section>
  );
}
