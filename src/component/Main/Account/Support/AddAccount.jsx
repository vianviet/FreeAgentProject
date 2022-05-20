import { Button, DatePicker, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import validation from "../../../../utils/validation/validation";

export default function AddAccount(props) {
  const { visibleAdd, setVisibleAdd } = props;
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    agentname: "",
    agentcode: "",
    expireddate: "",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    const validate = validation(data, "accountadd");
    if (validate.length === 0) {
      setConfirmLoading(true);
      axios
        .post(`https://free-agent.herokuapp.com/user`, data)
        .then((res) => {
          setConfirmLoading(false);
          message.success("Add a new user success", 1);
        })
        .catch((err) => {
          setConfirmLoading(false);
          message.error("Fail to add a new user", 1);
        });
    } else {
      validate.map((each) => message.error(each));
    }
    // setTimeout(() => {
    //   setVisibleAdd(false);
    //   setConfirmLoading(false);
    // }, 1000);
  };

  const handleCancel = () => {
    setVisibleAdd(false);
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
          <div className="ml-2 ">Username :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-account my-auto">
          <div className="ml-2 ">Email :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-account my-auto">
          <div className="ml-2 ">Password :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-account my-auto">
          <div className="ml-2 ">Agent Name :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, agentname: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-account my-auto">
          <div className="ml-2 ">Agent Code :</div>
          <div className="color-dustred">*</div>
        </div>
        <Input
          placeholder="example"
          onChange={(e) => setData({ ...data, agentcode: e.target.value })}
        />
      </div>
      <div className="line-add-user d-flex justify-content-between my-3">
        <div className="label-line-add-account my-auto">
          <div className="ml-2 ">Expired Date :</div>
          <div className="color-dustred">*</div>
        </div>
        <DatePicker
          className="w-100"
          //   selected={newEvent.start}
          onChange={(e) => setData({ ...data, expireddate: e._d })}
        />
      </div>
    </Modal>
  );
}
