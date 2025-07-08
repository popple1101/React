// 1. useState, useRef 훅 import
import { useRef } from "react";
import { useState } from "react";
import TodoTemplate from "../../lesson03/src/components/TodoTemplate";

function App() {



  // 2. 할 일 초기값 정의 (initVal)
  const initVal = [
    {
      id: 1,
      text: "리액트 수업 복습",
      checked: true,
    },
    {
      id: 2,
      text: "리액트 프로젝트 기획",
      checked: false,
    },
    {
      id: 3,
      text: "데이터베이스 테스트",
      checked: true,
    },
  ];

  // 3. 상태변수 todos 정의
  const [todos, setTodos] = useState(initVal) // 할 일 목록 초기화
  // todos = [ { id: 1, ... }, { id: 2, ... }, { id: 3, ... } ] 배열에는 id 속성이 없음
  const maxId = useRef(todos.length + 1)

  // 4. insert/remove/checked 관련 함수 정의

  /*
  사용자가 입력한 텍스트를 기반으로
  새로운 할 일 객체를 만들고
  기존 todos 배열에 추가해서 상태 업데이트하기
  */
  function handleInsert(text) {

    // 하나의 할 일 객체(todo)
    const todo = {
      id: maxId.current, // 항상 다음 id가 들어감
      text: text,
      checked: false
    }
    /*
    React에서는 불변성을 유지해야 해.
    → 기존 배열을 직접 수정하지 않고,
    → 새 배열을 만들어서 상태를 업데이트해야 해.
    */
    maxId.current += 1 
    setTodos([...todos, todo]) // 직접 변경은 React가 인식 못함. 새로운 배열로 교체 -> React가 감지하고 렌더링함
  }

  function handleRemove() {

  }
  function handleChecked() {

  }

  // 5. 렌더링 횟수 useRef로 추적
  const renderCount = useRef(0) // useRef는 객체 반환
  renderCount.current += 1 // 컴포넌트가 몇 번 렌더링되었는지 추적





  // 6. TodoTemplate 안에 TodoInsert, TodoList children으로 전달
  return ( // 화면에 렌더링
    <div>
      <TodoTemplate>
        {/* 이건 전체 '레이아웃'을 구성하는 틀 */}
        <TodoInsert onInsert={handleInsert} />
        {/* "TodoInsert야, 너 안에서 필요하면 이 handleInsert 함수 써도 돼!" 
            사용자가 할 일을 입력할 수 있는 입력창 컴포넌트
            입력 후 submit 하면 handleInsert() 함수 호출
            이 함수는 App 에서 정의 -> todos 상태에 할 일을 추가함
            onInsert는 props 이름

            handleInsert는 부모가 가진 실제 함수 이름
            부모가 handleInsert 함수를 onInsert라는 이름으로 자식에게 줬고
            자식은 onInsert를 통해 부모 함수인 handleInsert를 호출할 수 있어


        */}
        <TodoList todos={todos} onRemove={handleRemove} onChecked={handleChecked} />
        {/* 할 일 목록을 화면에 리스트로 보여주는 컴포넌트
            나중에 todos, onRemove, onChecked 같은 props를 넘겨야 동작함
        */}
      </TodoTemplate>
    </div>
  )
}

export default App
