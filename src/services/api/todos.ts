import { apiClient } from "./client";
import { TodoItem } from "../types/todo";

export const todosApi = {
  getTodos: async (listId: string): Promise<TodoItem[]> => {
    const response = await apiClient.get(`/lists/${listId}/items`);
    return response.data;
  },

  createTodo: async (
    listId: string,
    description: string
  ): Promise<TodoItem> => {
    const response = await apiClient.post(`/lists/${listId}/items`, {
      description,
    });
    return response.data;
  },

  updateTodo: async (
    listId: string,
    itemId: string,
    updates: Partial<TodoItem>
  ): Promise<TodoItem> => {
    const response = await apiClient.put(
      `/lists/${listId}/items/${itemId}`,
      updates
    );
    return response.data;
  },

  deleteTodo: async (listId: string, itemId: string): Promise<void> => {
    await apiClient.delete(`/lists/${listId}/items/${itemId}`);
  },
};
