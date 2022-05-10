import React from "react";
import { Outlet } from "react-router";
import Header from "./Header/Header";

export default function HomePage() {
  return (
    <div id="home-page" className="d-flex flex-row">
      <Header></Header>
      <div id="main" className="ml-5 mt-4">
        <Outlet />
      </div>
    </div>
  );
}
