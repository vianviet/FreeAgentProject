import React, { useState } from "react";
import { accounttitle } from "../../component/Header/svg";
import { Input, Button, Table } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import columns from "../../component/Main/Account/columns";
import columnsmobile from "../../component/Main/Account/columnsmobile";
import columnstablet from "../../component/Main/Account/columnstablet";
import AddAccount from "../../component/Main/Account/Support/AddAccount";
import useListUser from "../../Common/CustomHooks/useListUser";

const { Search } = Input;

export default function AccountPage() {
  const { user, setUser, isFetching } = useListUser();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [syncLoading, setSyncLoading] = useState(false);

  const onSearch = (e) => {
    const currValue = e.target.value;
    console.log(currValue);
    if (user) {
      const filteredData = user.filter((entry, index) => {
        return entry.username.includes(currValue);
      });
      setUser(filteredData);
    }
  };

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
            onChange={(e) => onSearch(e)}
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
            data={user}
            visibleAdd={visibleAdd}
            setVisibleAdd={setVisibleAdd}
          ></AddAccount>
        </div>
      </div>
      <Table
        loading={isFetching}
        className="account-table"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columns}
        dataSource={user}
      />
      <Table
        loading={isFetching}
        className="account-table-tablet"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columnstablet}
        dataSource={user}
      />
      <Table
        loading={isFetching}
        className="account-table-mobile"
        rowSelection={{
          selectedRowKeys,
          onChange: (e) => {
            setSelectedRowKeys(e);
          },
        }}
        columns={columnsmobile}
        dataSource={user}
      />
    </>
  );
}
