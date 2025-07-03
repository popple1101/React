import { useEffect, useRef, useState } from 'react'

// Day4_02 : useRef , useEffect 테스트
//           useRef 는 input 요소에 사용 또는 단독을 이전값 사용을 위해서 정의
export function FocusInput() {
  // 컴포넌트
  const inputRef = useRef(null)
  // 🔥참조요소의 값이 바뀌어도 재렌더링 안함. nickname 재렌더링할 때 이전 값 유지

  // inputRef 와 비교하기 위해 정의
  const [nickname, setNickname] = useState('') // 🔥 값이 바뀔때, 렌더링 다시함.

  const handleFocus = () => {
    // 이벤트 함수
    inputRef.current.focus() // DOM 요소에 직접 접근(getElementById 동일한 동작)
    // input 요소는 value 를 꼭 써야 합니다.
    inputRef.current.value = '테스트 중입니다.'
  }
  // 🔥 주의 : inputRef 는 DOM 요소가 만들어진 후에 참조.
  //        이 코드 위치는 DOM 요소가 만들어지기 전에 실행되고 오류 발생
  console.log('이름: ', inputRef.current && inputRef.current.value) //useRef 는 current 속성으로 요소에 접근

  return (
    <>
      {/* DOM 요소에 직접 접근하기 위해 ref 속성 설정. 변수이름은 useRef() 로 선언 */}
      <input ref={inputRef} type='text' placeholder='이름을 입력하세요.' />
      <button onClick={handleFocus}>포커스 이동</button>
      <hr />
      <input
        value={nickname}
        placeholder='닉네임을 입력하세요.'
        onChange={(e) => setNickname(e.target.value)}
        // 값이 변경될 때 발생하는 이벤트
      />
      <div>닉네임 : {nickname}</div>
    </>
  )
}

export function EffectAndRef() {
  // 컴포넌트
  const inputRef = useRef(null)
  const [nickname, setNickname] = useState('') // 🔥 값이 바뀔때, 렌더링 다시함.

  const handleFocus = () => {
    inputRef.current.focus()
    inputRef.current.value = '테스트 중입니다.'
  }

  // useEffect(콜백함수, 의존성 배열) :
  //   의존성 배열 [상태변수, ]  : 배열에 포함된 상태 값이 바뀔 때마다 콜백함수 실행
  //   빈 배열  [] : 처음 한번 Component 가 마운트 될 때만 실행
  //   2번째 인자  없음 : 재 렌더링 될 때 , 항상 실행
  useEffect(() => {
    console.log('이름: ', inputRef.current.value) //useRef 는 current 속성으로 요소에 접근
  })

  return (
    <>
      <input ref={inputRef} type='text' placeholder='이름을 입력하세요.' />
      <button onClick={handleFocus}>포커스 이동</button>
      <hr />
      <input
        value={nickname}
        placeholder='닉네임을 입력하세요.'
        onChange={(e) => setNickname(e.target.value)}
      />
      <div>닉네임 : {nickname}</div>
    </>
  )
}

export function PreviousValue() {
  const [count, setCount] = useState(0)
  //input과 연결하지 않고 사용하는 예시 (value 속성 안씀)
  const prevCount = useRef(0)

  useEffect(() => {
    //useRef로 만든 변수는 객체, current 속성으로 값 설정
    // 
    prevCount.current = count
  }, [count]) // count 가 바뀔때마다 콜백함수 실행. [] 로 바꾸면 마운트할 때 한번 실행

  return (
    <div>
      <p>현재 값: {count}</p>
      <p>이전 값: {prevCount.current}</p>
      <button onClick={() => setCount((count) => count + 1)}>+1</button>
    </div>
  )
}