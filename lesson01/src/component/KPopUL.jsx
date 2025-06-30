
// Day1_04 : 데이터를 전달 받아 컴포넌트에서 사용하기
// 


export default function KPopUL({ members }) { // {members} 는 객체
    return(
        <div>
            <h3>Kpop idols</h3>
            <ul>
                {members.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
                {/* jsx는 태그안에 js 코드 쓸 때 꼭 중괄호 안에 씁니다. */}
            </ul>
        </div>
    );
}
/*
    위의 코드에서 KPopUL({ members }) 와 같이 함수에 입력값(인자) 있습니다. 부모 컴포넌트가 주는 값입니다.
                            ㄴ {members} 는 {members:members} {속성이름:값변수} 를 줄여서 씁니다.
    배열값이 ['나나','미미','모모'] 일 때 item='나나', idx=0 / item='미미', idx=1 / item='모모', idx=2
    배열.map(function(item,idx){
        return 실행내용
    })
    : 배열의 요소를 하나씩 가져다가 값을 item, 인덱스번호는 idx 저장함.
    : item, idx 값으로 함수내용을 실행한 return 결과로 새로운 배열이 만들어집니다.
*/