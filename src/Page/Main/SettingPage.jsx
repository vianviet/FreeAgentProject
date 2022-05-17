import Setting from "../../component/Main/Setting/Setting";
import { settingtitle } from "../../component/Header/svg/index";
export default function SettingPage() {
  return (
    <>
      <div className="main-title">
        <img src={settingtitle} alt=""></img>
        <div className="ml-2 my-auto">Setting</div>
      </div>
      <Setting />
    </>
  );
}
