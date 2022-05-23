import React, { useState } from "react";
import { usertitle } from "../../component/Header/svg";
import { Input, Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import columns from "../../component/Main/User/columns";
// import data from "../../Data/user";
import { useEffect } from "react";
import axios from "axios";
import AddNewUser from "../../component/Main/User/Support/AddNewUser";
import axiosCustom from "../../Axios/AxiosCustom";

const { Search } = Input;
export default function UserPage() {
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const { page } = useParams();
  const [visibleAdd, setVisibleAdd] = useState(false);

  const onSearch = (value) => console.log(value);
  useEffect(() => {
    setConfirmLoading(true);
    // axios
    //   .get(`https://free-agent.herokuapp.com/user`)
    axiosCustom
      .get("user")
      .then((res) => {
        const list = [];
        res.data.map((each, index) => {
          const key = index;
          each = { ...each, key };
          list.push(each);
        });
        setData(list);
        setConfirmLoading(false);
      })
      .catch((error) => setConfirmLoading(false));
  }, []);

  const onPageSelect = (e) => {
    navigate(`/user/${e}`);
  };
  return (
    <>
      <div className="main-title">
        <img src={usertitle} alt=""></img>
        <div className="ml-2">User</div>
      </div>
      <div className="toolbar-user mt-3">
        <div className="right-toolbar">User List</div>
        <div className="left-toolbar">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 264 }}
          />
          <Button
            onClick={() => setVisibleAdd(true)}
            className="ml-2"
            type="primary"
          >
            + Add New
          </Button>
          <AddNewUser
            visible={visibleAdd}
            setVisible={setVisibleAdd}
          ></AddNewUser>
        </div>
      </div>
      <Table
        loading={confirmLoading}
        columns={columns}
        dataSource={data}
        pagination={{
          onChange: (e) => onPageSelect(e),
          defaultCurrent: page,
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />
    </>
  );
}
