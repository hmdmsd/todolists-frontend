import { apiClient } from "./client";
import { TodoList } from "../types/list";

export const listsApi = {
  getLists: async (): Promise<TodoList[]> => {
    const response = await apiClient.get("/lists");
    return response.data;
  },

  createList: async (name: string, description?: string): Promise<TodoList> => {
    const response = await apiClient.post("/lists", {
      id: `list-${Date.now()}`,
      name,
      description,
    });
    return response.data;
  },

  updateList: async (
    id: string,
    name: string,
    description?: string
  ): Promise<TodoList> => {
    const response = await apiClient.put(`/lists/${id}`, {
      name,
      description,
    });
    return response.data;
  },
};
