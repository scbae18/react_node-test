# 📘 API 명세 및 Swagger 설정 가이드

이 문서는 React 프론트엔드와 Node.js 백엔드가 협업할 때, API 명세서를 어떻게 작성하고, Swagger를 이용해 자동화하는지를 설명합니다.  
또한 `/navigate` API의 예시 구현과 함께 명세 및 Swagger 설정도 포함되어 있습니다.

---

## 🧩 API 명세서란?

프론트와 백엔드가 **데이터 주고받는 규칙을 문서화**한 것.  
React 프론트엔드 개발자가 백엔드에서 만든 API를 정확히 이해하고 사용할 수 있도록 백엔드 개발자가 작성해야 함.

---

## 🧾 [GET] /navigate 명세서 (Markdown 기반)

```markdown
## [GET] /navigate

### 📌 설명
버튼 클릭 시 이동할 페이지 경로(`/redirectTo`)를 반환합니다.  
React에서 이 값을 받아 클라이언트 측 라우팅으로 이동하는 데 사용됩니다.

---

### ✅ 요청

- **Method**: `GET`
- **URL**: `/navigate`
- **Headers**: 없음
- **Query Params**: 없음

---

### ✅ 응답

#### 📗 200 OK
```json
{
  "redirectTo": "/new-page"
}
```

- `redirectTo`: 클라이언트가 이동할 경로

---

## 🔧 Swagger를 이용한 API 명세 자동화

### 📁 프로젝트 구조 예시

```
/my-server
├── index.js          # 서버 엔트리 파일
├── swagger.js        # Swagger 설정 파일
├── package.json
└── node_modules/
```

---

### 📦 1. Swagger 관련 패키지 설치

```bash
npm install swagger-jsdoc swagger-ui-express
```

---

### 🧾 2. Swagger 설정 파일 만들기

#### `swagger.js`
```js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Navigate API Docs',
      version: '1.0.0',
      description: 'API documentation for navigation endpoint',
    },
  },
  apis: ['./index.js'], // Swagger 주석을 포함할 파일 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
```

---

### ⚙️ 3. 서버에 Swagger 적용 및 주석 추가

#### `index.js`
```js
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = 5000;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /navigate:
 *   get:
 *     summary: 이동할 페이지 경로를 반환
 *     description: 버튼 클릭 시 이동할 경로를 JSON 형태로 반환합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 리디렉션 경로 반환
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

---

### 🌐 4. Swagger 문서 확인

서버 실행 후 아래 주소에서 확인 가능:

```
http://localhost:5000/api-docs
```

---

## ✅ 참고 사항

- `swagger.js`는 루트 또는 `config/` 폴더에 위치 가능
- `apis: ['./index.js']` 경로는 주석이 포함된 파일 위치에 따라 변경 필요
- Swagger를 사용하면 API가 변경될 때마다 자동 문서화 가능해 협업에 매우 유리함

---

## 📑 Notion에 API 명세서 작성하기

1. **API 목록**  
   - 각 API의 이름과 기능 요약

2. **Swagger 주석 기반 문서화**  
   - Swagger UI에서 제공하는 설명을 그대로 붙여넣기
   - 예시: 각 HTTP 메서드 (GET, POST 등), 요청/응답 파라미터 설명

3. **테스트 정보**  
   - Swagger UI에서 제공하는 `Try it out` 기능 활용 가능

---

**예시:**

### /navigate API

- **기능**: 버튼 클릭 후 이동할 페이지 경로를 반환
- **HTTP 메서드**: GET
- **URL**: `/navigate`

---

**요청 예시**:
```http
GET /navigate HTTP/1.1
Host: localhost:5000
```

**응답 예시**:
```json
{
  "redirectTo": "/new-page"
}
```

---