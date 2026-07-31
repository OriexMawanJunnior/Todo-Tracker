export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
};

export type TodoFilter = "all" | "open" | "completed";