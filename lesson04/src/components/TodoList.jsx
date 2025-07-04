import '../assets/css/TodoList.scss'
import TodoListItem from './TodoListItem'

// 부모 컴포넌트에게서 전달 받는 props : todos, onRemove, onChecked
export default function TodoList({ todos, onRemove, onChecked }) {
    return (
        <div className='TodoList'>
            {todos.map((item, idx) => (
                <TodoListItem
                    key={idx}
                    todo={item}
                    // todos 배열 요소 item을 자식요소에게 전달(속성이름 todo)
                    onRemove={onRemove}
                    onChecked={onChecked}
                />
            ))}
        </div>
    )
}
