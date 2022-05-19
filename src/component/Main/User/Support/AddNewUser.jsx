import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function AddNewUser({ visible, setVisible }) {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleAddUser = () => {
    setConfirmLoading(true);
    axios
      .post(`https://free-agent.herokuapp.com/user/register`, data)
      .then((res) => {
        setConfirmLoading(false);
        message.success("Add a new user success", 1);
        setVisible(false);
        setData({ username: "", email: "", password: "" });
      })
      .catch((err) => {
        setConfirmLoading(false);
        message.error(err.message, 1);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
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
      visible={visible}
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
          onClick={() => handleAddUser()}
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
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-user my-auto">
          <div className="ml-2 ">Name :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-user d-flex my-auto">
          <div>Password :</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
    </Modal>
  );
}
