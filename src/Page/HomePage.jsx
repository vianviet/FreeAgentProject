import React from "react";
import { Outlet } from "react-router";
import Header from "./Header/Header";

export default function HomePage() {
  return (
    <div id="home-page">
      <Header></Header>
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}
