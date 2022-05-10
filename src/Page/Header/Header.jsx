import React from "react";
import EndHeader from "../../component/Header/EndHeader";
import Navbar from "../../component/Header/Navbar";
import UserBanner from "../../component/Header/UserBanner";

export default function Header() {
  return (
    <div id="header">
      <UserBanner></UserBanner>
      <Navbar></Navbar>
      <EndHeader></EndHeader>
    </div>
  );
}
