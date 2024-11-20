import { useState, useEffect } from "react";
import { TodoList } from "../services/types/list";
import { listsApi } from "../services/api/lists";

export const useLists = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const data = await listsApi.getLists();
      setLists(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch lists");
    } finally {
      setLoading(false);
    }
  };

  const createList = async (name: string, description?: string) => {
    try {
      const newList = await listsApi.createList(name, description);
      setLists([...lists, newList]);
      return newList;
    } catch (err) {
      setError("Failed to create list");
      throw err;
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return { lists, loading, error, createList, refreshLists: fetchLists };
};
