// 데이터 처리 로직의 뇌
// 할 일 추가/삭제/선택/체크 기능 전부 담당
// 현재 파일에서는 화면만 보여주고, 이 훅이 진짜 일함
// 이 파일을 이해하면 "어떻게 데이터가 흐르는가"를 이해하게 됨

// 날짜 선택했을 때, 무슨 데이터가 뜨는지
// 할 일을 추가하면 어디에 저장되는지
// 체크하면 어떻게 상태가 바뀌는지

import { useState, useEffect, useMemo } from "react";
import { scheduleApi } from "../api/scheduleApi";
import { DEFAULT_TIME } from "../api/constants";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState(null); // 전체 일정 목록
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 날짜의 일정(할 일 목록)
  const [loading, setLoading] = useState(true); // 로딩 중인지 여부를 나타내는 상태
  const [error, setError] = useState(null); // 에러 발생 시 메시지를 담는 상태

  // 정렬된 스케줄 메모이제이션
  const sortedSchedules = useMemo(() => { // 
    return schedules?.sort((a, b) => new Date(a.date) - new Date(b.date));
    // schedules가 존재할 때만 정렬을 수행. ?.는 옵셔널 체이닝 -- null이면 무시
    // 오름차순 정렬(빠른 날짜가 앞으로)
  }, [schedules]);

/*
  👉 useMemo는 리액트 훅 중 하나예요.
값을 미리 계산해놓고, 의존성 값이 바뀔 때만 다시 계산해요.
(= 쓸데없는 계산 반복을 막아줌, 성능 최적화용)

useMemo(() => {
  // 계산할 내용
  return ...;
}, [의존성배열]);
  
  
*/

  // 초기 데이터 로드
  const loadData = async () => { // loadData 함수를 비동기 함수로 정의 (async = await 사용 가능)
    try {
      setLoading(true); // setLoading은 true로 상태값 변경 (로딩 중 상태로 설정)
      setError(null); // setError는 null로 상태값 변경 (에러 상태 초기화. 이전 에러 메시지 제거)

      // 비동기 작업이 끝날 때까지 기다림
      const data = await scheduleApi.getAllSchedules(); // data 변수에 모든 스케줄 데이터를 서버에서 받아옴
      setSchedules(data); // 전체 스케줄을 방금 받아온 data 변수로 상태를 변경
      if (data.length > 0) { // data 배열길이가 0보다 크면 (받아온 데이터 배열이 비어 있지 않다면)
        setSelectedSchedule(data[0]); // 내가 선택한 스케줄 일정을 데이터 배열 첫 번째 값으로 상태를 변경
      }
    } catch (err) { // 위에 조건문이 false면
      setError(err.message); // 에러 메시지를 상태에 저장해서 화면에 표시할 수 있도록 함
      console.error("Error loading schedules:", err); // 이런 에러 메세지 콘솔로 출력
    } finally {
      setLoading(false); // 성공하든 실패하든 로딩 상태는 종료함
    }
  };

