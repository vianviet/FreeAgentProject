import React from "react";

export default function Loading(props) {
  console.log(props);
  return <div className={`${props} loading`}>Loading</div>;
}
