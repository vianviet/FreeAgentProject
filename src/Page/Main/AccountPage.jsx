import React, { useEffect, useState } from "react";
import { accounttitle } from "../../component/Header/svg";
import { Input, Button, Table } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import columns from "../../component/Main/Account/columns";
import columnsmobile from "../../component/Main/Account/columnsmobile";
import columnstablet from "../../component/Main/Account/columnstablet";
import axios from "axios";
import AddAccount from "../../component/Main/Account/Support/AddAccount";

const { Search } = Input;

export default function AccountPage() {
  const [data, setData] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [syncLoading, setSyncLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://free-agent.herokuapp.com/user`)
      .then((res) => {
        let list = [];
        res.data.forEach((each, index) => {
          const statustext = each.status ? "online" : "offline";
          const key = index;
          each = { ...each, statustext, key };
          list.push(each);
        });
        setData(list);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const onSearch = (value) => console.log(value);

  // const onSelectChange = (selectedRowKeys) => {
  //   setSelectedRowKeys({ selectedRowKeys });
  // };
  const reset = () => {
    setSyncLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSyncLoading(false);
    }, 1000);
  };
  return (
    <>
      <div className="main-title">
        <img src={accounttitle} alt=""></img>
        <div className="ml-2">Account</div>
      </div>
      <div className="toolbar-user mt-3">
        <div className="right-toolbar">Accout List</div>
        <div className="left-toolbar ">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 264 }}
          />
          <Button
            onClick={() => reset()}
            className="ml-2"
            type="primary"
            disabled={!hasSelected}
            loading={syncLoading}
          >
            <SyncOutlined /> Sync
          </Button>
          <Button
            onClick={() => setVisibleAdd(true)}
            className="ml-2"
            type="primary"
          >
            + Add New
          </Button>
          <AddAccount
            data={data}
            visibleAdd={visibleAdd}
            setVisibleAdd={setVisibleAdd}
          ></AddAccount>
        </div>
      </div>
      <Table
        className="account-table"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columns}
        dataSource={data}
      />
      <Table
        className="account-table-tablet"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columnstablet}
        dataSource={data}
      />
      <Table
        className="account-table-mobile"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columnsmobile}
        dataSource={data}
      />
    </>
  );
}
