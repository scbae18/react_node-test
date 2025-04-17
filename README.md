# 설명
frontend: react, backend: node.js를 이용하여 프로젝트 협업하기 위한 가이드 테스트 프로젝트

- **기능** 
  1. 메인 페이지에서 버튼 누르면 새로운 페이지로 넘어가기
  2. 이전 페이지로 이동 가능

### 프로젝트 폴더 구조

```bash
 PJ/
├── client/       # React 앱    
├── server/       # Node.js 서버
├── .gitignore
└── README.md
```

---

## ⚙️ 개발자별 초기 설치 및 세팅 가이드

---

### 🖥️ 1. 공통 설치 (최초 1회만)

- **Node.js** (LTS 버전 권장)  
  👉 [https://nodejs.org/](https://nodejs.org/)

- **Git**  
  👉 [https://git-scm.com/](https://git-scm.com/)

- **(선택) VSCode** + 필수 확장 프로그램  
  - ESLint  
  - Prettier  
  - React snippets  
  - GitLens

---

### 📦 2. 프로젝트 클론

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 🧩 3. 의존성 설치

#### 🔹 클라이언트 (React)
```bash
cd client
npm install
```

#### 🔹 서버 (Node.js)
```bash
cd ../server
npm install
```

---

### 🚀 4. 실행 방법

#### 🔹 프론트엔드 실행
```bash
cd client
npm start
# → http://localhost:3000
```

#### 🔹 백엔드 실행
```bash
cd server
node index.js
# → http://localhost:5000
```

---

### 📁 5. 폴더 구조 이해 (요약)

```bash
myproject/
├── client/       # React 앱
├── server/       # Node.js 서버
├── .gitignore
└── README.md
```

---

### ❌ 6. 깃 커밋 전 주의사항

- `node_modules/`는 절대 커밋 ❌  
- `.env` 파일이 있다면 **공유는 따로**, 커밋하지 않기
- 커밋 전에는 항상 `git status` 확인

---

### 📌 7. 자주 사용하는 명령어 요약

| 목적               | 명령어                        |
|--------------------|-------------------------------|
| 깃 브랜치 확인     | `git branch`                  |
| 새 브랜치 생성     | `git checkout -b feature/xxx` |
| 변경 사항 저장     | `git add .` → `git commit -m "메시지"` |
| 원격 푸시          | `git push origin 브랜치명`     |

---

### ✅ 1. `npx create-react-app client`

> **설명:**  
React 프로젝트를 빠르게 생성해주는 명령어야.  
- `npx`는 최신 패키지를 **설치하지 않고 바로 실행**할 수 있게 해줘.
- `create-react-app`은 리액트 앱을 빠르게 만드는 **공식 템플릿 도구**야.
- `client`는 생성할 폴더 이름이야.

> **결과:**  
- `client/`라는 폴더가 생기고,
- 그 안에 React 개발에 필요한 기본 파일과 폴더 (`src`, `public`, `package.json`, 등등)가 자동으로 생성됨.

---

### ✅ 2. `npm install react-router-dom`

> **설명:**  
React 앱 안에서 **페이지 전환(라우팅)** 을 가능하게 해주는 라이브러리를 설치하는 명령어야.

> 📌 예:  
- `/home`, `/login`, `/about` 같은 경로에 따라 다른 화면 보여주기 가능.
- `BrowserRouter`, `Route`, `Link`, `useNavigate` 같은 컴포넌트 제공.

> **설치 위치:**  
- React 프로젝트 폴더 (`client/`)에서 실행해야 함.

---

### ✅ 3. `npm install express cors`

> **설명:**  
백엔드(Node.js)에서 사용하는 모듈 두 개를 설치하는 명령어야.

#### 📦 `express`  
- Node.js에서 **서버를 쉽게 만들 수 있게 도와주는 프레임워크**야.
- API 만들고, 요청 받고 응답 보내고 이런 걸 쉽게 할 수 있어.

#### 📦 `cors`  
- 서로 다른 도메인/포트에서 요청할 때 발생하는 **CORS 에러를 방지**해주는 미들웨어야.
- 예: 프론트는 3000, 백엔드는 5000 포트일 때 브라우저가 차단할 수 있는데, 이걸 해결해줘.

> **설치 위치:**  
- 백엔드 코드가 있는 폴더 (`server/` 또는 루트)에서 실행해야 해.

---