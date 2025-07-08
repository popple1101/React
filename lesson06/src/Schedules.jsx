// 메인화면
// 일정 관리 메인 로직
// 할 일 보여주기 / 달력 클릭해서 날짜 고르기 / 추가 / 체크 / 삭제

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 캘린더 기본 스타일

// 데이터 처리 로직의 뇌
// 할 일 추가/삭제/선택/체크 기능 전부 담당
// 현재 파일에서는 화면만 보여주고, 이 훅이 진짜 일함
import { useSchedules } from "./hooks/useSchedules";

// 하위 컴포넌트
import TodosCardList from "./TodosCardList"; // 날짜에 해당하는 할 일 카드들 나열
import TodoForm from "./components/TodoForm"; // 할 일 추가하는 입력 폼
import LoadingSpinner from "./components/LoadingSpinner"; // 로딩 중 표시
import ErrorMessage from "./components/ErrorMessage"; // 에러 시 표시
import { dateFormat } from "./utils/dateUtils"; // 날짜 객체를 'YYYY-MM_DD' 문자열로 바꾸는 유틸 함수

export default function Schedules() {
  const {
    schedules,
    selectedSchedule,
    sortedSchedules,
    loading,
    error,
    selectScheduleByDate,
    updateCheckedStatus,
    deleteTodo,
    addTodo,
  } = useSchedules();

  // 달력에서 선택한 날짜를 상태로 관리함. 초기값은 오늘 날짜.
  const [calendarDate, setCalendarDate] = useState(new Date());

  // 캘린더에서 선택한 날짜는 콜백함수에서 입력값(인자)로 전달.
  const handleDateChange = (date) => {
    setCalendarDate(date); // date 는 new Date() 형식의 객체 (선택한 날짜를 상태에 저장)
    const selDate = dateFormat(date); // 날짜객체로 문자열'YYYY-MM-DD'
    selectScheduleByDate(selDate);
    // 날짜로 nodejs(백엔드) 서버에서 일정가져와서 selectedSchedule 상태값 변경
  };

  if (loading) {
    return <LoadingSpinner message="스케줄을 불러오는 중..." />; // 데이터 로딩 중이면 로딩 스피너를 보여줌
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      // 다시 시도하면 페이지 새로고침
    );
  }

  const handleAllDelete = () => {
    const yn = window.confirm(
      `${selectedSchedule.date} 모든 일정을 삭제할까요?`
    )
    if (yn) deleteTodo(null) // time 은 null
              // ㄴ 로컬 상태 업데이트를 추가하기 : time 이 null 일때,
              // schedules 상태값을 해당 날짜제외하고 필터링
  }

  // if (!schedules || schedules.length === 0) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <h3>스케줄 데이터가 없습니다.</h3>
  //       <TodoForm onAddTodo={addTodo} />
  //       {/* 스케줄이 없어도 할 일 추가는 가능하도록 입력 폼을 보여줌 */}
  //     </div>
  //   );
  // }

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        일정 관리
      </h2>

      <button onClick={handleAllDelete}>전체 삭제</button>

      {/* 캘린더 UI */}
      {/* 달력 + 할일 목록 + 추가 폼 */}
      <div style={{ display: "flex" }}>
        <div style={{ margin: "30px", width: "380px", textAlign: "center" }}>
          <Calendar
            onChange={handleDateChange} // 사용자가 날짜를 클릭하면 실행될 함수
            value={calendarDate} // 위에가 실행되면 calendarDate 상태값 변경됨
            // 현재 선택된 날짜 값(상태값). 달력의 선택 상태를  이 값이 유지함

            locale="ko-KR"
            formatDay={(locale, date) => date.getDate()} // 날짜의 일 글자 사라짐
            tileContent={({ date, view }) => {
              if (view === "month") { // month 뷰일 때만 동작 (일별 보기 등에서는 작동 X)
                const dateStr = dateFormat(date); // Date 객체를 'YYYY-MM-DD' 문자열로 변환

                // 현재 날짜에 해당하는 스케줄이 있는지 확인
                // .? -> schedules 가 null일 수 있어서 에러 방지
                const hasSchedule = schedules?.some((s) => s.date === dateStr);
                return hasSchedule ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "pink",
                      fontSize: "1.2rem",
                    }}
                  >
                    ●
                  </div>
                ) : null;
              }
              return null;
            }}
          />

          {/* 새 할일 추가 */}
          <TodoForm
            calendarDate={dateFormat(calendarDate)}
            onAddTodo={addTodo}
          />
          <hr style={{ margin: "2rem 0" }} />
        </div>

        <div style={{ marginBottom: "2rem", width: "400px" }}>
          <h3 style={{ color: "#333", marginBottom: "1rem" }}>
            📅 {selectedSchedule?.date}
          </h3>
            {/*  선택된 날짜에 selectedSchedule.todos 가 있을 때만 TodosCardList 컴포넌트
            를 만들어요. selectedSchedule.todos 는 selectedSchedule 객체가 null 일때(false) 실행하면
            오류가 생깁니다. 그래서 앞에 조건을 추가.*/}
          {selectedSchedule &&
          selectedSchedule.todos &&
          selectedSchedule.todos.length > 0 ? (
            <>
              <hr style={{ margin: "2rem 0" }} />
              <TodosCardList
                todos={selectedSchedule.todos}
                onCheckedUpdate={updateCheckedStatus}
                onRemoved={deleteTodo}
              />
            </>
          ) : (
            <p
              style={{
                color: "#666",
                fontStyle: "italic",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              이 날짜에 등록된 할일이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
1. 캘린더에 날짜를 클릭하면 (이벤트 함수 실행)

2. 이벤트 함수는 클릭한 날짜를 문자열로 바꿉니다. 
   yyyy-mm-dd 문자열로 해당 날짜의 스케줄 데이터를 백엔드(nodejs) 서버에서 가져옵니다. 
   3번의 재렌더링을 위해서 selectedSchedule 상태값을 변경해야 합니다.

3. 날짜를 클릭할 때 재렌더링은
   오른쪽의 TodoCardList 컴포넌트. 이 때 필요한 값은 selectedSchedule.todos

 */
