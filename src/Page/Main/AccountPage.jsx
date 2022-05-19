import React, { useEffect, useState } from "react";
import { accounttitle } from "../../component/Header/svg";
import { Input, Button, Modal, Table } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import columns from "../../component/Main/Account/columns";
// import account from "../../Data/account";
import columnsmobile from "../../component/Main/Account/columnsmobile";
import columnstablet from "../../component/Main/Account/columnstablet";
import axios from "axios";

const { Search } = Input;

export default function AccountPage() {
  const [data, setData] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [syncLoading, setSyncLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://free-agent.herokuapp.com/user`)
      .then((res) => {
        let list = [];
        res.data.forEach((each) => {
          const statustext = each.status ? "online" : "offline";
          each = { ...each, statustext };
          list.push(each);
        });
        setData(list);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => console.log(value);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleAdd(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setVisibleAdd(false);
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
          <Modal
            bodyStyle={{
              padding: 10,
              fontSize: 14,
              lineHeight: 1.5715,
              paddingInline: 10,
              columnGap: 50,
            }}
            className="text-left"
            title="Add New User"
            visible={visibleAdd}
            // onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={() => handleCancel()}>
                Close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={confirmLoading}
                onClick={() => handleOk()}
              >
                Submit
              </Button>,
            ]}
          >
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Email :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Password :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Agent Name :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Agent Code :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Expired Date :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
          </Modal>
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
