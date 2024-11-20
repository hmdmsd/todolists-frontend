// src/App.tsx
import { Layout } from "antd";
import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ListForm } from "./components/forms/ListForm";
import { TodoForm } from "./components/forms/TodoForm";
import { TodoList } from "./components/todo/TodoList";
import { useLists } from "./hooks/useLists";
import { useTodos } from "./hooks/useTodos";
import { TodoList as TodoListType } from "./services/types/list";

const { Content } = Layout;

export default function App() {
  const [showListForm, setShowListForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedList, setSelectedList] = useState<TodoListType | null>(null);

  const { lists, createList } = useLists();
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos(
    selectedList?.id || null
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sidebar
          lists={lists}
          selectedList={selectedList}
          onListSelect={setSelectedList}
          onAddList={() => setShowListForm(true)}
        />
        <Content style={{ padding: 24 }}>
          {showListForm && (
            <ListForm
              onSubmit={async (name, description) => {
                await createList(name, description);
                setShowListForm(false);
              }}
              onCancel={() => setShowListForm(false)}
            />
          )}
          {selectedList && (
            <div>
              <h2>{selectedList.name}</h2>
              {selectedList.description && (
                <p style={{ color: "#666", marginBottom: 16 }}>
                  {selectedList.description}
                </p>
              )}
              {showTodoForm ? (
                <TodoForm
                  onSubmit={async (description) => {
                    await createTodo(description);
                    setShowTodoForm(false);
                  }}
                  onCancel={() => setShowTodoForm(false)}
                />
              ) : (
                <TodoList
                  todos={todos}
                  onStatusChange={async (todoId, status) => {
                    await updateTodo(todoId, { status });
                  }}
                  onDelete={async (todoId) => {
                    await deleteTodo(todoId);
                  }}
                  onAddTodo={() => setShowTodoForm(true)}
                />
              )}
            </div>
          )}
          {!selectedList && !showListForm && (
            <div style={{ textAlign: "center", color: "#666", marginTop: 48 }}>
              Select a list or create a new one
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
