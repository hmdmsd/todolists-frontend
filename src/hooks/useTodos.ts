import { useState, useEffect } from "react";
import { TodoItem } from "../services/types/todo";
import { todosApi } from "../services/api/todos";

export const useTodos = (listId: string | null) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    if (!listId) return;
    try {
      setLoading(true);
      const data = await todosApi.getTodos(listId);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (description: string) => {
    if (!listId) return;
    try {
      const newTodo = await todosApi.createTodo(listId, description);
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (err) {
      setError("Failed to create todo");
      throw err;
    }
  };

  const updateTodo = async (itemId: string, updates: Partial<TodoItem>) => {
    if (!listId) return;
    try {
      const updatedTodo = await todosApi.updateTodo(listId, itemId, updates);
      setTodos(todos.map((todo) => (todo.id === itemId ? updatedTodo : todo)));
      return updatedTodo;
    } catch (err) {
      setError("Failed to update todo");
      throw err;
    }
  };

  const deleteTodo = async (itemId: string) => {
    if (!listId) return;
    try {
      await todosApi.deleteTodo(listId, itemId);
      setTodos(todos.filter((todo) => todo.id !== itemId));
    } catch (err) {
      setError("Failed to delete todo");
      throw err;
    }
  };

  useEffect(() => {
    if (listId) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [listId]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
};
