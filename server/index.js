const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors()); // 다른 도메인에서 요청을 처리할 수 있게 함

// 버튼 클릭 후 이동할 페이지 경로 반환하는 API
app.get("/navigate", (req, res) => {
  // 예시: 페이지를 '/new-page'로 이동
  res.json({ redirectTo: "/new-page" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
