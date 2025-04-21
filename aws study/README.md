## ✅ 1. **포트포워딩 가능한 배포 서버 사용 (추천)**  
> **즉, 네 백엔드 서버를 외부에서 접근 가능하게 "진짜 배포"하는 방법이야.**

### 💡 **AWS EC2 + Nginx or PM2**  
> EC2는 AWS에서 제공하는 **클라우드 컴퓨터**야. 이 컴퓨터(서버) 안에 너의 백엔드 앱을 띄우면, **인터넷을 통해 어디서든 접근 가능**해져.

---

## 📌 왜 이걸 해?

- 로컬에서는 `localhost:3000` → 나만 볼 수 있어.
- EC2에 띄우면 `http://13.125.xxx.xxx:3000` → **프론트 팀원이 집에서 접속해도 볼 수 있어.**
- `/api-docs`도 열리니까 Swagger UI까지 공유 가능.

---

## ⚙️ 어떻게 하는가?

### 1. EC2 인스턴스 생성 (Ubuntu 추천)

- AWS EC2에 들어가서 인스턴스 생성
- 운영체제는 `Ubuntu 22.04` 추천
- 퍼블릭 IP를 꼭 기억해둬 (ex. `13.125.123.456`)

### 2. 보안 그룹에서 포트 열기

> EC2는 외부 접속을 방화벽으로 제한함.  
> 아래 포트를 **추가로 열어야 프론트가 너의 서버에 접근 가능해.**

- 22번 (SSH)
- 80번 (HTTP) ← 배포 시 필요
- 443번 (HTTPS) ← SSL 적용 시
- **3000번** ← NestJS 서버가 띄워지는 포트!

---

### 3. EC2에 접속

```bash
ssh -i [key.pem] ubuntu@[EC2 퍼블릭 IP]
```

---

### 4. Node.js 서버 실행

서버 코드를 EC2에 옮겨서 실행할 수 있어. 또는 GitHub에서 클론해서 실행하면 돼.

```bash
git clone https://github.com/seungchan/hackathon-backend.git
cd hackathon-backend
npm install
npm run start:prod
```

> 서버가 `3000` 포트에서 실행되면, 이제 아래 주소로 Swagger도 접근 가능:
> ```
> http://[EC2 IP]:3000/api-docs
> ```

---

### 5. PM2로 서버 백그라운드 실행

> 해커톤 중간에 SSH 연결 끊겨도 서버가 꺼지면 안 되지!  
> 그래서 `pm2`를 사용해서 **백그라운드로 계속 실행**되게 만들어.

```bash
npm install -g pm2
pm2 start dist/main.js --name "backend"
pm2 save
pm2 startup  # 재부팅해도 실행되게
```

## 🔗 프론트에게 줄 주소

```
http://[EC2 퍼블릭 IP]:3000/api-docs
```

이거 하나면 프론트는 Swagger에서 API 확인하고, 직접 테스트도 가능해!

---

필요하다면:
- EC2 설정 스크립트
- PM2 설정 템플릿
- GitHub Actions로 자동 배포 구성

도 바로 도와줄게!  
혹시 EC2 인스턴스 이미 만들어놨어? 아니면 같이 만드는 것도 도와줄까?

좋아, Seungchan!  
그러면 지금부터 **NestJS 서버를 AWS EC2에 배포해서 Swagger 명세서를 프론트가 외부에서 확인할 수 있도록 설정하는 방법**을 단계별로 아주 자세히 설명할게.

---

# 🚀 EC2 서버에 Swagger 포함 NestJS 프로젝트 배포하기 (정석 가이드)

---

## ✅ 1단계: EC2 인스턴스 만들기

