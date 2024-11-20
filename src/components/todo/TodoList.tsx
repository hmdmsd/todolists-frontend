import { List, Button } from "antd";
import { TodoItem } from "./TodoItem";
import { TodoItem as TodoItemType } from "../../services/types/todo";

interface TodoListProps {
  todos: TodoItemType[];
  onStatusChange: (
    todoId: string,
    status: TodoItemType["status"]
  ) => Promise<void>;
  onDelete: (todoId: string) => Promise<void>;
  onAddTodo: () => void;
}

export const TodoList = ({
  todos,
  onStatusChange,
  onDelete,
  onAddTodo,
}: TodoListProps) => (
  <div>
    <div style={{ marginBottom: 16 }}>
      <Button type="primary" onClick={onAddTodo}>
        Add Todo
      </Button>
    </div>
    <List
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={(status) => onStatusChange(todo.id, status)}
          onDelete={() => onDelete(todo.id)}
        />
      )}
    />
  </div>
);
