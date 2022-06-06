import axios from "axios";
import isExpired from "../Auth/Support/isExpired";

const generateToken = async (token) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/refreshToken`, {
      token: token,
    });
    return res.data;
  } catch (err) {
    localStorage.setItem("token", "");
    window.location.reload();
    console.log("err", err);
  }
};

const axiosCustom = axios.create({
  baseURL: process.env.REACT_APP_URL,
  // baseURL: 'https://free-agent.herokuapp.com/',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCustom.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      if (!isExpired(token)) {
        const data = await generateToken(token);
        console.log("generatedata", data);
        config.headers["Authorization"] = await ("Bearer " + data.token);
        await localStorage.setItem("token", data.token);
      } else {
        config.headers["Authorization"] =
          "Bearer " + localStorage.getItem("token");
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// axiosCustom.interceptors.response.use(
//     function(response) {
//         return response;
//     },
//     function(error) {
//         const { config, status, data } = error.response;
//         console.log("config", config)
//         console.log("status", status)
//         console.log("data", data)
//         if (status === 403) {
//             localStorage.setItem("token", data.token)
//         }
//         return Promise.reject(error);
//     }
// );
export default axiosCustom;
