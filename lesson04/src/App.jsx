import { useRef, useState } from "react";
import TodoList from "./components/TodoList";
import TodoInsert from "./components/TodoInsert";
import TodoTemplate from "./components/TodoTemplate";
import { useEffect } from "react";
// npm i sass react-icons

export default function App() {

  // 백엔드 서버에 접속해서 데이터 가져오기
  const API_BASE_URL = "http://localhost:5000/api/todos"
  const [todos, setTodos] = useState([])
  const [loading, setLoding] = useState(false) // fetch 실행 중이면 true

  // 리액트 웹서버 <-> nodejs 백엔드(WAS.웹애플리케이션서버)
  /*
  curl -X GET http://localhost:5000/api/todos
  */
  const fetchTodos = async () => {
    try {
      setLoding(true) // fetch 시작~~~
      const response = await fetch(API_BASE_URL) // GET 요청, 두번째 인자(입력) 없음
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
        console.log(data)
      } else {
        console.error('데이터 가져오기 실패')

      }
    } catch (error) {
      console.error("네트워크 오류:", error)
    } finally {
      // try{} 구문 끝나면 실행
      setLoding(false)
    }
  }
  useEffect(() => {
    fetchTodos()
  }, []) // 렌더링 후에 한번만 실행. useEffect는 side 처리할 때

  /*
  curl -X PUT http://localhost:5000/api/todos/33 ^
    -H "Content-Type: application/json" ^
    -d "{\"checked\": false}"
  */

  async function handleChecked(id) {
    try {
      // 기존 todos 에서 id 값에 해당하는 하나의 객체를 가져오기
      // find 는 콜백함수 조건이 참인 1개만 리턴
      const idTodo = todos.find((item) => item.id === id)
      const newChecked = !idTodo.checked

      setLoding(true) // fetch 시작
      const options = {
        method: 'PUT',
        // 서버로 전송하는 데이터의 유형이 json
        headers: { 'Content-Type': 'application/json' },
        // JS 객체를 json 문자열로 변환하여 전송
        body: JSON.stringify({ checked: newChecked })
      }
      // 백엔드 서버를 통해 db값 변경
      const response = await fetch(`${API_BASE_URL}/${id}`, options) // GET 요청, 두번째 인자(입력) 없음

      if (response.ok) {
        // 현재 상태값 변경 -> 화면
        const newtodos = todos.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
        setTodos(newtodos)
      } else {
        console.error('데이터 todo checked 수정 실패!!!')
      }
    } catch (error) {
      console.error("네트워크 오류:", error)
    } finally {
      setLoding(false)
    }
  }

  /*
  curl -X DELETE http://localhost:5000/api/todos/3
  */

  async function handleRemove(id) {
    const newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    try {
      setLoding(true)
      // options 두 번째 인자는 객체 직접 사용 가능합니다.
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' }) // GET 요청, 두번째 인자(입력) 없음
      if (response.ok) {
        // 재렌더링을 위해 상태값 todos 변경
        const newtodos = todos.filter((item) => item.id !== id)
        setTodos(newtodos)
      } else {
        console.error('데이터 todo 삭제 실패!!!')
      }
    } catch (error) {
      console.error("네트워크 오류:", error)
    } finally {
      // try{} 구문 끝나면 실행
      setLoding(false)
    }
  }

  /*
  curl -X POST http://localhost:5000/api/todos ^
     -H "Content-Type: application/json" ^
     -d "{\"text\":\"과제하기\"}
  */

  const handleInsert = async (text) => {
    if (!text.trim()) { // text.trim() === '' 문자열이 비어있는건 거짓
      window.alert('할일 todo 입력 필수입니다.!')
      return
    }

    try {
      setLoding(true)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ text: text })
      }
      // "{\"text\":\"과제하기\"} => json 문자열 (데이터를 송수신할 때 문자열로 합니다.)
      // JSON.stringfy : JS객체 {text: "과제하기"} 를 json 문자열로 변환
      const response = await fetch(API_BASE_URL, options)

      if (response.ok) {
        const newTodo = await response.json()
        setTodos([...todos, newTodo])
      } else {
        console.log("데이터 todo 추가 실패!!!")
      }
    } catch (error) {
      console.error("네트워크 오류:", error)
    } finally {
      setLoding(false)
    }
  }

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={handleInsert} />
        <TodoList
          todos={todos}
          onRemove={handleRemove}
          onChecked={handleChecked}
        />
      </TodoTemplate>
    </div>
  )
}

/**
 * 1. 모든 데이터  가져오기
 * const response = await fetch(API_BASE_URL) // fetch한 결과(모든 데이터)를 가져옴
 * 
 * => 😠 todos 상태값을 db에서 조회한 모든 값으로 저장
 * 
 * 2. id로 지정한 번호의 데이터를 checked 수정 (몽고 db 값 변경)
 * const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked: newChecked })
      }
      const response = await fetch(`${API_BASE_URL}/${id}`, options)

    => 😠 db 를 변경하고 화면도 바꿔줘야 한다. => todos 의 상태값 변경
        const newtodos = todos.map((item) =>
              item.id === id ? { ...item, checked: !item.checked } : item
            )
            setTodos(newtodos)

   3. id로 지정한 번호의 데이터를 삭제
   const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' })

   // 😠 재렌더링을 위해 상태값 todos 변경
       fetchTodos() : 방법1) 다시 전체를 가져오기 위한 fetch 요청 함수 실행
       todos.filter((t) => t.id !== id) : 방법2) filter 메소드로 걸러내기
   
   4. 새로운 데이터 추가(id값을 만들어 주는 것 필요함.)

      const options = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ text: text })
      }

      // "{\"text\":\"과제하기\"} => json 문자열 (데이터를 송수신할 때 문자열로 합니다.)
      // JSON.stringfy : JS객체 {text: "과제하기"} 를 json 문자열로 변환
      const response = await fetch(API_BASE_URL, options)

      // 😠 todos 상태값을 변경할 때, 요청의 응답값을 추가. nodejs 에서 추가한 데이터를 보내줌
      const newTodo = await response.json()
        setTodos([...todos, newTodo]) // 새로운 배열을 만들 때, 원래 todos 복사하여 newTodo 추가
                                      // setTodos(todos.concat(newTodo))

    공통적으로 바뀌는 state 상태값을 찾아보세요. => todos 배열 😠 표시로 설명

 */