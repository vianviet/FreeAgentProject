import { message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

export default function Delete({ data }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    const { _id } = data;
    console.log(_id);
    axios
      .delete(`https://free-agent.herokuapp.com/user/${data._id}`)
      .then((res) => {
        console.log(res.data);
        setVisible(false);
        message.success("Success to delete user !", 1);
      })
      .catch((err) => {
        message.error("Fail to delete user !", 1);
        setVisible(false);
      });
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <div onClick={(e) => setVisible(true)} className="table-button">
        Delete
      </div>
      <Modal
        title="Delete user"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{`Are you sure to delete user ${data.username} ?`}</p>
      </Modal>
    </>
  );
}
