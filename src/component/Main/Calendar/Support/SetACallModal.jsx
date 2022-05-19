import { UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, message, Modal, TimePicker } from "antd";
import React, { memo, useState } from "react";
import axios from "axios";

function SetACallModal({ visibleSetACall, setVisibleSetACall }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    phone: "",
    message: "",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    const data = newEvent;
    axios
      .post(`https://free-agent.herokuapp.com/calendar`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          setConfirmLoading(false);
          message.success("Add a new call success", 1);
        }
      })
      .catch((err) => {
        setConfirmLoading(false);
        message.error("Fail to add a new call", 1);
      });
    // setTimeout(() => {
    //   setVisibleSetACall(false);
    //   setConfirmLoading(false);
    // }, 1000);
  };

  const handleCancel = () => {
    setVisibleSetACall(false);
  };
  const onChange = (e) => console.log(e._d);
  return (
    <Modal
      className="text-left"
      title="Set A Call"
      visible={visibleSetACall}
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
          Send SMS
        </Button>,
      ]}
    >
      <Input
        className="my-1"
        placeholder="example"
        prefix={<UserOutlined />}
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <Input
        className="my-1"
        placeholder="Enter a phone number"
        onChange={(e) => setNewEvent({ ...newEvent, phone: e.target.value })}
      />
      <div className="pick-time my-1 d-flex justify-content-between">
        <DatePicker
          className="w-100"
          selected={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e._d, end: e._d })}
        />
        <TimePicker className="w-100" onChange={(e) => onChange(e)} />
      </div>
      <Input
        className="my-1"
        placeholder="Enter a message to client"
        onChange={(e) => setNewEvent({ ...newEvent, message: e.target.value })}
      />
    </Modal>
  );
}
export default memo(SetACallModal);
