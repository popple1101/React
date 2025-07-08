// 할 일 목록 렌더링 및 기능 전달

// 1. todos 배열을 props로 받아옴
// 2. map으로 todos 순회
// 3. 각 항목을 TodoListItem 컴포넌트로 렌더링
// 4. 각 항목에 onRemove, onChecked 함수 props로 전달

import React from "react";
import "../assets/css/TodoList.scss";
import TodoListItem from "./TodoListItem";

export default function TodoList({ todos, onRemove, onChecked }) {
  return (
    <div className="TodoList">
      {todos.map((item, idx) => ( // item : 현재 순회 중인 요소(할 일 객체 하나) idx : 현재 인덱스
        <TodoListItem
        key={idx}
        todo={item} // todos 배열안의 각 객체
        onRemove={onRemove}
        onChecked={onChecked} />
      ))}
      {/*
      각 항목마다 TodoListItem 컴포넌트를 하나씩 만들어서 화면에 출력합니다.
        */}
    </div>
  );
}
