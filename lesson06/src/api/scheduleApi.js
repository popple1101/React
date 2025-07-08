import { API_BASE_URL } from "./constants";

export const scheduleApi = {
  // schedules 과 관련된 api 함수를 scheduleApi 객체의 속성으로 정의. 함수이름=속성이름

  // 모든 스케줄 가져오기
  async getAllSchedules() {
    const response = await fetch(API_BASE_URL); // API_BASE_URL로 GET 요청 보내서 모든 스케줄을 받아옴
    if (!response.ok) { // 응답이 성공적이지 않으면 에러 던짐
      throw new Error("Failed to load schedules");
    }
    return response.json(); // 응답 결과를 JSON 형태로 반환
  },

  // 특정 날짜 스케줄 가져오기
  async getScheduleByDate(date) {
    const response = await fetch(`${API_BASE_URL}/${date}`); // URL에 날짜를 붙여서 해당 날짜 스케줄 요청
    if (!response.ok) {
      throw new Error(`Failed to load schedule for date: ${date}`);
    }
    return response.json();
  },

  // 체크 상태 업데이트 (할 일 완료/미완료 토글)
  async updateCheckedStatus(date, time, checked) {
    const response = await fetch(API_BASE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
        checked: !checked, // 서버에는 현재 checked 상태 반대로 보내서 토글 처리
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update checked status");
    }
    return response.json();
  },

  // 할일 삭제
  async deleteTodo(date, time) { // 
    const response = await fetch(API_BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    return response.json();
  },

  // 새 할일 추가
  async addTodo(date, time, text) {
    const response = await fetch(`${API_BASE_URL}/${date}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time,
        text,
        checked: false, // 새로 추가하는 할 일은 기본적으로 체크 안된 상태
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    return response.json();
  },
};
