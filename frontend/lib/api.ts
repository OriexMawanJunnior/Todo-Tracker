const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface Todo {
  id: string; 
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string; 
  updatedAt?: string;
  _toggling?: boolean; 
}

export type CreateTodoInput = Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt' | '_toggling'>;

async function apiRequest<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // Backend mengirimkan status 204 No Content untuk DELETE tanpa body JSON
  if (response.status === 204) {
    return {} as T;
  }

  
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Backend mengirim error dalam format { error: 'pesan' }
    const message = payload?.error || 'Request failed';
    throw new Error(message);
  }

  
  return payload as T;
}

export const todoApi = {
 
  list: () => apiRequest<Todo[]>('/todos'),

  
  create: (todo: CreateTodoInput) =>
    apiRequest<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }),

 
  update: (id: string, updates: Partial<Todo>) =>
    apiRequest<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  remove: (id: string) =>
    apiRequest<{ success: boolean }>(`/todos/${id}`, {
      method: 'DELETE',
    }),
};