import { Button, Modal, Input, message } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import validation from "../../../utils/validation/validation";
import md5 from "md5";

export default function Profile() {
  const [data, setData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    const validate = validation(data, "changepassword");
    if (validate.length === 0) {
      setConfirmLoading(true);
      axios
        .get(
          `https://free-agent.herokuapp.com/user/${localStorage.getItem("id")}`
        )
        .then((res) => {
          const user = res.data;
          if (user.password === md5(data.oldpassword)) {
            axios
              .put(
                `https://free-agent.herokuapp.com/user/${localStorage.getItem(
                  "id"
                )}`,
                {
                  password: data.newpassword,
                }
              )
              .then((res) => {
                setConfirmLoading(false);
                setVisible(false);
                message.success("Update Password success", 1);
              })
              .catch((err) => {
                setConfirmLoading(false);
                message.error("Fail to update password", 2);
              });
          } else {
            setConfirmLoading(false);
            message.error("Old password is incorrect");
          }
        })
        .catch((error) => message.error(error));
    } else {
      validate.map((each) => message.error(each));
    }

    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 1000);
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
              <div>{localStorage.getItem("username")}</div>
            </div>
            <div className="input d-flex my-2">
              <div className="width-80">Email</div>
              <div className="mr-3">:</div>
              <div>{localStorage.getItem("email")}</div>
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
                onChange={(e) =>
                  setData({ ...data, oldpassword: e.target.value })
                }
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
                onChange={(e) =>
                  setData({ ...data, newpassword: e.target.value })
                }
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
                onChange={(e) =>
                  setData({ ...data, confirmpassword: e.target.value })
                }
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
