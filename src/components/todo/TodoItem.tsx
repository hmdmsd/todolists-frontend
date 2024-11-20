import { List, Button, Space } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { TodoItem as TodoItemType } from "../../services/types/todo";
import { TodoStatus } from "./TodoStatus";

interface TodoItemProps {
  todo: TodoItemType;
  onStatusChange: (status: TodoItemType["status"]) => Promise<void>;
  onDelete: () => Promise<void>;
}

export const TodoItem = ({ todo, onStatusChange, onDelete }: TodoItemProps) => (
  <List.Item
    actions={[
      <Button
        type="text"
        icon={<CheckOutlined />}
        onClick={() => onStatusChange("DONE")}
        disabled={todo.status === "DONE"}
      />,
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={onDelete}
      />,
    ]}
  >
    <Space>
      {todo.description}
      <TodoStatus status={todo.status} />
    </Space>
  </List.Item>
);
