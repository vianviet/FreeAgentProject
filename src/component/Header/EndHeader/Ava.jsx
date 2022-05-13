import React from "react";
import { useNavigate } from "react-router";
import ava from "../svg/ava.svg";

export default function Ava() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <img onClick={(e) => handleClick()} className="mb-3" src={ava} alt="ava" />
  );
}
