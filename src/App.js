import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Auth/Login/Login";
import PrivateRoute from "./Auth/RouterCustom/PrivateRoute";
import PublicRoute from "./Auth/RouterCustom/PublicRoute";
import HomePage from "./Page/HomePage";
import AccountPage from "./Page/Main/AccountPage";
import CalendarPage from "./Page/Main/CalendarPage";
import SettingPage from "./Page/Main/SettingPage";
import UserPage from "./Page/Main/UserPage";
import "antd/dist/antd.css";
import ProfilePage from "./Page/Main/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route path="*" element={<Navigate to="calendar" />}></Route>
            <Route path="" element={<Navigate to="calendar" />}></Route>
            <Route path="calendar" element={<CalendarPage> </CalendarPage>} />
            <Route path="user" element={<UserPage> </UserPage>}></Route>
            <Route
              path="account"
              element={<AccountPage> </AccountPage>}
            ></Route>
            <Route
              Route
              path="setting"
              element={<SettingPage> </SettingPage>}
            ></Route>
            <Route path="profile" element={<ProfilePage></ProfilePage>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
