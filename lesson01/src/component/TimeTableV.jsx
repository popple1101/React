// Day2_01 : 객체 데이터 props 연습
// {schedules} 는 {schedules:schedules} 생략된 형태의 객체
// 그리고 schedules 가 참조하는 데이터도 객체 
import '../css/TimeTable.css'

export default function TimeTableV({schedules}) {
    return (
        <div>
            <h3>2025.07.01(day2) 시간표</h3>
            <table>
                <thead>
                    <tr>
                        <td className='theading'>TIME</td>
                        <td className='theading'>TODO</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    // item 에 저장된 데이터 예시 {time: '09:00',todo: '수업'}
                    schedules.map((item, idx) => (
                        <tr key={idx}>
                            <td className='tdata'>{item.time}</td>
                            <td className='tdata'>{item.todo}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

