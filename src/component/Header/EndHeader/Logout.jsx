import React from "react";
import { useNavigate } from "react-router";
import logout from "../svg/logout.svg";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    alert("Chac chua?");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="logout d-flex justify-content-center align-items-center mb-2 ml-3">
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        onClick={() => handleClick()}
      >
        <img
          className="d-flex justify-content-center align-items-center"
          src={logout}
          alt="logout"
        />
        <div className="d-flex justify-content-center align-items-center">
          Sign Out
        </div>
      </div>
    </div>
  );
}
