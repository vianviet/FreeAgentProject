import React from "react";
import Ava from "./EndHeader/Ava";
import Logout from "./EndHeader/Logout";

export default function EndHeader() {
  return (
    <div className="mt-auto">
      <Ava></Ava>
      <Logout></Logout>
    </div>
  );
}
