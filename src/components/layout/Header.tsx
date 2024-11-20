import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => (
  <AntHeader style={{ display: "flex", alignItems: "center" }}>
    <Title level={3} style={{ color: "white", margin: 0 }}>
      Todo Lists
    </Title>
  </AntHeader>
);
