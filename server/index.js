const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger"); // 🔹 추가

const app = express();
const port = 5000;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // 🔹 Swagger UI 경로

// /**
//  * @swagger
//  * /navigate:
//  *   get:
//  *     summary: 이동할 페이지 경로를 반환
//  *     description: 버튼 클릭 시 이동할 경로를 JSON 형태로 반환합니다.
//  *     responses:
//  *       200:
//  *         description: 성공적으로 리디렉션 경로 반환
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 redirectTo:
//  *                   type: string
//  *                   example: /new-page
//  */

app.get("/navigate", (req, res) => {
  res.json({ redirectTo: "/new-page" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
