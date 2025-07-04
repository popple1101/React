
// 문제 : 
// 새로운 컴포넌트 ScheduleTableEx.jsx 파일에
// schedules 데이터를 아래와 같이 바꾸어서 UI 를 만들어 보세요.
// 단, todos 항목의 checked 속성값은 UI 에서 제외합니다.

const schedules = [
    {
    date: "2025-07-01",
    todos: [
      {
        time: "09:00",
        text: "리액트 수업 복습",
        checked: true
      },
      {
        time: "11:00",
        text: "리액트 프로젝트 기획",
        checked: true
      },
      {
        time: "16:20",
        text: "데이터베이스 테스트",
        checked: false
      }
    ]
  },
  {
    date: "2025-07-06",
    todos: [
      {
        time: "09:40",
        text: "자바 클래스 ",
        checked: false
      },
      {
        time: "12:00",
        text: "운동",
        checked: false
      },
      {
        time: "13:50",
        text: "데이터베이스 구축",
        checked: false
      }
    ]
  },
  {
    date: "2025-07-09",
    todos: [
      {
        time: "11:20",
        text: "AI 프로젝트",
        checked: false
      },
      {
        time: "14:00",
        text: "팀프로젝트 회의",
        checked: false
      }
    ]
  }
]

console.log(schedules[0]) // object
// {
//     date: "2025-07-01",
//     todos: [
//       {
//         time: "09:00",
//         text: "리액트 수업 복습",
//         checked: true
//       },
//       {
//         time: "11:00",
//         text: "리액트 프로젝트 기획",
//         checked: true
//       },
//       {
//         time: "16:20",
//         text: "데이터베이스 테스트",
//         checked: false
//       }
//     ]
//   }

console.log(typeof schedules[0].date) // 2025-07-01 (string)
console.log(typeof schedules.todos) // 배열
// {
//         time: "09:00",
//         text: "리액트 수업 복습",
//         checked: true
//       },
//       {
//         time: "11:00",
//         text: "리액트 프로젝트 기획",
//         checked: true
//       },
//       {
//         time: "16:20",
//         text: "데이터베이스 테스트",
//         checked: false
//       }
console.log(schedules[0].todos[0]) // {time: '09:00', text: '리액트 수업 복습', checked: true}
// 결론 : map 메소드를 실행하는 배열은 schedules , schedules[i].todos
console.log(typeof schedules[0].todos[0]) // object. 속성은 time, text, checked
console.log(schedules[0].todos[0].time) // 
console.log(schedules[0].todos[0].text) // 
console.log(schedules[0].todos[0].checked) // 

schedules.map((item) => {
    console.log('-----------------')
    console.log(item.date)
    console.log(item.todos) // 배열
    item.todos.map((t) => {
        console.log('\t\t~~~~~~~~~~')
        // console.log(typeof t) // object
        console.log(t.time)
        console.log(t.text)
        console.log(t.checked)
    })
})