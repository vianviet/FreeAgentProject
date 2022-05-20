import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import validation from "../../../../utils/validation/validation";

export default function AddNewUser({ visible, setVisible }) {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleAddUser = () => {
    const validate = validation(data, "useradd");
    if (validate.length === 0) {
      setConfirmLoading(true);
      axios
        .post(`https://free-agent.herokuapp.com/user/`, data)
        .then((res) => {
          setConfirmLoading(false);
          message.success("Add a new user success", 1);
          setVisible(false);
        })
        .catch((err) => {
          setConfirmLoading(false);
          message.error("Username or password existing, please try another", 1);
        });
      setData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      validate.map((each) => message.error(each));
    }
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
          value={data.email}
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
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-user d-flex my-auto">
          <div>Password :</div>
        </div>
        <Input
          placeholder="example"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
    </Modal>
  );
}
