import { Tag } from "antd";
import { TodoItem } from "../../services/types/todo";

interface TodoStatusProps {
  status: TodoItem["status"];
}

export const TodoStatus = ({ status }: TodoStatusProps) => {
  const colors = {
    PENDING: "orange",
    "IN-PROGRESS": "blue",
    DONE: "green",
  };

  return <Tag color={colors[status]}>{status}</Tag>;
};
