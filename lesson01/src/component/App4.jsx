// Day1_07 : TimeTableH 의 부모컴포넌트
//           자식 컴포넌트 TimeTableH 에게 2개의 배열을 전달해야 함.

import TimeTableH from "./TimeTableH"
import TimeTableH_2 from "./TimeTableH_2"

export default function App() {
    const time = ["09:00", "11:00", "12:30", "14:00", "16:45"]
    const todo = ["수업", "과제", "점심식사", "주간회의", "자료조사"]
  return (
    <div>
        {/* time,todo,title 속성은 객체 형태로 자식 컴포넌트에게 전달 */}
        {/* 자식 1: 함수 인자로 객체를 분해하여 각 속성 변수를 선언 */}
        <TimeTableH time={time} todo={todo} title={"첫번째 시간표"}/>
        {/* 자식 2: 함수 인자로 객체를 저장할 변수 선언 */}
        <TimeTableH_2 time={time} todo={todo} title={"두번째 시간표"}/>
    </div>
  )
}
