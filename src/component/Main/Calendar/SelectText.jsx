import React from "react";
import { Select } from "antd";
const { Option } = Select;

export default function SelectText(props) {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <Select
      className="ml-1"
      placeholder={props.name}
      style={props.style}
      onChange={handleChange}
    >
      {props.data.map((each, index) => (
        <Option style={{ textAlign: "left" }} key={index} value={each}></Option>
      ))}
    </Select>
  );
}
