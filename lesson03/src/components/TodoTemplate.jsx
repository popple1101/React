import '../assets/css/TodoTemplate.scss'

// children 은 리액트에서 자식 컴포넌트를 전달할 때 사용하는
//             미리 정해진 pros 입니다. 받을 때만 사용하면 됩니다.
// App.jsx에서 이 예제는 TodoInsert, TodoList 컴포넌트가 자식 컴포넌트 입니다.
export default function TodoTemplate({children}) { // 객체
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정관리</div>
            <div className="content">{children}</div> {/*변수*/}      
        </div>
    )
}
