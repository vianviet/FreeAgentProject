import React, { useCallback, useState } from "react";
import events from "../../Data/events";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarToolbar from "../../component/Main/Calendar/CalendarToolbar";
import HeaderTable from "../../component/Main/Calendar/HeaderTable";
import MonthEvent from "../../component/Main/Calendar/MonthEvent";
import { calendar2 } from "../../component/Header/svg/index";
import SelectText from "../../component/Main/Calendar/SelectText";
import { Button } from "antd";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ListClient from "../../component/Main/Calendar/ListClient";
import { Modal } from "antd";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DatePicker, TimePicker } from "antd";

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
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [eventsState, setEventsState] = useState(events);
  const [change, setChange] = useState(new Date("November, 2021"));
  const [visibleSetACall, setVisibleSetACall] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleSetACall(false);
      setConfirmLoading(false);
    }, 1000);
    setEventsState((prev) => [...prev, newEvent]);
  };

  const handleCancel = () => {
    setVisibleSetACall(false);
  };
  const onChange = (e) => console.log(e._d);
  return (
    <>
      <div className="calendar-title d-flex">
        <img src={calendar2} alt=""></img>
        <div className="ml-1">カレンダー</div>
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
          <Modal
            className="text-left"
            title="Set A Call"
            visible={visibleSetACall}
            // onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={() => handleCancel()}>
                Close
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={confirmLoading}
                onClick={() => handleOk()}
              >
                Send SMS
              </Button>,
            ]}
          >
            <Input
              className="my-1"
              placeholder="example"
              prefix={<UserOutlined />}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <Input className="my-1" placeholder="Enter a phone number" />
            <div className="pick-time my-1 d-flex justify-content-between">
              <DatePicker
                className="w-100"
                selected={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e._d, end: e._d })
                }
              />
              <TimePicker className="w-100" onChange={(e) => onChange(e)} />
            </div>
            <Input className="my-1" placeholder="Enter a message to client" />
          </Modal>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </div>
      </div>
      <div className="calendar-content ">
        <Calendar
          selectable
          onNavigate={onNavigate}
          localizer={localizer}
          date={change}
          events={eventsState}
          // events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(e) => console.log(e)}
          components={{
            toolbar: CalendarToolbar,
            month: {
              header: HeaderTable,
              event: MonthEvent,
            },
          }}
          eventPropGetter={(event) => {
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
                className="show-more ml-4"
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
