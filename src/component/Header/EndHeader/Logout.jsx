import React, { useState } from "react";
import { useNavigate } from "react-router";
import logout from "../svg/logout.svg";
import { Modal } from "antd";

export default function Logout() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    localStorage.clear();
    navigate("/login");
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="logout d-flex justify-content-center align-items-center mb-2 ml-3">
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        onClick={() => setVisible(!visible)}
      >
        <img
          className="d-flex justify-content-center align-items-center"
          src={logout}
          alt="logout"
        />
        <div className="d-flex justify-content-center align-items-center">
          Sign Out
        </div>
      </div>
      <Modal
        title="Logout"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure?</p>
      </Modal>
    </div>
  );
}
