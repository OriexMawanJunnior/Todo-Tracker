import type { Todo, CreateTodoInput } from "@/types/todo";

const API_URL = "http://localhost:8080/todos"; 

export const todosApi = {
  async getAll(): Promise<Todo[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Gagal mengambil data tugas");
    return res.json();
  },

  async create(data: CreateTodoInput): Promise<Todo> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal menambahkan tugas");
    return res.json();
  },

  async update(id: number, data: Partial<Todo>): Promise<Todo> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal memperbarui tugas");
    return res.json();
  },

  async delete(id: number): Promise<boolean> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal menghapus tugas");
    return true; 
  },
};