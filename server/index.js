const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = 5000;

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /navigate:
 *   get:
 *     summary: 페이지 경로 제공 API
 *     description: 버튼 클릭 시 이동할 페이지 경로를 반환합니다.
 *     responses:
 *       200:
 *         description: 정상 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redirectTo:
 *                   type: string
 *                   example: /new-page
 */
app.get("/navigate", (req, res) => {
  res.json({ redirectTo: "/new-page" });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
