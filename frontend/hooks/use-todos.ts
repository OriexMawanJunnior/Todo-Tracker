import { useState, useEffect, useMemo, useCallback } from "react";
import { todosApi } from "@/lib/todos-api";
import type { Todo, TodoFilter, CreateTodoInput } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [submitting, setSubmitting] = useState(false);
  
  // Ubah tipe state di sini menjadi number | null
  const [pendingId, setPendingId] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addTodo = async (input: CreateTodoInput) => {
    setSubmitting(true);
    setError(null);
    try {
      const newTodo = await todosApi.create(input);
      setTodos((prev) => [newTodo, ...prev]);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const completeTodo = async (todo: Todo) => {
    setPendingId(todo.id);
    try {
      const updated = await todosApi.update(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPendingId(null);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    setPendingId(todo.id);
    try {
      await todosApi.delete(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      return true;
    } catch (err: any) {
      alert(err.message);
      return false;
    } finally {
      setPendingId(null);
    }
  };

  const visibleTodos = useMemo(() => {
    if (filter === "open") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const openCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - openCount;

  return {
    todos,
    visibleTodos,
    loading,
    error,
    filter,
    setFilter,
    submitting,
    pendingId,
    openCount,
    completedCount,
    actionsDisabled: pendingId !== null || submitting,
    addTodo,
    completeTodo,
    deleteTodo,
    reload,
  };
}