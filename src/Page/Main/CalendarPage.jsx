import React, { useCallback, useEffect, useState } from "react";
// import events from "../../Data/events";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarToolbar from "../../component/Main/Calendar/CalendarToolbar";
import HeaderTable from "../../component/Main/Calendar/HeaderTable";
import MonthEvent from "../../component/Main/Calendar/MonthEvent";
import { calendartitle } from "../../component/Header/svg/index";
import SelectText from "../../component/Main/Calendar/SelectText";
import { Button } from "antd";
import {
  UploadOutlined,
  PlusCircleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import ListClient from "../../component/Main/Calendar/ListClient";
import { Modal } from "antd";
// import { Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { DatePicker, TimePicker } from "antd";
import axios from "axios";
import SetACallModal from "../../component/Main/Calendar/Support/SetACallModal";
import moment from "moment";
import { useQuery } from "react-query";
import axiosCustom from "../../Axios/AxiosCustom";

const Agents = ["Agent 1", "Agent 2", "Agent 3", "Agent 4"];
const Operator = [];
const Status = [];
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [daySelected, setDaySelected] = useState("");

  const [eventsState, setEventsState] = useState([]);
  const [change, setChange] = useState(new Date("November, 2021"));
  const [visibleSetACall, setVisibleSetACall] = useState(false);
  const [clientVisible, setClientVisible] = useState(false);

  const getData = async () => {
    return await axiosCustom.get(`https://free-agent.herokuapp.com/calendar`);
  };

  const { data } = useQuery("get-event", getData, {
    initialData: [],
  });

  useEffect(() => {
    console.log("data", data.data);
    setEventsState(data.data);
  }, [data]);

  const handleNextMonth = () => {
    var news = new Date(change);
    news.setMonth(news.getMonth() + 1);
    setChange(news);
  };
  const handlePreMonth = () => {
    var news = new Date(change);
    news.setMonth(news.getMonth() - 1);
    setChange(news);
  };
  const onNavigate = useCallback((change) => setChange(change), [setChange]);
  const handleOk = () => {
    setTimeout(() => {
      setVisibleSetACall(false);
    }, 1000);
  };

  return (
    <>
      <div className="main-title">
        <img src={calendartitle} alt=""></img>
        <div className="ml-2">カレンダー</div>
      </div>
      <div className="calendar-header d-flex my-1 ml-1 justify-content-between">
        <div className="left-calendar-header d-flex py-1 ">
          <div
            className="pre-month"
            onClick={() => handlePreMonth()}
          >{`<`}</div>
          <div className="mx-3 current-time">
            {change.getFullYear() + " 年 " + (change.getMonth() + 1) + " 月 "}
          </div>
          <div
            className="next-month"
            onClick={() => handleNextMonth()}
          >{`>`}</div>
        </div>
        <div className="right-calendar-header ">
          <SelectText
            style={{
              width: 210,
              height: 32,
              textAlign: "left",
              fontSize: 14,
              fontWeight: 400,
            }}
            data={Agents}
            name="Select Agent"
          ></SelectText>
          <SelectText
            style={{
              width: 210,
              height: 32,
              textAlign: "left",
              fontSize: 14,
              fontWeight: 400,
            }}
            data={Operator}
            name="Select Operator"
          ></SelectText>
          <SelectText
            style={{
              width: 210,
              height: 32,
              textAlign: "left",
              fontSize: 14,
              fontWeight: 400,
            }}
            data={Status}
            name="Select Status"
          ></SelectText>
          <Button
            onClick={() => setVisibleSetACall(!visibleSetACall)}
            className="right-calendar-header-button mx-1"
            type="success"
            icon={<PlusCircleOutlined />}
          >
            Set a Call
          </Button>
          <SetACallModal
            setVisibleSetACall={setVisibleSetACall}
            visibleSetACall={visibleSetACall}
          ></SetACallModal>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>

          <Button
            onClick={() => setClientVisible(!clientVisible)}
            className="client-button ml-1"
            type="primary"
            icon={<EyeTwoTone />}
          >
            Show Client
          </Button>
          <Modal
            className="client-modal"
            visible={clientVisible}
            onOk={handleOk}
            onCancel={() => setClientVisible(!clientVisible)}
            footer={""}
          >
            <ListClient time={change} className="h-auto mt-4"></ListClient>
          </Modal>
        </div>
      </div>
      <div className="calendar-content">
        <Calendar
          selectable
          onNavigate={onNavigate}
          localizer={localizer}
          date={change}
          events={eventsState}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(e) => setDaySelected(e.start)}
          components={{
            toolbar: CalendarToolbar,
            month: {
              header: HeaderTable,
              event: MonthEvent,
            },
          }}
          // dayPropGetter={(date) => {
          //   let newStyle = {};
          //   return {
          //     className: daySelected === date ? "bg-blue-30" : "",
          //     style: newStyle,
          //   };
          // }}
          eventPropGetter={(event, isSelected) => {
            let newStyle = {
              backgroundColor: "white",
              color: "black",
            };
            return {
              className: "",
              style: newStyle,
            };
          }}
          messages={{
            showMore: () => (
              <span
                className="show-more"
                role="presentation"
                // onClick={() =>
                //   this.setState({ calendarOverlay: true, currentTitleData: {} })
                // }
              >
                もっと見る
              </span>
            ),
          }}
        />
        <ListClient time={change}></ListClient>
      </div>
    </>
  );
}
