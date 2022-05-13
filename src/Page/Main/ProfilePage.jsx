import React from "react";
import ava from "../../component/Header/svg/ava.svg";
import Profile from "../../component/Main/Profile/Profile";

export default function ProfilePage() {
  return (
    <>
      <div className="main-title">
        <img src={ava} alt=""></img>
        <div className="ml-2 my-auto">Profile</div>
      </div>
      <Profile></Profile>
    </>
  );
}
