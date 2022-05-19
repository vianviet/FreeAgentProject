import { CheckCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import React, { useState } from "react";
import axios from "axios";

export default function ResetPassword({ data }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    // axios
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="table-button">
      <div onClick={() => setVisible(true)}>Reset Password</div>
      <Modal
        bodyStyle={{
          padding: 10,
          fontSize: 14,
          lineHeight: 1.5715,
          paddingInline: 10,
          columnGap: 50,
        }}
        className="text-left"
        title="Reset Password"
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
            onClick={() => handleOk()}
          >
            Copy
          </Button>,
        ]}
      >
        <div className="show-message">
          <CheckCircleOutlined className="mx-2 checked-green" />
          <div className="color-black">The password has been changed.</div>
        </div>
        <div className="d-flex reset-password-row my-3">
          <div className="reset-password-row-left">Email </div>
          <div>:</div>
          <div className="reset-password-row-right">{data.email}</div>
        </div>
        <div className="d-flex reset-password-row my-3">
          <div className="reset-password-row-left">Password</div>
          <div>:</div>
          <div className="reset-password-row-right">DJCAB-JODVOR-RIFGE8</div>
        </div>
      </Modal>
    </div>
  );
}
