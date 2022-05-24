import React, { useEffect, useState } from "react";
import { accounttitle } from "../../component/Header/svg";
import { Input, Button, Table } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import columns from "../../component/Main/Account/columns";
import columnsmobile from "../../component/Main/Account/columnsmobile";
import columnstablet from "../../component/Main/Account/columnstablet";
import axios from "axios";
import AddAccount from "../../component/Main/Account/Support/AddAccount";
import axiosCustom from "../../Axios/AxiosCustom";
import { useQuery } from "react-query";

const { Search } = Input;

export default function AccountPage() {
  const [account, setAccount] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [syncLoading, setSyncLoading] = useState(false);

  const getData = async () => {
    return axiosCustom.get("user");
  };
  const { data, isFetching } = useQuery("get-users", getData, {
    initialData: [],
  });

  useEffect(() => {
    if (data.data) {
      const list = data.data;
      console.log("list", list);
      const keylist = [];
      list.forEach((each, index) => {
        const key = index;
        each = { ...each, key };
        keylist.push(each);
      });
      setAccount(keylist);
    }
  }, [data]);
  const onSearch = (e) => {
    const currValue = e.target.value;
    console.log(currValue);
    if (data.data) {
      const filteredData = data.data.filter((entry, index) => {
        // entry = { ...entry, key: index };
        // entry.expireddate = new Date(entry.expireddate).toLocaleDateString();
        return entry.username.includes(currValue);
      });
      setAccount(filteredData);
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
            data={data}
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
        dataSource={account}
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
        dataSource={account}
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
        dataSource={account}
      />
    </>
  );
}
