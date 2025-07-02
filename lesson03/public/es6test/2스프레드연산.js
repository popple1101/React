// 객체, 배열에서 사용하는 연산
// 기호는 ... 로 표시

// 배열 
const kor = [90,89,77]
const eng = [77,88,100]
// 배열의 스프레드 연산 : 두개의 배열을 합쳐서 새로운 배열 만들 때
const scores = [...kor,...eng]
console.log('배열 합치기 scores:', scores)

// 객체에 스프레드연산 : 기존 객체 복사하여 새로운 객체를 생성할 때 사용
//                      새로운 속성값 추가 또는 기존 속성값 수정
const people = {name: '트와이스', age:28}
console.log('people:', people)

// ...people 연산은 people 객체의 속성들을 모두 가져오기
const people2 = {...people , address:'서울'}
console.log('새로운 객체 people2 속성 추가:', people2)
//
const people3 = {...people, name :'트와이스2'} 
console.log('새로운 객체 people3 속성 수정:', people3)

// people 에 새로운 속성 추가하기
people.email = 'popple1101@naver.com'
// people 에 기존 속성 값 변경하기
people['name'] = '올데이프로젝트' // people.name = '올데이프로젝트' 와 같음.
console.log('기존 객체 people:', people)