/*
scheduleApi.getAllSchedules()는 서버에 HTTP 요청을 보냄

예: GET /schedules 같은 API 호출

즉, 데이터를 즉시 리턴하는 게 아니라,
서버가 응답할 때까지 기다려야 함

그래서 이 함수는 Promise를 반환함

Promise는 “미래에 값이 올 거야”라고 약속하는 객체

await는 그 응답이 올 때까지 기다리는 키워드

기다렸다가 **실제 결과 값(data)**을 const data에 담음

"서버에서 데이터를 가져오는 모든 함수는 보통 비동기(Promise)이다 → await 필요"
*/

  // 특정 날짜 스케줄 선택
  const selectScheduleByDate = async (date) => { //
    try {
      setLoading(true);
      setError(null);
      
      // 서버에 요청해서 해당 날짜의 일정(todos)을 받아옴
      const data = await scheduleApi.getScheduleByDate(date); // date :  사용자가 선택한 날짜 값

      // 추가된 시간 포함하여. todos 를 time 속성으로 정렬
      // data가 있을 때만 data.todos 값 가져와서 sort 하기
      data?.todos.sort((a, b) => a.time.localeCompare(b.time));
      setSelectedSchedule(data); // 선택된 날짜의 데이터를 상태에 저장. 이 데이터가 화면에 렌더링되어 사용자가 할 일을 볼 수 있게 함
    } catch (err) {
      setError(err.message);
      console.error("Error selecting schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  // 체크 상태 업데이트
  const updateCheckedStatus = async (time, checked) => {
    if (!selectedSchedule)return;

    try {
      setLoading(true);
      setError(null);
      await scheduleApi.updateCheckedStatus(
        selectedSchedule.date,
        time,
        checked
      );

      // 로컬 상태 업데이트
      const updatedTodos = selectedSchedule.todos.map((item) =>
        item.time === time ? { ...item, checked: !item.checked } : item
      );

      const updatedSchedule = {
        ...selectedSchedule,
        todos: updatedTodos,
      };

      setSelectedSchedule(updatedSchedule);

      // 전체 스케줄 목록도 업데이트
      setSchedules((prevSchedules) =>
        prevSchedules.map((item) =>
          item.date === selectedSchedule.date ? updatedSchedule : item
        )
      );
      
    } catch (err) {
      setError(err.message);
      console.error("Error updating checked status:", err);
    } finally {
      setLoading(false);
    }
  };

  /// 할일 삭제
  const deleteTodo = async (time) => {
    if (!selectedSchedule) return;

    try {
      setLoading(true);
      setError(null);
      await scheduleApi.deleteTodo(selectedSchedule.date, time);

      // 로컬 상태 업데이트
      if (time) {
        const filteredTodos = selectedSchedule.todos.filter(
          (item) => item.time !== time
        );

        const updatedSchedule = {
          ...selectedSchedule,
          todos: filteredTodos,
        };

        setSelectedSchedule(updatedSchedule);

        // 전체 스케줄 목록도 업데이트
        setSchedules((prevSchedules) =>
          prevSchedules.map((item) =>
            item.date === selectedSchedule.date ? updatedSchedule : item
          )
        );
      } else {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((item) =>
            item.date !== selectedSchedule.date
          )
        );
        setSelectedSchedule({})
      }

    } catch (err) {
      setError(err.message);
      console.error("Error deleting todo:", err);
    } finally {
      setLoading(false);
    }
  };

  // 새 할일 추가
  const addTodo = async (date, time, text) => {
    try {
      setLoading(true);
      setError(null);
      await scheduleApi.addTodo(date, time, text); // 서버에서 새 할 일을 저장하는 API 호출

      const newTodo = { time, text, checked: false }; // 새로 추가된 할 일 객체 생성
      const existingSchedule = schedules?.find((item) => item.date === date);
      // 새 할 일을 넣을 날짜가 이미 있다면 existingSchedule 변수에 저장. 없다면(undefined)

      if (!existingSchedule) { // 선택한 날짜의 스케줄이 없으면(새 날짜라면)
        // 새 날짜 스케줄 생성
        const newSchedule = { date, todos: [newTodo] };
        setSchedules((prevSchedules) => [...prevSchedules, newSchedule]); // 이전 스케줄 목록에 새 스케줄을 추가하여 상태 업데이트
        setSelectedSchedule(newSchedule); // 새로 만든 날짜를 현재 선택된 스케줄로 설정
      } else {
        // 기존 스케줄에 추가
        // 기존 스케줄 복사 후, 할 일 목록에 새 할 일을 추가
        // 할 일 목록은 시간 순서대로 정렬함
        const updatedSchedule = {
          ...existingSchedule,
          todos: [...existingSchedule.todos, newTodo].sort((a, b) =>
            a.time.localeCompare(b.time)
          ),
        };

        // 전체 스케줄 목록에서 해당 날짜 스케줄만 업데이트
        // 나머지 날짜 스케줄은 그대로 유지
        setSchedules((prevSchedules) =>
          prevSchedules.map((item) =>
            item.date === date ? updatedSchedule : item
          )
        );
        
        setSelectedSchedule(updatedSchedule);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding todo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // 데이터를 불러오는 함수
  }, []); // 의존성 배열이 비어 있으므로 '처음 한 번만' 실행됨

  return {
    schedules,
    selectedSchedule,
    sortedSchedules,
    loading,
    error,
    selectScheduleByDate,
    updateCheckedStatus,
    deleteTodo,
    addTodo,
  };
};
