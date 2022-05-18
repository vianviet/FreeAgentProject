import React, { useState } from "react";
import { usertitle } from "../../component/Header/svg";
import { Input, Button, Modal, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import columns from "../../component/Main/User/columns";
import data from "../../Data/user";

const { Search } = Input;
export default function UserPage() {
  const navigate = useNavigate();
  const { page } = useParams();
  console.log(page);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
  const onPageSelect = (e) => {
    navigate(`/user/${e}`);
  };
  return (
    <>
      <div className="main-title">
        <img src={usertitle} alt=""></img>
        <div className="ml-2">User</div>
      </div>
      <div className="toolbar-user mt-3">
        <div className="right-toolbar">User List</div>
        <div className="left-toolbar">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 264 }}
          />
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
              <div className="label-line-add-user my-auto">
                <div className="ml-2 ">Mail :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-user my-auto">
                <div className="ml-2 ">Name :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-user d-flex my-auto">
                <div>Password :</div>
              </div>
              <Input placeholder="example" onChange={""} />
            </div>
          </Modal>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          onChange: (e) => onPageSelect(e),
          defaultCurrent: page,
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />
    </>
  );
}
