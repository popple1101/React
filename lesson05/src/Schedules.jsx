import { useEffect, useState } from 'react'
import TodosList from './TodoList'
// schedules.json  문자열이 JS 객체로 import 됩니다. 변수명은 임의로 지정

export default function Schedules() {
  // 모든 데이터 저장
  const [schedules, setSchedules] = useState(null)
  // 선택된 날짜의 데이터
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [loading, setLoading] = useState(false)
  // input 요소에 필요한 state 선언
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('13:00') // 편의상 초기값 설정
  const [text, setText] = useState('')

  const API_BASE_URL = 'http://localhost:5001/api/schedules'

  // 전체 가져오는 fetch 함수
  const loadData = async () => {
    try {
      setLoading(true)
      const resp = await fetch(`${API_BASE_URL}`)
      console.log(resp)
      if (resp.ok) {
        const data = await resp.json()
        setSchedules(data)
        setSelectedSchedule(data[0]) //선택된 날짜는 첫번째 데이터로 상태값 설정
        setNewDate(data[0].date)
      }
    } catch (error) {
      console.log('error:', error)
    } finally {
      setLoading(false)
    }
  }

  //선택한 날짜 - 날짜 버튼 클릭.
  const selectedData = async (selectedDate) => {
    try {
      setLoading(true)
      const resp = await fetch(`${API_BASE_URL}/${selectedDate}`)
      if (resp.ok) {
        const data = await resp.json()
        setSelectedSchedule(data) // 비동기함수
        setNewDate(selectedDate) // 비동기함수
      }
    } catch (error) {
      console.log('error:', error)
    } finally {
      setLoading(false)
    }
  }

  // 부가기능 실행 훅 : 렌더링 후에 실행. fetch 비동기통신 실행할 때 필요
  useEffect(() => {
    loadData()
  }, [])
  // [] 는 의존값이 없음. 처음에 한번만 실행

  const handleSelected = (selectedDate) => {
    selectedData(selectedDate)
    // setSelectedSchedule() 는 선택된 날짜의 객체를 지정. 위 함수안에서 실행
  }

  const updateCheckedData = async (time, checked) => {
    console.log('*', time, checked)
    try {
      setLoading(true)
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedSchedule.date,
          time: time,
          checked: !checked
        })
      }
      const resp = await fetch(API_BASE_URL, options)
      if (resp.ok) {
        const data = await resp.json()
        console.log(data.message)
        handleChecked(time)
      }
    } catch (error) {
      console.log('updateCheckedData error:', error``)
    } finally {
      setLoading(false)
    }
  }

  // check 변경 후에 상태값 변수 schedules, selectedSchedule 변경
  //                    (db와 동일한 값으로 변경)
  const handleChecked = (time) => {
    const newtodos = selectedSchedule.todos.map((item) =>
      item.time === time ? { ...item, checked: !item.checked } : item
    )
    // 삭제할 때 updatedSchedule 코드 보다
    // 더 좋은 코드입니다. (why? 여러 속성값을 복사하는 경우가 많기 때문에)
    const updatedSchedule = {
      ...selectedSchedule,
      todos: newtodos
    }

    setSelectedSchedule(updatedSchedule)

    // schedules 상태도 업데이트
    setSchedules((prevSchedules) =>
      prevSchedules.map((item) =>
        item.date === selectedSchedule.date ? updatedSchedule : item
      )
    )
  }

  const deleteTimeData = async (time) => {
    try {
      setLoading(true)
      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedSchedule.date,
          time: time
        })
      }
      const resp = await fetch(API_BASE_URL, options)
      if (resp.ok) {
        const data = await resp.json()
        console.log(data.message)
        handleRemoved(time)
      }
    } catch (error) {
      console.log('deleteTimeData error:', error``)
    } finally {
      setLoading(false)
    }
  }
  // 특정 날짜, 시간 todos 항목 삭제 후 상태값 변수 schedules, selectedSchedule 변경
  // 변경된 것을 반영하여 객체, 배열 모두 새롭게 생성되어야 합니다.
  const handleRemoved = (time) => {
    const removedTodos = selectedSchedule.todos.filter(
      (item) => item.time !== time
    )

    const updatedSchedule = {
      date: selectedSchedule.date,
      todos: removedTodos
    }
    setSelectedSchedule(updatedSchedule)

    // schedules 상태도 업데이트
    setSchedules((prevSchedules) =>
      prevSchedules.map((item) =>
        item.date === selectedSchedule.date ? updatedSchedule : item
      )
    )
  }

  // 상태값으로 선언된 입력값들을 가져와서 put 요청을 보냅니다.
  const addTimeData = async () => {
    try {
      setLoading(true)
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: newTime,
          text: text,
          checked: false
        })
      }
      const resp = await fetch(`${API_BASE_URL}/${newDate}`, options)
      if (resp.ok) {
        const data = await resp.json()
        console.log(data.message)
        handleAdd()  // 상태값 바꾸기 대신에 다시 해당 날짜로 fetch
      }
    } catch (error) {
      console.log('updateCheckedData error:', error``)
    } finally {
      setLoading(false)
    }
  }
  // 추가된 todo 항목 하나를 상태값 변수 schedules, selectedSchedules 에 반영
  const handelAdd = () => {
          const newTodo = { time: newTime, text: text, checked: false };
        // 기존 날짜가 있는지 확인. 있으면 해당 객체가 existingSchedule 에 저장.
        const existingSchedule = schedules.find(
          (item) => item.date === newDate
        );
        console.log(existingSchedule, "**");
        if (!existingSchedule) {
          // existingSchedule 없으면 새로운 날짜 객체를 생성
          const newSchedule = { date: newDate, todos: [newTodo] };
          // 기존 schedules 에 새로운 날짜 객체 추가하기
          setSchedules((schedules) => schedules.concat(newSchedule));

          // setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
          setSelectedSchedule(newSchedule);
        } else {
          // 기존 날짜인 경우 - 기존 스케줄에 todo 추가 (수정됨)
          const updatedSchedules = schedules.map((item) =>
            item.date === newDate
              ? { ...item, todos: [...item.todos, newTodo] }
              : item
          );
          setSchedules(updatedSchedules);
          console.log(schedules, "**");

          // selectedSchedule도 업데이트
          const updatedSelectedSchedule = {
            ...existingSchedule,
            todos: [...existingSchedule.todos, newTodo],
          };
          console.log(updatedSelectedSchedule, "**");
          setSelectedSchedule(updatedSelectedSchedule);
        }
        setText("");
        setNewTime("13:00");
  }

  if (loading) {
    return <div>.....loading.....</div>
  }

  // 비동기 함수 실행 과정에서 렌더링 후에 비동기 함수 실행하므로
  // 일시적으로 데이터 없는 경우에 대한 처리
  if (!schedules || schedules.length === 0) {
    return <div>스케줄이 없습니다.</div>
  }

  if (!selectedSchedule) {
    return <div>선택된 스케줄이 없습니다.</div>
  }

  return (
    <div
      className='container'
      style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}
    >
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {/* sch 객체는 date,time(배열),todo(배열) */}
        {schedules.map((sch, idx) => (
          <button
            key={idx}
            onClick={() => handleSelected(sch.date)}
            disabled={selectedSchedule.date === sch.date}
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              backgroundColor:
                selectedSchedule.date === sch.date ? '#ccc' : '#007bff',
              color: selectedSchedule.date === sch.date ? '#666' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                selectedSchedule.date === sch.date ? 'not-allowed' : 'pointer'
            }}
          >
            {sch.date}
          </button>
        ))}
      </div>
      <hr />
      <div>
        <input
          type='date'
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type='time'
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <input
          type='text'
          placeholder='내용을 입력하세요.'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTimeData}>저장</button>
      </div>
      <hr />
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>
        {selectedSchedule.date}
      </h3>
      <TodosList
        todos={selectedSchedule.todos}
        onCheckedUpdate={updateCheckedData}
        onRemoved={deleteTimeData}
      />
    </div>
  )
}