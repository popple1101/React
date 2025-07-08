// 할 일 입력 및 추가 기능

import React, { useState } from "react"
import { MdAdd } from "react-icons/md"

// 1. useState 훅 사용해서 입력 값(value) 상태 관리
// 2. onSubmit 이벤트로 할일 추가 처리 (handleSubmit)
// 3. input + button UI 생성
// 4. 부모(App)로부터 받은 onInsert 함수 호출
/*
onInsert 라는 이름으로 props를 받아서
사용자가 폼을 제출했을 때, 입력된 text를 인자로 넘겨 호출해
: onInsert(value)

*/


export default function TodoInsert({ onInsert }) {
    
    const [value,setValue] = useState('')

    
    const handleSubmit = (e) => { // 사용자가 입력 후 제출할 때 발생하는 동작을 제어하고, 그 값을 부모에게 넘기고, 입력창을 초기화하는 함수
    // handleSubmit 제출 이벤트가 발생했을 때 호출되는 함수.
    // e : 이벤트 객체. 여기서는 submit 이벤트 관련 정보가 담겨 있어.

    e.preventDefault();
    // 브라우저의 기본 동작(여기선 폼 제출 시 페이지 새로고침) 을 막아줘.
    // 그래야 화면이 리로드되지 않고, 우리가 원하는 동작(입력값 처리)을 할 수 있어.

    onInsert(value); // 부모 컴포넌트 APP에서 전달받은 함수 onInsert를 호출
    setValue(""); // 입력 후 텍스트 필드를 빈 문자열로 초기화해서, 다음 입력을 받을 준비
  };

  return (
    <div>
        {/* form 태그가 제출될 때 실행되는 이벤트 핸들러 */}
        <form onSubmit={handleSubmit}>
            <input
            placeholder="일정을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
            {/* 
            input 요소의 이벤트 속성
            사용자가 입력창에 무언가를 입력할 때마다 실행되는 이벤트.
            즉, input에 타이핑하면 바로 작동해!

            화살표 함수인데, 이벤트 객체 e를 받아서 setValue()를 호출하는 거야.
            e는 이벤트 객체 (이벤트에 대한 모든 정보를 담고 있음)
            e.target은 그 이벤트가 발생한 요소, 즉 <input>
            e.target.value는 그 <input>에 지금 입력된 값 (ex. 사용자가 타이핑한 내용)

            */}
            <button type="submit"><MdAdd /></button>
        </form>
        
    </div>
  )
}

/*
사용자가 입력 후 제출하면
→ handleSubmit() 함수가 실행돼
→ 그 안에서 onInsert(value)가 실행돼
→ 결국 부모의 handleInsert(value)가 실행돼서 할 일이 추가되는 거야

🤔 "왜 꼭 이 타이밍에 실행되어야 하지?"
→ 사용자의 의도가 바로 이거야:

“내가 일정 하나 입력했고, 지금 제출했으니까 → 추가해줘!”

React는 이런 UI 상태 변화를 이벤트 타이밍에 맞춰 처리하는 구조야.

부모가 그걸 담당하니까 자식이 부모 함수 호출하는 거지.

*/
