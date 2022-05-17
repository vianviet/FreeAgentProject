import React from "react";
import { useNavigate } from "react-router";
import ava from "../svg/ava.svg";

export default function Ava() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img onClick={(e) => handleClick()} src={ava} alt="ava" />
    </div>
  );
}
