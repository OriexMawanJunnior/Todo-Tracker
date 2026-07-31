"use client";

import { useEffect, useRef } from "react";
import type { Todo } from "../types/todo";

type TodoDetailsDialogProps = {
  todo: Todo | null;
  onClose: () => void;
};

export function TodoDetailsDialog({ todo, onClose }: TodoDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (todo && !dialog.open) dialog.showModal();
    if (!todo && dialog.open) dialog.close();
  }, [todo]);

  return (
    <dialog
      className="task-details-dialog"
      ref={dialogRef}
      aria-labelledby="task-details-title"
      aria-describedby="task-details-description"
      onClose={onClose}
    >
      {todo && (
        <div className="task-details-content">
          <div className="task-details-heading">
            <p>Task details</p>
            <button className="modal-close" type="button" onClick={onClose}>
              Close
            </button>
          </div>
          <h2 id="task-details-title">{todo.title}</h2>
          <p id="task-details-description">
            {todo.description || "No description was added to this task."}
          </p>
          <span className="task-details-status">
            {todo.completed ? "Completed" : "Open"}
          </span>
        </div>
      )}
    </dialog>
  );
}
