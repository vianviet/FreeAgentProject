import React, { useState } from "react";
import { useNavigate } from "react-router";
import au from "../../Data/authen";

const userData = JSON.parse(JSON.stringify(au));
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    var message;
    for (var i = 0; i < userData.length; i++) {
      if (
        userData[i].username === username &&
        userData[i].password === password
      ) {
        localStorage.setItem("username", username);
        localStorage.setItem("au", true);
        message = "正常にログインしました";
        navigate("/calendar");
        break;
      } else {
        message = "インに失敗しました";
      }
    }
    alert(message);
  };
  const navigate = useNavigate();
  return (
    <div id="login-page">
      <div className="login d-flex flex-column justify-content-between">
        <div></div>
        <div className="text-uppercase header mt-3">freeagent</div>
        <div className="main d-flex justify-content-center mb-5">
          <form className="d-flex flex-column">
            <input
              className="input mt-3 mb-3 p-10"
              type="text"
              placeholder="ユーザID --> admin"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input mt-3 mb-3"
              type="password"
              placeholder="パスワード --> admin"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="login-btn mt-3 mb-3"
              onClick={(e) => handleClick(e)}
            >
              ログイン
            </button>
          </form>
        </div>
        <div></div>
        <div className="footer mb-4">©2021 Faeast</div>
      </div>
    </div>
  );
}
