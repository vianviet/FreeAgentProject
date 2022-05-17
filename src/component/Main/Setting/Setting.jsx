import { Button, Input } from "antd";
import React from "react";

export default function Setting() {
  return (
    <div className="profile-content ">
      <div className="content-title">Setting Video</div>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-left width-600 my-5">
            <div className="input d-flex my-2">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Access token :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input className="ml-2" placeholder="example" onChange={""} />
            </div>
            <div className="input d-flex my-2">
              <div className="label-line-add-account my-auto">
                <div className="ml-2 ">Security Code :</div>
                <div className="color-dustred">*</div>
              </div>
              <Input className="ml-2" placeholder="example" onChange={""} />
            </div>
          </div>
          <div className="button-">
            <Button className="width-90 mr-2 ">Cancel</Button>
            <Button className="width-90 mr-2" type="primary">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
