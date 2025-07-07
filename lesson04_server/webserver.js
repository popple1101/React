import express, { json } from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

// Day4_03 🔥nodejs 백엔드(WAS) <-> 몽고DB 서버 
//                 ㄴ  프론트엔드(react) 구현 : lesson04 프로젝트 App.jsx 
// 웹프레임워크(서버) 실행을 위한 객체 생성
const app = express()  // get,post,put,patch, delete 요청을 처리하는 메소드를 제공.
const PORT = 5000     // 클라이언트 -> nodejs 백엔드 서버 연결 포트

app.use(cors())   // 프론트엔드 백엔드접속에 필요
app.use(json())   // 클라이언트가 보낸 데이터를 수신

// db서버의 주소
const MONGODB_URI = 'mongodb://localhost:27017/'
const DB_NAME = 'react01'
const COLLECTION_NAME = 'lesson04'

// db연결 : nodejs 서버(백엔드) -> db
// 백엔드 처리 공통 사항
//          req.body 는 백엔드가 요청으로 받은 데이터
//          res.json({데이터})  는 백엔드가 클라이언트에게 보내는 응답데이터
//          res.status(응답상태코드) 처리결과 값
let db
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log('MongoDB 연결 성공!!!')
    // console.log('db:', db)   // 서버 설정 정보 출력
  })
  .catch((error) => console.error('MongoDB 연결 실패:', error))

// API 라우팅 메소드 작성하기
app.get("/api/todos", async (req, res) => {
  // 처리할 url : /api/todos    // 콜백함수 인자 req는 요청, res는 응답 정보 저장 객체
  try {
    // find({조건}) 조건은 '속성이름:값' 형식. {}는 모든 것
    const todos = await db.collection(COLLECTION_NAME).find({})
      .toArray()
    res.json(todos)   //db에서 조회한 todos 배열을 json 형식 응답으로 보내기                              
  } catch (error) {
    // 오류 발생시 : 서버오류 응답 코드 보내기
    res.status(500).json({ error: "서버오류-데이터 조회 실패" })
  }
})

// 새로운 todo 추가 (백엔드가 db에 저장)
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body        // req.body 는 요청 받은 데이터.

    const maxTodo = await db.collection(COLLECTION_NAME)
      .findOne({}, { sort: { id: -1 } })
    const newId = maxTodo ? maxTodo.id + 1 : 1

    const newTodo = {
      id: newId,
      text: text,
      checked: false,
      createdAt: new Date()
    }
    // db에 새로운 newTodo 추가
    const result = await db.collection(COLLECTION_NAME).insertOne(newTodo)
    console.log(result)
    // http://localhost:5000/api/todos 요청에 대한 응답
    res.status(201).json({ ...newTodo, _id: result.insertedId })
    //                            ㄴ 저장 처리 결과에 대한 응답데이터
  } catch (error) {
    res.status(500).json({ error: "서버오류-데이터 저장 실패" })
  }
})

// todo 의 checked 속성값 수정.(id 값 지정.)
/*
        curl -X PUT http://localhost:5000/api/todos/3 ^
          -H "Content-Type: application/json" ^
          -d "{\"checked\": false}"
*/
app.put('/api/todos/:id', async (req, res) => {
  // :id 는 파라미터 이름. url 로 변수값을 전달하는 방법
  try {
    const todoId = Number(req.params.id)  //    /api/todos/3
    const { checked } = req.body     // -d "{\"checked\": false}"

    const result = await db.collection(COLLECTION_NAME)
      .updateOne(
        { id: todoId },
        {
          $set: {
            checked: checked
          }
        }
      )
    console.log(result)

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "지정된 id 를 찾을 수 없습니다.!!" })
    }

    res.json({ message: "checked 업데이트 완료!!" })


  } catch (error) {
    res.status(500).json({ error: "서버오류-데이터 checked 수정 실패!!" })
  }
})

// 지정한 id의 todo 삭제
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todoId = Number(req.params.id)
    const result = await db.collection(COLLECTION_NAME)
      .deleteOne({ id: todoId })

    console.log(result)
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "지정된 id 를 찾을 수 없습니다.!!" })
    }

    res.json({ message: "삭제 성공!!" })
  } catch (error) {
    res.status(500).json({ error: "서버오류-데이터 삭제 실패!!" })
  }
})


// 백엔드 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT} 에서 실행 중 입니다.`)
})