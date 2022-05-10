const MonthEvent = (event) => {
  return (
    <div className="content-event d-flex justify-content-between pb-1">
      <div>{event.title}</div>
      <div className="green-circle rounded-circle my-auto"></div>
    </div>
  );
};
export default MonthEvent;
