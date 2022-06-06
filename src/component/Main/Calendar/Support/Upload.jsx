import { UploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

export default function Upload() {
  const upload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("NAPA", file);
    return axios
      .post(`${process.env.REACT_APP_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("object", res);
        message.success("Upload success");
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Upload fail");
      });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(upload, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-excel");
    },
  });
  const handleUpload = (e) => {
    mutation.mutate(e);
  };
  return (
    <Button type="primary" icon={<UploadOutlined />}>
      <label className="ml-1" htmlFor="filename">
        Upload
      </label>
      <input
        type="file"
        id="filename"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </Button>
  );
}
