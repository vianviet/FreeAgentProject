import { Space } from "antd";
import ResetPassword from "./ResetPassword";
import Edit from "./Edit";
import Delete from "./Delete";
const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
    width: "40%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "40%",
  },
  {
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => (
      <Space size="middle">
        <ResetPassword data={record}></ResetPassword>
        <Edit data={record}></Edit>
        <Delete data={record}></Delete>
      </Space>
    ),
  },
];
export default columns;
