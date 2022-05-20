import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Delete from "../User/Delete";
import Edit from "../Account/Edit";
import Sync from "./Sync";

const columnsmobile = [
  {
    title: "Email",
    dataIndex: "email",
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
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Edit data={record}></Edit>
        <Sync data={record}></Sync>
        <Delete data={record}></Delete>
      </Space>
    ),
  },
];
export default columnsmobile;
