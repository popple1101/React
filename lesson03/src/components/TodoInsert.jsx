import React, { useState } from 'react'
import '../assets/css/TodoInsert.scss'
import { MdAdd } from 'react-icons/md';

export default function TodoInsert({onInsert}) {
    // useState 는 2개 리턴해줌. useState는 함수고 배열 2개를 할당해줌.
    const [value, setValue] = useState('') 


    // ✔ 이벤트 함수
    const handleSubmit = (e) => {
    e.preventDefault(); // form 서버 제출 기본 동작을 못하게 막음.
    // 입력값을 할일 목록(배열)에 추가시키는 함수 실행하기
    // 새로운 할일 입력값 value는 상태변수
    onInsert(value); // APP에 있는 함수
    setValue("");
  };
    return (
        <form className="TodoInsert" onSubmit={handleSubmit}>
            <input
                placeholder="할 일을 입력하세요."
                value={value}
                onChange={(e) => setValue(e.target.value)} //  윗줄이랑 한쌍임.
            />
            {/* 버튼 클릭은 onSubmit 이벤트 발생 => form 태그에서 함수 지정 */}
            <button type="submit">
                <MdAdd />
            </button>
            {/* type="button" 이면 onClick 이벤트 발생 */}
        </form>
    )
}
