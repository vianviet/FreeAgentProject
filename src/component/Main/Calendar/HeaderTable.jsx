import React from "react";

export default function HeaderTable(Label) {
  const checkDate = (text) => {
    switch (text.label) {
      case "Sunday": {
        return "日";
      }
      case "Monday": {
        return "月";
      }
      case "Tuesday": {
        return "火";
      }
      case "Wednesday": {
        return "水";
      }
      case "Thursday": {
        return "木";
      }
      case "Friday": {
        return "金";
      }
      case "Saturday": {
        return "土";
      }
      default: {
        return "Undefind";
      }
    }
  };
  return (
    <span className="header-table" role="columnheader" aria-sort="none">
      {checkDate(Label)}
    </span>
  );
}
