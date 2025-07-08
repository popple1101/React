// 1. todo 객체 분해: id, text, checked
// 2. 체크박스 클릭 → onChecked 호출
// 3. 삭제 버튼 클릭 → window.confirm → onRemove 호출
// 4. 체크 상태에 따라 스타일 다르게 적용

import React from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md'
import '../assets/css/TodoListItem.scss'

export default function TodoListItem({ todo, onRemove, onChecked }) {

    const {id, text, checked} = todo
    // id, text, checked라는 변수에 todo의 값들이 들어감
    // 분해할당 todo 객체에서 꺼내기

    const handleButton = (id, text) => {
        const yn = window.confirm(`일정 ${id}:${text}를 삭제하십니까?`)
        if (yn) onRemove(id)
    }


  return (
    <div className="TodoListItem">
                <div
                    className={`checkbox ${checked ? "checked" : ""}`}
                    onClick={() => onChecked(id)}>
                        {/*
                        사용자가 이 영역(체크박스 부분)을 클릭하면,
                        id를 들고 onChecked(id) 호출됨
                        이건 부모(App)로부터 받은 함수
                        해당 id의 할 일의 checked 값을 true ↔ false로 토글
                        */}
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div
                    className="remove"
                    onClick={() => handleButton(id, text)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
  )
}
