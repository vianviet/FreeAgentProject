import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axiosCustom from "../../../../Axios/AxiosCustom";

const { Option } = Select;
export default function SelectExcel({ setId }) {
  // const [file, setFile] = useState([]);

  const fetchData = async (data) => {
    return axiosCustom.get("/upload/").then((e) => {
      console.log(e.data);
      setId(e.data[0]._id);
      return e.data;
    });
    // .catch((err) => console.log(err));
  };
  const { data } = useQuery("get-excel", fetchData, {});
  // console.log("dataaaa", data);
  // useEffect(() => {
  //   fetchData();
  // }, [data]);
  const handleChange = (value) => {
    setId(value.value);
    // mutation.mutate(value.value);
  };
  return (
    <>
      {data && (
        <Select
          labelInValue
          defaultValue={{
            value: data[0]._id,
            label: data[0].originalname,
          }}
          style={{
            width: 210,
            height: 32,
            textAlign: "left",
            fontSize: 14,
            fontWeight: 400,
          }}
          onChange={handleChange}
          name="Select Agent"
        >
          {data.map((each, index) => {
            return (
              <Option key={index} value={each._id}>
                {each.originalname}
              </Option>
            );
          })}
        </Select>
      )}
    </>
  );
}
