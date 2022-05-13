import React from "react";
import { Table, Button, Space } from "antd";
import ResetPassword from "../User/ResetPassword";
import Edit from "../User/Edit";
import Delete from "../User/Delete";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
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
    title: "Synchronized Date",
    dataIndex: "syncdate",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
    width: "20%",
    render: (text, record) => (
      <Space size="middle">
        <ResetPassword></ResetPassword>
        <Edit></Edit>
        <Delete></Delete>
      </Space>
    ),
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    email: "text",
    password: "DJCAB-JOBDV",
    agentcode: `text`,
  });
}

class AccountTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    console.log(selectedRowKeys);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default AccountTable;
