# compensaTX-FE 🏦

보상 트랜잭션 패턴을 적용한 환전 시스템의 프론트엔드 애플리케이션입니다.

## ✨ 주요 기능

- **환전 서비스**: 다양한 통화 간 실시간 환전
- **거래 내역 조회**: 환전 내역 및 상태 실시간 확인
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 🛠 기술 스택

- **Framework**: Vue.js
- **언어**: JavaScript
- **스타일링**: CSS3, SCSS
- **HTTP 클라이언트**: Axios
- **빌드 도구**: Vue CLI

### 개발 도구
- **패키지 매니저**: npm
- **린터**: ESLint
- **버전 관리**: Git

## 🏃‍♂️ 시작하기

### 필수 요구사항
- Node.js 14.x 이상
- npm 6.x 이상

## ⚙️ 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/Woori-compensaTX/compensaTX-FE.git
cd compensaTX-FE
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run serve
```
개발 서버가 실행되면 [http://localhost:8080](http://localhost:8080)에서 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── components/            # 재사용 가능한 컴포넌트
│   └── TabHeader.vue      # Main 헤더 영역 컴포넌트
├── views/                 # 페이지 컴포넌트
│   ├── ExchangeView.vue   # 환전 테스트 페이지
│   ├── BuyView.vue        # 원화 → 외화 환전 페이지
│   ├── SaleView.vue       # 외화 → 원화 환전 페이지
│   ├── FailView.vue       # 서버 연동 에러 처리 페이지
│   └── ResultView.vue     # 환전 거래 순서 내역 확인 페이지
├── router.js              # 라우터 설정 파일
├── assets/                # 이미지 파일 폴더
└── css/                   # 스타일 파일 폴더
```

## 시나리오

## 🔧 주요 기능 설명

### 환전 서비스
- 실시간 환율을 기반으로 한 다중 통화 환전
- 환전 금액 및 수수료 실시간 계산
- 환전 요청 및 처리 상태 확인

### 거래 내역 조회
- 환전이 진행된 순서 목록 상세 조회

### 사용자 경험
- 환전 과정의 각 단계를 시각적으로 표시
- 실패 시 자동 복구 과정을 사용자에게 안내

## 📚 API 연동

### 기본 URL
```
https://{서버 IP}:80
```

### 주요 엔드포인트

#### 환전 요청
```http
POST /exchange
Content-Type: application/json

{
  "userid": 1,
  "direction": "BUY",
  "base": "USD",
  "base_account": 1,
  "base_amount": 10,
  "quote": "KRW",
  "quote_account": 1,
  "quote_amount": 1000,
  "rate": 1000,
  "guid": null,
  "status": "NONE",
  "date": "2025-08-15T08:22:33"
}
```

#### 환전 거래 순서 내역 조회
```http
GET /check/request
Content-Type: application/json

{
  "params" { "id" : transactionId }
}
```
