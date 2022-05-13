import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function Edit(props) {
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
        title="Edit Account"
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
            Edit
          </Button>,
        ]}
      >
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Email :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input value={props.data.email} placeholder="example" onChange={""} />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Password :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input.Password
            value={props.data.password}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Agent Name :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input
            value={props.data.agentname}
            placeholder="example"
            onChange={""}
          />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Agent Code :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input
            value={props.data.agentcode}
            placeholder="example"
            onChange={""}
          />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Expired Date :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input
            value={props.data.expireddate}
            placeholder="example"
            onChange={""}
          />
        </div>
      </Modal>
    </div>
  );
}