1. **AWS 로그인** → [https://aws.amazon.com](https://aws.amazon.com)
2. EC2 → “인스턴스 시작” 클릭
3. 설정
   - Amazon Linux 2 또는 Ubuntu 22.04 선택
   - 인스턴스 유형: `t2.micro` (무료 티어)
   - 키 페어: 새로 만들거나 기존 사용 (`.pem` 파일 꼭 저장)
   - 보안 그룹:
     - 포트 22 (SSH)
     - 포트 3000 (NestJS)
     - 포트 80 (HTTP)
4. 인스턴스 생성 완료 후, **퍼블릭 IP 주소** 확인

---

## ✅ 2단계: EC2 접속하기

```bash
# .pem 키 권한 수정
chmod 400 your-key.pem

# SSH 접속
ssh -i your-key.pem ec2-user@<퍼블릭 IP>
```

Ubuntu라면 `ec2-user` 대신 `ubuntu`

---

## ✅ 6단계: EC2 보안 그룹 다시 확인 (Swagger 안 보일 경우)

- 인바운드 규칙에서 `포트 3000`, `0.0.0.0/0` (전체 허용) 추가
- 혹은 `포트 80`으로 Nginx 리버스 프록시 설정해서 `http://<IP>/api-docs` 가능

---

## ✅ 프론트에게 공유할 Swagger 주소

```bash
http://<퍼블릭 IP>:3000/api-docs
```

예시:  
```
http://13.124.122.199:3000/api-docs
```

이 주소를 프론트 개발자에게 공유하면,  
브라우저에서 바로 Swagger 명세서를 확인하고 개발할 수 있어!

---

필요하다면:
- `nginx`로 포트 80 연결하기
- `.env` 파일 사용 방법
- `Docker`로 NestJS 배포하기  
등도 추가로 알려줄 수 있어.

지금 어떤 부분 먼저 직접 해볼까?  
혹시 AWS 계정이나 EC2 인스턴스 세팅 도와줄까?

좋아 Seungchan!  
지금 궁금한 **“키 페어(.pem)”가 뭐고, 어떻게 만드는지** 아주 쉽게 설명해줄게!

---

## 🔐 키 페어(.pem)란?

- EC2 서버에 **원격 접속(SSH)** 하기 위한 **비밀번호 대신 사용하는 “열쇠”** 같은 거야.
- `.pem` 파일은 **비공개 키(private key)** 파일이고,  
  EC2 인스턴스를 만들 때 생성한 키 페어의 **한쪽 쌍**이야.
- 이 `.pem` 파일 없으면 EC2 서버에 접근할 수 없어.

> ✅ 즉, `.pem` 파일은 **EC2 잠금을 여는 열쇠**이기 때문에 **절대 잃어버리면 안 돼!**

---

## 🧑‍💻 키 페어로 접속하는 예시 (Mac/Linux 기준)

```bash
# 1. 권한 설정
chmod 400 seungchan-key.pem

# 2. SSH 접속
ssh -i seungchan-key.pem ec2-user@13.125.xxx.xxx
```

(우분투라면 `ec2-user` 대신 `ubuntu`)

---

## 💡 실수 방지 꿀팁

| 주의사항 | 설명 |
|----------|------|
| 🔒 파일 이름 바꾸지 않기 | 접속 시 정확한 경로와 파일명 필요 |
| 💾 Git에 올리지 않기 | `.gitignore`에 꼭 추가해야 보안 유지 |
| ☁️ 클라우드에 백업하지 않기 | 노출되면 보안 위협 |

---

## ✅ EC2 접속하는 전체 흐름

```
1. .pem 파일 준비 (키 페어)
2. 터미널에서 권한 설정
3. ssh 명령어로 접속
```

---

## 🛠 1단계: `.pem` 파일 위치 확인

예를 들어, 네 키 파일이 `Downloads/seungchan-key.pem`에 있다면,  
터미널에서 해당 폴더로 이동:

```bash
cd ~/Downloads
```

---

## 🔐 2단계: .pem 권한 설정 (중요!)

보안상 `.pem` 파일은 **너만 접근 가능해야 해**  
그래서 이 명령어를 꼭 실행해야 해:

```bash
chmod 400 seungchan-key.pem
```

> ✅ 이렇게 하면 `.pem` 파일이 읽기 전용으로 설정돼  
> ❌ 안 하면 SSH 접속 시 “Permissions are too open” 오류 나옴

---

## 🌐 3단계: 퍼블릭 IP 확인 (EC2 콘솔에서)

1. AWS EC2 콘솔로 가서  
2. 실행 중인 인스턴스 클릭  
3. **퍼블릭 IPv4 주소** 복사  
   예: `13.125.183.42`

---

## 🔌 4단계: SSH로 EC2에 접속

터미널에서 아래 명령어 실행:

```bash
ssh -i seungchan-key.pem ec2-user@13.125.183.42
```

> 만약 AMI가 Ubuntu면 `ec2-user` 대신 `ubuntu` 사용

성공하면 이런 메시지가 뜨면서 서버 안으로 접속돼:

```
__|  __|_  )
_|  (     /   Amazon Linux 2 AMI
___|\___|___|

[ec2-user@ip-172-31-xx-xx ~]$
```

---

## 다음 단계

접속 성공했다면 이제 3단계로 넘어가서  
👉 Node.js 설치하고 NestJS 서버 실행하는 방법 설명해줄게!

---

지금 여기까지 따라왔어?  
혹시 `.pem` 파일 이름이나 퍼블릭 IP 알려주면 명령어도 맞춰서 바로 적어줄 수 있어 🙌  
준비됐으면 **“접속 완료!”** 라고 말해줘!

좋아, Seungchan! 이제 EC2 서버 안에 성공적으로 접속했으니  
👉 **너가 만든 서버 코드를 EC2에 올리고 실행**하는 전체 과정을 차근차근 정리해줄게.

---

## 🧭 전체 흐름 (Node.js 프로젝트 배포)

```
1. EC2에 Git, Node.js, npm 설치
2. GitHub에서 코드 클론 or 직접 업로드
3. 프로젝트 의존성 설치 (npm install)
4. 환경 변수 설정 (.env)
5. 서버 실행 (개발용 or pm2로 프로세스 관리)
6. 보안그룹에 포트 열기 (예: 3000번)
7. 실제 접속 확인 (브라우저 or curl)
```

---

## ✅ 1. Git, Node.js 설치

```bash
sudo apt update
sudo apt install git -y
sudo apt install curl -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

설치 확인:

```bash
node -v
npm -v
```

---

## ✅ 2. 코드 서버에 올리기

### 방법 A. GitHub에서 클론 (가장 깔끔함)

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

> ❗ GitHub에 비공개로 올렸다면, **토큰 인증 또는 SSH 키** 필요할 수 있음

### 방법 B. 로컬에서 압축해서 업로드

1. 로컬에서 `.zip`으로 압축
2. [https://transfer.sh/](https://transfer.sh/) 같은 사이트로 올리기
3. EC2에서 `curl`로 다운로드:

```bash
curl -O https://transfer.sh/yourproject.zip
unzip yourproject.zip
cd yourproject
```

---

## ✅ 3. 의존성 설치

```bash
npm install
```

---

## ✅ 4. .env 환경변수 설정

```bash
touch .env
nano .env
```
저장: `Ctrl + O` → `Enter` → `Ctrl + X`

---

## ✅ 5. 서버 실행

```bash
node server.js
```

or NestJS라면:

```bash
npm run start:prod
```

> 서버가 `localhost:3000`에서 실행되겠지!

---

## ✅ 6. EC2 보안 그룹에 포트 열기

AWS 콘솔 → EC2 인스턴스 → **보안 그룹** → **인바운드 규칙 편집**  
`HTTP`, `Custom TCP 3000` 등 필요한 포트를 추가!

예:
- 유형: Custom TCP
- 포트 범위: 3000
- 소스: 0.0.0.0/0 (전 세계에서 접속 가능)

---

## ✅ 7. 접속 확인

이제 브라우저에서 열어보면 돼:

```
http://<EC2 퍼블릭 IP>:3000
```

> 또는 프론트엔드에서 해당 주소로 API 요청해도 OK!

---

## ☑️ 그다음 추천

- `pm2` 설치해서 서버를 백그라운드에서 실행: `npm install -g pm2`
- 실행: `pm2 start dist/main.js` or `pm2 start npm --name "backend" -- run start:prod`
- 상태 보기: `pm2 status`
- 재시작, 로그 확인, 재부팅 시 자동 실행 설정도 가능

---

## 🎯 왜 해야 돼?

EC2는 보안상 기본적으로 **외부에서 서버에 접근할 수 있는 포트를 막아둬**.  
예를 들어, 네 서버가 `3000` 포트에서 돌아가고 있어도 **외부에서는 접속할 수 없어**.

그래서:

> EC2 인스턴스에 연결된 “보안 그룹”에서 **인바운드 규칙**을 설정해서  
> "이 포트로 들어오는 요청은 허용해도 돼" 라고 AWS에 알려줘야 해.

---

## ✅ EC2 보안 그룹에서 포트 여는 법

### 1. AWS 콘솔 접속

- [https://console.aws.amazon.com](https://console.aws.amazon.com) 접속
- 상단 메뉴에서 `EC2` 검색해서 클릭

### 2. 인스턴스 선택

- 왼쪽 메뉴에서 **인스턴스** 클릭
- 너가 사용 중인 인스턴스를 선택

### 3. **보안 그룹 보기**

- 하단에 “보안” 섹션을 보면 **보안 그룹**이 보여
- 보안 그룹 이름 클릭

### 4. 인바운드 규칙 탭 이동

- 상단 탭 중에서 `인바운드 규칙` 클릭
- 오른쪽 위에 있는 **“인바운드 규칙 편집”** 버튼 클릭

---

## ✅ 3000 포트 여는 설정 예시

이제 인바운드 규칙을 추가할 수 있어. 아래처럼 입력하면 돼:

| 항목 | 설정값 |
|------|--------|
| **유형** | `Custom TCP` |
| **프로토콜** | `TCP` (자동 설정됨) |
| **포트 범위** | `3000` |
| **소스** | `0.0.0.0/0` (모든 IP 허용) |

> 🚨 소스를 `0.0.0.0/0`으로 하면 **전 세계에서 접속 가능**하다는 뜻이야.  
> 해커톤에서는 편하게 하기 위해 이렇게 하지만, 실제 서비스 시에는 IP 제한하는 게 좋아.

---

### 5. 저장

- 아래쪽에 있는 “규칙 저장” 클릭

---

## 📌 확인 방법

이제 `node server.js` 또는 `npm run start:prod` 등으로 서버를 실행하면,  
브라우저에서 다음과 같이 접속 가능해:

```
http://<EC2 퍼블릭 IP>:3000
```

예: `http://44.203.60.153:3000`

---

## 🙋‍♂️ 보너스 팁

- 프론트엔드에서 `fetch`, `axios` 등으로 API 요청할 때도 이 IP/포트를 사용하면 돼
- 프론트가 이 주소를 swagger에서 보고 그대로 써도 됨

---