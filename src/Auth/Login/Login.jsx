import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { message, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import validation from "../../utils/validation/validation";
import axiosCustom from "../../Axios/AxiosCustom";
import { GoogleLogin } from "@react-oauth/google";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    const validate = validation(data, "login");

    if (validate.length === 0) {
      setIsLoading(true);
      // axios.post(`https://free-agent.herokuapp.com/user/authen`, data)
      axiosCustom
        .post("user/authen", data)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            localStorage.setItem("username", username);
            localStorage.setItem("token", res.data.token);
            setIsLoading(false);
            message.success("正常にログインしました", 1);
            navigate("/calendar");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          message.error("インに失敗しました", 2);
        });
    } else {
      validate.map((each) => message.error(each));
    }
  };
  const responseGoogle = (response) => {
    axiosCustom
      .get(`user/authen/google/${response.credential}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem("username", username);
          localStorage.setItem("token", res.data.token);
          setIsLoading(false);
          message.success("正常にログインしました", 1);
          navigate("/calendar");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        message.error("インに失敗しました", 2);
      });
  };
  const navigate = useNavigate();
  return (
    <div id="login-page">
      {isLoading ? (
        <Spin
          justify="center"
          className={isLoading ? "d-flex align-items-center" : "d-none"}
          indicator={antIcon}
        />
      ) : (
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
              <GoogleLogin
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              ></GoogleLogin>
            </form>
          </div>
          <div></div>
          <div className="footer mb-4">©2021 Faeast</div>
        </div>
      )}
    </div>
  );
}
