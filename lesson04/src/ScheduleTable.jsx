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

const schedules = [date1, date2, date3, date4]; // 

export default function ScheduleTable() {
  // 데이터는 4개 중 하나를 선택해서 상태값으로 관리
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
/**ScheduleTable.jsx 코드 분석.

1. {date,time,todo} 객체의 배열을 자료구조(데이터) 사용 : schedules 변수
	ㄴ time, todo는 배열이다.
    schedules 변수는 인덱스로 접근, ,map 메소드 콜백함수 인자로 한개씩 저장

    예시 :  schedules.map((sch, idx) => 실행코드에서 요소 한개씩 sch에 저장)
            handleSelected(idx) : 인덱스값 함수에 전달

2. 1번 데이터는 4개 중 하나를 선택해서 상태값으로 관리
   const [schedule, setSchedule] = useState(schedules[0]);

3. 버튼 클릭할 때마다 schedule 을 변경. => setSchedule(schedules[idx])

4. 3번에서 상태값 schedule 을 변경하면 schedule 를 사용하는 태그 요소의 출력이 변경됩니다.
   (재렌더링) *참고: 기전 JS 는 DOM 을 직접 조작 */