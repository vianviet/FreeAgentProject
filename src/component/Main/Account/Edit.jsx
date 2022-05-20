import React, { useState } from "react";
import { Input, Button, Modal, message, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import validation from "../../../utils/validation/validation";

export default function Edit(props) {
  const [data, setData] = useState({
    password: props.data.password,
    agentname: props.data.agentname,
    agentcode: props.data.agentcode,
    expireddate: props.data.expireddate,
  });
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    const validate = validation(data, "accountedit");
    if (validate.length === 0) {
      setConfirmLoading(true);
      axios
        .put(`https://free-agent.herokuapp.com/user/${props.data._id}`, data)
        .then((res) => {
          setConfirmLoading(false);
          message.success("Update account success", 1);
          setVisible(false);
        })
        .catch((err) => {
          setConfirmLoading(false);
          console.log(err);
          message.error("Fail to update account", 1);
        });
    } else {
      validate.map((each) => message.error(each));
    }
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
          <Input
            defaultValue={props.data.email}
            placeholder="example"
            onChange={""}
            disabled
          />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Password :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input.Password
            onChange={(e) => setData({ ...data, password: e.target.value })}
            defaultValue="DJCAB-JODVOR-RIFGE8"
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
            onChange={(e) => setData({ ...data, agentname: e.target.value })}
            defaultValue={props.data.agentname}
            placeholder="example"
          />
        </div>
        <div className="line-add-user d-flex justify-content-between my-3">
          <div className="label-line-add-account my-auto">
            <div className="ml-2 ">Agent Code :</div>
            <div className="color-dustred">*</div>
          </div>
          <Input
            defaultValue={props.data.agentcode}
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
            onChange={(e) => setData({ ...data, expireddate: e._d })}
          />
        </div>
      </Modal>
    </div>
  );
}
