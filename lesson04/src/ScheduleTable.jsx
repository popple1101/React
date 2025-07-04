import { useState } from "react";

const date1 = {
  date: "2025-06-30",
  time: ["09:00", "11:00", "12:30", "14:00", "16:45"],
  todo: ["수업", "과제", "점심식사", "주간회의", "자료조사"],
};

const date2 = {
  date: "2025-07-01",
  time: ["08:00", "10:00", "11:20", "14:00", "15:00", "17:00"],
  todo: ["수업", "회의", "점심식사", "운동", "업무", "친구약속"],
};

const date3 = {
  date: "2025-07-03",
  time: ["09:00", "11:00", "12:30", "14:00", "16:45"],
  todo: ["수업", "과제", "점심식사", "주간회의", "자료조사"],
};

const date4 = {
  date: "2025-07-05",
  time: ["08:00", "10:00", "11:20", "14:00", "15:00", "17:00"],
  todo: ["수업", "회의", "점심식사", "운동", "업무", "친구약속"],
};

const schedules = [date1, date2, date3, date4];

export default function ScheduleTable() {
  const [schedule, setSchedule] = useState(schedules[0]);

  const handleSelected = (idx) => {
    setSchedule(schedules[idx]);
  };

  return (
    <div
      className="container"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        {/* sch 객체는 date, time(배열), todo(배열) */}
        {schedules.map((sch, idx) => (
          <button
            key={idx}
            onClick={() => handleSelected(idx)}
            disabled={schedule.date === sch.date}
            style={{
              margin: "0 5px",
              padding: "8px 16px",
              backgroundColor: schedule.date === sch.date ? "#ccc" : "#007bff",
              color: schedule.date === sch.date ? "#666" : "white",
              border: "none",
              borderRadius: "4px",
              cursor: schedule.date === sch.date ? "not-allowed" : "pointer",
            }}
          >
            {sch.date}
          </button>
        ))}
      </div>
      <hr />
      <h3 style={{ color: "#333", marginBottom: "1rem" }}>{schedule.date}</h3>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                textAlign: "center",
              }}
            >
              TIME
            </th>
            {schedule.time.map((t, idx) => (
              <th
                key={`time-${idx}`}
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              TODO
            </td>
            {schedule.todo.map((t, idx) => (
              <td
                key={`todo-${idx}`}
                style={{ padding: "10px", textAlign: "center" }}
              >
                {t}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
