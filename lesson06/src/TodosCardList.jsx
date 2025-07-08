import "./todocardList.css";
import { FaTrash } from "react-icons/fa";
export default function TodosCardList({ todos, onCheckedUpdate, onRemoved }) {


  // 삭제 아이콘의 이벤트 핸들러
  const handleRemoved = (todoTime) => {
    todos.length === 1 ? onRemoved(null) : onRemoved(todoTime)
    // 남은 일정이 1개 일 때, 날짜로 삭제합니다.(time을 null로 전달)
  }

  return (
    <div className="container">
      <div className="timeline">
        {todos.map((item, idx) => {
          return (
            <div className="timeline-item" key={idx}>
              <div
                className={`timeline-content ${
                  item.checked ? "completed" : ""
                }`}
              >
                <div className="time">{item.time}</div>
                <div className="task">{item.text}</div>
                <div className="checkbox-container">
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`task${idx}`}
                      checked={item.checked || false}
                      onChange={() => onCheckedUpdate(item.time, item.checked)}
                    />
                    <label
                      htmlFor={`task${idx}`}
                      className={`checkbox-label ${
                        item.checked ? "checked" : ""
                      }`}
                    />
                    <span
                      className={`status-text ${
                        item.checked ? "completed" : ""
                      }`}
                    >
                      {item.checked ? "완료" : "미완료"}
                    </span>
                  </div>
                  <div className="remove" onClick={() => handleRemoved(item.time)}>
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div
                className={`timeline-marker ${item.checked ? "completed" : ""}`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
