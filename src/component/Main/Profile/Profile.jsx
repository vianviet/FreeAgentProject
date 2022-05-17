import { Button, Modal, Input } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function Profile() {
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
    <div className="profile-content ">
      <div className="content-title ">Account Setting</div>
      <div className="d-flex justify-content-center form-margin-top-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-label d-flex flex-column justify-content-left width-400 ml-5 px-5 my-5">
            <div className="input d-flex my-2">
              <div className="width-80">Name</div>
              <div className="mr-3">:</div>
              <div>UserName</div>
            </div>
            <div className="input d-flex my-2">
              <div className="width-80">Email</div>
              <div className="mr-3">:</div>
              <div>emailname@faeast.com</div>
            </div>
          </div>
          <Button
            onClick={() => setVisible(true)}
            className="width-50 mr-5"
            type="primary"
          >
            Update Password
          </Button>
          <Modal
            bodyStyle={{
              padding: 10,
              fontSize: 14,
              lineHeight: 1.5715,
              paddingInline: 10,
              columnGap: 50,
            }}
            className="text-left"
            title="Update Password"
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
                Submit
              </Button>,
            ]}
          >
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Old Pass :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input.Password
                value="example"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">New Pass :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input.Password
                value="example"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="line-add-user d-flex justify-content-between my-3">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Confirm :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input.Password
                value="example"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
