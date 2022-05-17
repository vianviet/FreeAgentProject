import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Delete from "../User/Delete";
import Edit from "../Account/Edit";
import Sync from "./Sync";

const columnstablet = [
  {
    title: "Email",
    dataIndex: "email",
    width: "12%",
  },
  {
    title: "Password",
    dataIndex: "password",
    render: (text, record) => (
      <Space size="middle">
        <Input.Password
          className="border-none"
          value={record.password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
    ),
    width: "15%",
  },
  {
    title: "Agent Code",
    dataIndex: "agentcode",
  },
  {
    title: "Agent Name",
    dataIndex: "agentname",
  },
  {
    title: "Expired Date",
    dataIndex: "expireddate",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
    width: "15%",
    render: (text, record) => (
      <Space size="middle">
        <Edit data={record}></Edit>
        <Sync></Sync>
        <Delete></Delete>
      </Space>
    ),
  },
];
export default columnstablet;
