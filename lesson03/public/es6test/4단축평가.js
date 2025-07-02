let x = 20
// 첫번째 조건식이 '참'일 때 && 연산 뒤의 명령문이 실행
let result = (x>10) && console.log('AND 단축평가 확인(1)!')

x = 10
result = (x>10) && console.log('AND 단축평가 확인(2)!')

// 첫번째 조건식이 '거짓'일 때 || 연산 뒤의 명령문이 실행
x = 20
result = (x>10) || console.log('OR 단축평가 확인(1)!')

x = 10
result = (x>10) || console.log('OR 단축평가 확인(2)!')
