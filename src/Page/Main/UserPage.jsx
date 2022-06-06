import React, { useState } from "react";
import { usertitle } from "../../component/Header/svg";
import { Input, Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import columns from "../../component/Main/User/columns";
import AddNewUser from "../../component/Main/User/Support/AddNewUser";
import useListUser from "../../Common/CustomHooks/useListUser";

const { Search } = Input;
export default function UserPage() {
  const { user, setUser, isFetching } = useListUser();
  const navigate = useNavigate();
  const { page } = useParams();
  const [visibleAdd, setVisibleAdd] = useState(false);

  const onSearch = (e) => {
    const currValue = e.target.value;
    console.log(currValue);
    if (user) {
      const filteredData = user.filter((entry) =>
        entry.username.includes(currValue)
      );
      setUser(filteredData);
    }
  };

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
            onChange={(e) => onSearch(e)}
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
        loading={isFetching}
        columns={columns}
        dataSource={user}
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
