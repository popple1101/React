import express, { json } from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

const app = express()
const PORT = 5001

app.use(cors())
app.use(json())

const MONGODB_URI = 'mongodb://localhost:27017/'
const DB_NAME = 'react01'
const COLLECTION_NAME = 'schedules'

let db
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log('MongoDB 연결 성공!!!')
  })
  .catch((error) => console.error('MongoDB 연결 실패:', error))

/*
  curl -X GET http://localhost:5000/api/schedules
  이 요청 schedules 컬렉션의 모든 documents(데이터)를 가져옵니다.
*/
app.get("/api/schedules", async (req, resp) => {
  try {
    const docs = await db.collection(COLLECTION_NAME).find({}).toArray()
    resp.status(200).json(docs)
  } catch (error) {
    resp.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
})

/*
  curl -X GET http://localhost:5000/api/schedules/2025-07-09
  이 요청은 2025-07-09 날짜의 데이터를 가져옵니다.
*/
app.get('/api/schedules/:date', async (req, resp) => {
  try {
    // date 날짜 파라미터 저장하기
    const { date } = req.params

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return resp.status(400).json({
        error: "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식을 사용해주세요.",
      });
    }

    // 해당 날짜값으로 조회하기
    const docs = await db.collection(COLLECTION_NAME).findOne({ date: date })
    resp.status(200).json(docs)
  } catch (error) {
    resp.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
})

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT} 에서 실행 중 입니다.`);
})

/*
curl -X PUT http://localhost:5000/api/schedules/2025-07-09 ^
  -H "Content-Type: application/json" ^
  -d "{  \"time\": \"15:00\", \"text\": \"운동\", \"checked\": false }"
이 요청은 2025-07-09 날짜의 todos 배열에 새 '운동' 항목을 추가(기존배열 수정)합니다.

curl -X PUT http://localhost:5000/api/schedules/2025-07-11 ^
  -H "Content-Type: application/json" ^
  -d "{  \"time\": \"08:00\", \"text\": \"운동\", \"checked\": false }"
이 요청은 2025-07-11 날짜의 데이터가 없습니다. 새롭게 날짜 요소를 추가합니다.
*/
app.put("/api/schedules/:date", async (req, res) => {
  try {
    const { date } = req.params; // URL에서 날짜 추출
    const newTodo = req.body; // 요청 본문에서 새 todo 항목 추출

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        error: "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식을 사용해주세요.",
      });
    }

    // 새 todo 항목 검증
    if (
      !newTodo.time ||
      !newTodo.text ||
      typeof newTodo.checked !== "boolean"
    ) {
      return res.status(400).json({
        error: "time, text, checked 필드가 모두 필요합니다.",
      });
    }

    const collection = db.collection(COLLECTION_NAME);

    // 해당 날짜의 문서가 존재하는지 확인
    const existingDoc = await collection.findOne({ date: date });

    if (existingDoc) {
      // 문서가 존재하면 todos 배열에 새 항목 추가
      const result = await collection.updateOne(
        { date: date },    // update 할 날짜 조건
        { $push: { todos: newTodo } }    // 해당 날짜에 todos 배열에 newTodo 추가
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "해당 날짜의 문서를 찾을 수 없습니다." });
      }

      res.status(200).json({
        message: "새 todo 항목이 추가되었습니다.",
        modifiedCount: result.modifiedCount,
      });
    } else {
      // 문서가 존재하지 않으면 새 문서 생성
      const newDoc = {
        date: date,
        todos: [newTodo],
      };

      const result = await collection.insertOne(newDoc);

      res.status(201).json({
        message: "새 날짜 문서와 todo 항목이 생성되었습니다.",
        insertedId: result.insertedId,
      });
    }
  } catch (error) {
    console.error("MongoDB 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

/*
curl -X DELETE http://localhost:5001/api/schedules/ ^
  -H "Content-Type: application/json" ^
  -d "{  \"time\": \"15:00\", \"date\": \"2025-07-09\"  }"

이 요청은 2025-07-09 날짜의 todos 배열에 time "15:00" 을 삭제합니다.  


curl -X DELETE http://localhost:5001/api/schedules/ ^
  -H "Content-Type: application/json" ^
  -d "{ \"date\": \"2025-07-11\"  }"
이 요청은 2025-07-11 날짜 요소를 삭제합니다.
*/
app.delete("/api/schedules/", async (req, res) => {
  try {
    const { date, time } = req.body;

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        error: "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식을 사용해주세요.",
      });
    }

    const collection = db.collection(COLLECTION_NAME);

    // 해당 날짜 문서에서 시간대가 일치하는 항목 삭제
    if (time) {   // time 값이 있어요. date 특정 날짜의 time 을 삭제
      // 시간 형식 검증 (예: 13:00)
      const timeRegex = /^\d{2}:\d{2}$/;
      if (!timeRegex.test(time)) {
        return res.status(400).json({
          error: "시간 형식이 올바르지 않습니다. HH:MM 형식을 사용해주세요.",
        });
      }

      const result = await collection.updateOne(
        { date: date },
        { $pull: { todos: { time: time } } }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "해당 날짜의 문서를 찾을 수 없습니다." });
      }

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ error: "해당 시간의 todo 항목을 찾을 수 없습니다." });
      }

      res.status(200).json({
        message: `${date}의 ${time} 항목이 삭제되었습니다.`,
      });
    } else {   // 시간값 time 이 없는 경우
      // 전체 날짜 문서 삭제
      const result = await collection.deleteOne({ date: date });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "해당 날짜의 문서를 찾을 수 없습니다." });
      }

      return res.status(200).json({
        message: `${date} 날짜의 모든 항목이 삭제되었습니다.`,
      });
    }
  } catch (error) {
    console.error("MongoDB 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

/*
curl -X PATCH http://localhost:5001/api/schedules ^
  -H "Content-Type: application/json" ^
  -d "{ \"date\": \"2025-07-09\",  \"time\": \"14:00\", \"checked\": true }"

  이 요청은 날짜 2025-07-09, 시간 14:00 의 checked 를 false 로 변경합니다.
*/
app.patch('/api/schedules', async (req, resp) => {

  try {
    const { date, time, checked } = req.body

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return resp.status(400).json({     // 400 상태값은 react 사용자 오류
        error: "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식을 사용해주세요.",
      });
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      return resp.status(400).json({
        error: "시간 형식이 올바르지 않습니다. HH:MM 형식을 사용해주세요.",
      });
    }

    //db에 요청 : checked 수정(updateOne 메소드)
    const collection = db.collection(COLLECTION_NAME)

    const result = await collection.updateOne(
      // 조건 : 시간, 날짜(todos 속성)
      { date: date, 'todos.time': time },
      // 수정할 값 : $ 기호는 위 조건에 맞는 요소
      { $set: { 'todos.$.checked': checked } }
    )

    console.log('patch result:', result)

    if (result.matchedCount === 0) {
      return resp.status(404).json({ error: "해당 날짜의 문서를 찾을 수 없습니다." })
    }

    resp.status(200).json({
      message: `${date} ${time} ${checked} 변경완료.`,
      modifiedCount: result.modifiedCount   // 업데이트 정상이면 1
    })

  } catch (error) {
    console.error("Mongo Db 오류 : ", error)
    //응답 상태코드 지정(서버오류 500). 오류 메시지 보내기  -> 리액트에서 받는 응답
    resp.status(500).json({ error: "서버오류가 발생했습니다." })
  }


})