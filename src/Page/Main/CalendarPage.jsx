import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import { Button, message, Select } from "antd";
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
import { useQuery, useQueryClient } from "react-query";
import axiosCustom from "../../Axios/AxiosCustom";
import { useSearchParams } from "react-router-dom";
import SelectExcel from "../../component/Main/Calendar/Support/SelectExcel";
import env from "react-dotenv";
import Upload from "../../component/Main/Calendar/Support/Upload";

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
  const [id, setId] = useState("");
  // const [eventsState, setEventsState] = useState([]);
  const [change, setChange] = useState(new Date("November, 2021"));
  const [visibleSetACall, setVisibleSetACall] = useState(false);
  const [clientVisible, setClientVisible] = useState(false);
  // const [refresh, setRefresh] = console.log("eventsState", eventsState);

  const queryClient = useQueryClient();

  const getData = async (id) => {
    console.log("idddd", id);
    if (id) {
      const result = await axiosCustom
        .get(`/calendar/findOne/${id}`)
        .then((res) => res.data);
      // setEventsState(result.data);

      console.log("result", result);
      // setEventsState(result.data);
      return result;
    }
    return;
  };

  const { data: eventsState } = useQuery(["get-event", id], () => getData(id), {
    initialData: [],
  });

  useEffect(() => {
    // console.log("data 123", data.data);

    getData();
    queryClient.invalidateQueries("get-event");
  }, [id]);

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
          <SelectExcel setId={setId}></SelectExcel>
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
            id={id}
            setVisibleSetACall={setVisibleSetACall}
            visibleSetACall={visibleSetACall}
          ></SetACallModal>
          <Upload></Upload>

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
