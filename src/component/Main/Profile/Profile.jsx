import { Button, Space } from "antd";
import React from "react";

export default function Profile() {
  return (
    <div className="profile-content ">
      <div className="content-title">Account Setting</div>
      <div className="content-wrap">
        <div className="a-line d-flex justify-content-center">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Space>
              <h3>Name</h3>
              <h3>:</h3>
              <h3>User name</h3>
            </Space>
            <Space>
              <h3>Email</h3>
              <h3>:</h3>
              <h3>emailname@fea.com</h3>
            </Space>
          </Space>
          {/* <div>Name</div>
          <div>:</div>
          <div>User Name</div> */}
        </div>
        <div>
          {/* <div>Email</div>
          <div>:</div>
          <div>emailname@fea.com</div> */}
        </div>
        <Button className="ml-2" type="primary">
          Update Password
        </Button>
      </div>
    </div>
  );
}
