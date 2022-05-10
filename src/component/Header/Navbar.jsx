import React from "react";
import navbar from "../../Data/navbar";
import CustomLink from "./NavbarItem/CustomLink";

const navlist = JSON.parse(JSON.stringify(navbar));
export default function Navbar() {
  return (
    <div id="navbar">
      {navlist.map((each, index) => (
        <CustomLink to={each.href} key={index} icon={each.icon}></CustomLink>
      ))}
    </div>
  );
}
