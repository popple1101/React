console.log('Day3-자바스크립트 문법 테스트')
// 1. map 메소드 
const numbers1 = [45,4,9,16,25]
// map 메소드는 새로운 배열을 만듭니다.
//   ㄴ numbers1 배열을 조작(각 요소값으로 연산-콜백함수 리턴) 한 결과
const numbers2 = numbers1.map(myFunction)

// value 는 numbers1 배열의 각각 요소값. 예시) 요소의 값만 사용할 때 인자는 1개
function myFunction(value) {
    return value*2
}

// 콜백 함수를 화살표 함수로 바꾸기. 예시) 요소의 값과 인덱스를 콜백함수로 입력(인자)
const numbers3 = numbers1.map((value, idx) => (value*2 + idx))

console.log('numbers2', numbers2.toString())
console.log('numbers3', numbers3.toString())

// 2. filter 메소드
const over15 = numbers1.filter(myFunction2) // 15초과 필터링
const under15 = numbers1.filter((value) => (value <= 15)) // 15이하 필터링

// filter 메소드 : return 의 식이 참, 거짓 결과값
function myFunction2(value){
    return value > 15
    // 참이 되는 값만 가져가서 새로운 배열 만들기
}
console.log('filter-over15', over15)
console.log('filter-under15', under15)

// 3. reduce 메소드 : 배열의 각 요소값을 순서대로 실행한 수식 결과로 한개의 값
let sum = numbers1.reduce(myFunction3)

// 첫번째 인자 : 각 요소의 연산 결과를 저장하는 변수가 필요. 초기값은 0, ''
function myFunction3(total, value){
    return total + value
    // 0 + 45 = 45 , 45 + 4 = 49 , 49 + 9 = 58 , 58 + 16 = 74 , 74 + 25 = 99
}
console.log('reduce sum', sum)

let mul = numbers1.reduce((total, value) => (total*value))
console.log('reduce mul', mul)
