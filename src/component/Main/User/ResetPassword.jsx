import { CheckCircleOutlined } from "@ant-design/icons";
import { Modal, Button, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import axiosCustom from "../../../Axios/AxiosCustom";

export default function ResetPassword({ data }) {
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCopy = () => {
    setConfirmLoading(true);
    // axios
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleConfirm(false);
  };
  const handleSubmit = () => {
    setConfirmLoading(true);
    const { password, _id } = data;
    axiosCustom
      .put(`/user/${_id}`, { password: "DJCAB-JODVOR-RIFGE8" })
      .then((res) => {
        setVisibleConfirm(true);
        setConfirmLoading(false);
      })
      .catch((err) => {
        message.error("Password already reset !");
        setConfirmLoading(false);
      });
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
          visibleConfirm ? (
            <Button
              key="submit"
              type="primary"
              loading={confirmLoading}
              onClick={() => handleCopy()}
            >
              Copy
            </Button>
          ) : (
            <Button
              key="submit"
              type="primary"
              loading={confirmLoading}
              onClick={() => handleSubmit()}
            >
              Change
            </Button>
          ),
        ]}
      >
        {visibleConfirm ? (
          <div className="show-message">
            <CheckCircleOutlined className="mx-2 checked-green" />
            <div className="color-black">The password has been changed.</div>
          </div>
        ) : (
          ""
        )}
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
