import React, { useState } from "react";
import { Input, Button, Modal } from "antd";

export default function Edit() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className="table-button" onClick={() => setVisible(true)}>
        Edit
      </div>
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
            onClick={() => handleOk()}
          >
            Save
          </Button>,
        ]}
      >
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-user d-flex my-auto">
            <div>Name :</div>
          </div>
          <Input placeholder="Edit Name" onChange={""} />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-user d-flex my-auto">
            <div>Email :</div>
          </div>
          <Input placeholder="Edit email" onChange={""} />
        </div>
      </Modal>
    </div>
  );
}
