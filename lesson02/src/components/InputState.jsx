// Day2_03 : useState 연습. input 요소의 value, onChange 이벤트

import { useState } from "react"

export default function InputState() {
    const [username, setUsername] = useState('홍길동')
    const [nickname, setNickname] = useState('GDhong')

    function handleOk() {
        alert(`${username} : ${nickname}`)
        setUsername('')
        setNickname('')
    }
    
    // e 변수는 : 발생한 이벤트 정보 입력값을 저장하는 변수
    function handleKeydown(e){
        console.log(e)
        if(e.key === 'Enter') handleOk()
    }

    return (
    <div>
        <h3>input 에 state(상태) 변수 활용</h3>
        <p>input value 에 상태변수를 적용하면 onChange 이벤트 꼭 필요합니다.</p>
        <hr />
        <input type="text" placeholder="사용자 이름 입력하세요."
               value={username}
               onKeyDown={handleKeydown}
               onChange={(e) => setUsername(e.target.value)} //         
        />
        {/* e.target 은 이벤트를 일으킨 요소 */}
        <input type="text" placeholder="사용자 닉네임 입력하세요."
        value={nickname}
        onKeyDown={handleKeydown}
        onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleOk}>입력완료</button>
        <div>
            이름 : {username}, 닉네임 : {nickname}
        </div>
    </div>
)}