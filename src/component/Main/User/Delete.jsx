import { message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import axiosCustom from "../../../Axios/AxiosCustom";
import { useMutation, useQueryClient } from "react-query";

export default function Delete({ data }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const deleteUser = async (_id) => {
    setConfirmLoading(true);
    return axiosCustom
      .delete(`/user/${data._id}`)
      .then((res) => {
        setConfirmLoading(false);
        console.log(res.data);
        setVisible(false);
        message.success("Success to delete user !", 1);
      })
      .catch((err) => {
        setConfirmLoading(false);
        message.error("Fail to delete user !", 1);
        setVisible(false);
      });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-users");
    },
  });

  const handleOk = () => {
    mutation.mutate(data._id);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <div onClick={(e) => setVisible(true)} className="table-button">
        Delete
      </div>
      <Modal
        title="Delete user"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{`Are you sure to delete user ${data.username} ?`}</p>
      </Modal>
    </>
  );
}
