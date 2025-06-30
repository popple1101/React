// Day1_02 : 컴포넌트 맛보기
// - 컴포넌트는 JSX 문법 사용하고 파일 확장자 jsx 추천
// - 일반 자바스크립트 파일은 js 사용
// - 지금 새로 정의한 컴포넌트를 사용할 때, App 컴포넌트에서 사용합니다.
// - 지금은 App.jsx 대신에 App2.jsx
function TwiceUL() {
    return (
        <ul>
            <li>나연</li>
            <li>모모</li>
            <li>다현</li>
            <li>지효</li>
        </ul>
    )
}

export function BtsUL() {
    return(
        <ul>
            <li>슈가</li>
            <li>제이홉</li>
            <li>뷔</li>
            <li>지민</li>
        </ul>
    )
}
export default TwiceUL;
// default 컴포넌트는 1개만 지정합니다.