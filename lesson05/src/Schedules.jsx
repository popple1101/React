import { useState } from 'react'
import schedules from './schedules.json'
// schedules.json 문자열이 JS 객체로 import 됩니다. 변수명은 임의로 지정

export default function Schedules() {
  // schedule 는 상태 변수. 버튼을 클릭할 때마다 schedule 이 저장하는
  // 객체가 바뀝니다.
  const [schedule, setSchedule] = useState(schedules[0])

  const handleSelected = (idx) => {
    setSchedule(schedules[idx])
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
            onClick={() => handleSelected(idx)}
            disabled={schedule.date === sch.date}
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              backgroundColor: schedule.date === sch.date ? '#ccc' : '#007bff',
              color: schedule.date === sch.date ? '#666' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: schedule.date === sch.date ? 'not-allowed' : 'pointer'
            }}
          >
            {sch.date}
          </button>
        ))}
      </div>
      <hr />
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>{schedule.date}</h3>
      <table border='1' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {schedule.todos.map((t, idx) => (
              <th
              // key는 중복되지 않는 유일한 값으로 합니다.(요소의 변수처럼 취급)
                key={`time-${idx}`}
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  textAlign: 'center'
                }}
              >
                {t.time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {schedule.todos.map((t, idx) => (
              <td
                key={`todo-${idx}`}
                style={{ padding: '10px', textAlign: 'center' }}
              >
                {t.text}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}