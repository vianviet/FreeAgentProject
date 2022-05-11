import React, { useState } from "react";
import {
  info,
  actinfo,
  angledownblack,
  angledownwhite,
  copy,
} from "../../Header/svg/index";
import { Modal } from "antd";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DatePicker, TimePicker } from "antd";
import { Button } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";
export default function ClientDetail(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleLink, setVisibleLink] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [link, setLink] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCreateLink = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleLink(false);
      setConfirmLoading(false);
      setLink(true);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onChange = (e) => console.log(e._d);
  const checkStatusName = (data) => {
    switch (data) {
      case "warning": {
        return "未対応";
      }
      case "error": {
        return "連絡不能";
      }
      default: {
        return "連絡済";
      }
    }
  };
  const checkStatusColor = (data) => {
    switch (data) {
      case "warning": {
        return "color-b-warning";
      }
      case "error": {
        return "color-b-error";
      }
      default: {
        return "color-b-success";
      }
    }
  };
  return (
    <div className="client-detail">
      <div className="header-detail d-flex justify-content-between">
        <div className="header-detail-left d-flex ">
          <div className="client-name">{props.name}</div>
          <img
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 mt-1"
            src={showInfo ? actinfo : info}
            alt=""
          />
        </div>
        <div className="header-detail-right d-flex">
          <div id="select-left">
            オペレーター
            <img className="ml-1 mb-1" src={angledownblack} alt="" />
          </div>
          <div
            onClick={() => setVisible(!visible)}
            id="select-right"
            className={checkStatusColor(props.status)}
          >
            {checkStatusName(props.status)}
            <img className="ml-1 mb-1" src={angledownwhite} alt="" />
          </div>
        </div>
        <Modal
          className="text-left"
          title="Link Video Call"
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
              Create Link
            </Button>,
          ]}
        >
          <Input
            className="my-1"
            defaultValue={props.name}
            prefix={<UserOutlined />}
            disabled
          />
          <Input className="my-1" defaultValue="+ 82 875320938" />
          <div className="pick-time my-1 d-flex justify-content-between">
            <DatePicker
              defaultValue={moment("2020/11/08", dateFormat)}
              format={dateFormat}
              className="w-100"
              onChange={(e) => onChange(e)}
            />
            <TimePicker
              defaultValue={moment("12:08:23", "HH:mm:ss")}
              className="w-100"
              onChange={(e) => onChange(e)}
            />
          </div>
          <Input className="my-1" placeholder="Enter a message to client" />
        </Modal>
      </div>
      <div className={showInfo ? "info" : "d-none"}>
        <div className="row-info d-flex">
          <div className="label-info">メール:</div>
          <div className="data">Ciprian@gmail.com</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">電話番号:</div>
          <div className="data">+82 9075347095</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">携帯電話番号:</div>
          <div className="data">+82 12355468</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">満期日:</div>
          <div className="data">MM-DD-YYYY</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">代理店コード:</div>
          <div className="data">CODE-1234</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">サブコード:</div>
          <div className="data">SUBCODE-1234</div>
        </div>
        <div className="row-info d-flex">
          <div className="label-info">前契約証券番号:</div>
          <div className="data">CODE-OLD-VESION</div>
        </div>
      </div>
      <div className="end-detail d-flex flex-row-reverse mt-2">
        <button
          onClick={() => setVisibleLink(true)}
          className="button-call px-3 rounded color-b-blue"
        >
          {props.button}
        </button>
      </div>
      {!link ? (
        <Modal
          className="text-left"
          title="Link Video Call"
          visible={visibleLink}
          // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setVisibleLink(false)}
          footer={[
            <Button key="back" onClick={() => setVisibleLink(false)}>
              Close
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={confirmLoading}
              onClick={() => handleCreateLink()}
            >
              Create Link
            </Button>,
          ]}
        >
          <Input
            className="my-1"
            defaultValue={props.name}
            prefix={<UserOutlined />}
            disabled
          />
          <div className="pick-time my-1 d-flex justify-content-between">
            <DatePicker className="w-100" onChange={(e) => onChange(e)} />
            <TimePicker className="w-100" onChange={(e) => onChange(e)} />
          </div>
        </Modal>
      ) : (
        <Modal
          className="text-left"
          title="Link Video Call"
          visible={visibleLink}
          // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setVisibleLink(false)}
          footer={[
            <Button key="back" onClick={() => setVisibleLink(false)}>
              Close
            </Button>,
          ]}
        >
          <Input
            className="link-video my-1"
            value="Link-to-video-call"
            suffix={<img src={copy} alt=""></img>}
          />
          <Input
            className="link-video my-1"
            value="Link-to-video-call"
            suffix={<img src={copy} alt=""></img>}
          />
        </Modal>
      )}
    </div>
  );
}
