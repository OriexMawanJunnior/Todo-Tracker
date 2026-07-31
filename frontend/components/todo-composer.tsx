"use client";

import { type FormEvent, useRef } from "react";
import type { CreateTodoInput } from "../types/todo";

type TodoComposerProps = {
  total: number;
  completed: number;
  submitting: boolean;
  error: string | null;
  onCreate: (input: CreateTodoInput) => Promise<boolean>;
  onRetry: () => void;
};

export function TodoComposer({
  total,
  completed,
  submitting,
  error,
  onCreate,
  onRetry,
}: TodoComposerProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const created = await onCreate({
      title: String(data.get("title") || ""),
      description: String(data.get("description") || ""),
    });

    if (created) {
      form.reset();
      titleRef.current?.focus();
    }
  }

  return (
    <aside className="composer" aria-labelledby="composer-title">
      <div className="composer-heading">
        <h2 id="composer-title">Add a new task</h2>
        <p>Record the next piece of work while it is clear.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="title">Task title</label>
        <input
          ref={titleRef}
          id="title"
          name="title"
          type="text"
          maxLength={255}
          placeholder="What needs doing?"
          autoComplete="off"
          required
          disabled={submitting}
        />

        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          maxLength={255}
          rows={5}
          placeholder="Add the useful details."
          disabled={submitting}
        />

        <button className="primary-action" type="submit" disabled={submitting}>
          {submitting ? "Adding task…" : "Add task"}
        </button>
      </form>

      <div className="composer-summary">
        <p>
          {total === 0
            ? "No tasks recorded"
            : `${total} ${total === 1 ? "task" : "tasks"} total`}
        </p>
        <span>
          {completed === 0 ? "Nothing completed yet" : `${completed} completed`}
        </span>
      </div>

      {error && (
        <div className="error-message" role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>
            Try loading again
          </button>
        </div>
      )}
    </aside>
  );
}
