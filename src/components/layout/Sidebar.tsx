import { Layout, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TodoList } from "../../services/types/list";

const { Sider } = Layout;

interface SidebarProps {
  lists: TodoList[];
  selectedList: TodoList | null;
  onListSelect: (list: TodoList | null) => void;
  onAddList: () => void;
}

export const Sidebar = ({
  lists,
  selectedList,
  onListSelect,
  onAddList,
}: SidebarProps) => {
  const items = [
    {
      key: "add",
      label: "Add List",
      icon: <PlusOutlined />,
    },
    ...lists.map((list) => ({
      key: list.id,
      label: list.name,
    })),
  ];

  return (
    <Sider width={200}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedList ? [selectedList.id] : []}
        items={items}
        onClick={({ key }) => {
          if (key === "add") {
            onAddList();
          } else {
            const list = lists.find((l) => l.id === key);
            onListSelect(list || null);
          }
        }}
      />
    </Sider>
  );
};
