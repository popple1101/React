import { MyCalendar } from "./MyCalendar";
// 날짜 버튼 대신에 캘린더로 변경하여 더 이상 사용하지 않음(지우기 가능)
const ScheduleButtons = ({ schedules, selectedDate, onScheduleSelect }) => {
  const buttonStyle = (isSelected) => ({
    margin: "0 5px",
    padding: "8px 16px",
    backgroundColor: isSelected ? "#ccc" : "#007bff",
    color: isSelected ? "#666" : "white",
    border: "none",
    borderRadius: "4px",
    cursor: isSelected ? "not-allowed" : "pointer",
  });

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      {schedules.map((schedule, index) => {
        const isSelected = selectedDate === schedule.date;
        return (
          <button
            key={index}
            onClick={() => onScheduleSelect(schedule.date)}
            disabled={isSelected}
            style={buttonStyle(isSelected)}
          >
            {schedule.date}
          </button>
        );
      })}
      <MyCalendar />
    </div>
  );
};

export default ScheduleButtons;
