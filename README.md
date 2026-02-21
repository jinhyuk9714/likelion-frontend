# Front-likelion

React 기반 커뮤니티 플랫폼 프론트엔드

## 기술 스택

- **React** 18.2.0
- **React Router** 6.23.0
- **Axios** 1.7.2
- **Create React App** 5.0.1

## 프로젝트 구조

```
src/
├── api/                    # API 서비스 계층
│   ├── axiosInstance.js    # Axios 인스턴스 (인터셉터, 토큰 자동 갱신)
│   ├── authApi.js          # 인증 API (로그인, 회원가입)
│   ├── postApi.js          # 게시글 API (CRUD, 좋아요)
│   ├── commentApi.js       # 댓글 API (CRUD, 대댓글)
│   └── meetingApi.js       # 모임 API (목록, 생성, 참여)
├── contexts/
│   └── AuthContext.js      # 인증 상태 관리 (Context API)
├── components/
│   ├── Header/             # 상단 네비게이션 바
│   ├── ProtectedRoute/     # 인증 필요 라우트 보호
│   ├── PostCard/           # 게시글 미리보기 카드
│   ├── MeetingCard/        # 모임 미리보기 카드
│   ├── Comment/            # 댓글/대댓글 섹션
│   └── Category/           # 카테고리 필터 버튼
├── pages/
│   ├── Auth/               # 로그인, 회원가입
│   ├── Home/               # 메인 (게시글 목록)
│   ├── Post/               # 게시글 상세, 작성, 수정
│   └── Group/              # 모임 목록, 상세, 생성
├── App.js                  # 라우팅 설정
└── index.js                # 진입점
```

## 페이지 및 라우팅

| 경로 | 페이지 | 인증 필요 | 설명 |
|------|--------|:---------:|------|
| `/login` | Login | - | 로그인 |
| `/signup` | Signup | - | 회원가입 |
| `/` | Main | O | 게시글 목록 (페이지네이션) |
| `/post/new` | PostCreate | O | 게시글 작성 |
| `/post/:id` | PostDetail | O | 게시글 상세 (댓글, 좋아요) |
| `/post/:id/edit` | PostEdit | O | 게시글 수정 |
| `/group` | Total | O | 모임 목록 (카테고리 필터) |
| `/group/new` | MeetingCreate | O | 모임 생성 |
| `/group/:meetingId` | MeetingDetail | O | 모임 상세 |

## 주요 기능

### 인증

- JWT 기반 로그인/로그아웃
- Access Token 만료 시 Refresh Token으로 자동 갱신
- 토큰은 localStorage에 저장
- 인증되지 않은 사용자는 로그인 페이지로 리다이렉트

### 게시글

- 게시글 목록 조회 (페이지네이션)
- 게시글 작성, 수정, 삭제 (작성자만)
- 좋아요 / 좋아요 취소

### 댓글

- 댓글 작성 및 삭제
- 대댓글 (답글) 기능
- 스레드 형태의 댓글 트리 표시

### 모임

- 모임 목록 조회 (페이지네이션)
- 8개 카테고리 필터 (신체, 감정, 사회, 영적, 학습, 환경, 경제, 직업)
- 모임 생성 (제목, 카테고리, 요일, 시간, 인원 제한, 설명)
- 모임 참여

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm 9+
- 백엔드 서버 실행 중 (`http://localhost:8080`)

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성하여 API 서버 주소를 변경할 수 있습니다:

```env
REACT_APP_API_URL=http://localhost:8080
```

### 프로덕션 빌드

```bash
npm run build
```

`build/` 폴더에 최적화된 정적 파일이 생성됩니다.

## API 연동

백엔드(`Back-likelion`)와 연동되며, 주요 API 호출은 다음과 같습니다:

| 기능 | Method | 엔드포인트 |
|------|--------|-----------|
| 로그인 | POST | `/login` |
| 회원가입 | POST | `/api/signUp` |
| 내 정보 | GET | `/api/member` |
| 게시글 목록 | GET | `/api/post` |
| 게시글 상세 | GET | `/api/post/{id}` |
| 게시글 작성 | POST | `/api/post` |
| 게시글 수정 | PUT | `/api/post/{id}` |
| 게시글 삭제 | DELETE | `/api/post/{id}` |
| 좋아요 | POST | `/api/post/{id}/like` |
| 좋아요 취소 | DELETE | `/api/post/{id}/like` |
| 댓글 작성 | POST | `/api/post/{id}/comment/{commentId}` |
| 댓글 삭제 | DELETE | `/api/comment/{id}` |
| 모임 목록 | GET | `/api/meeting` |
| 모임 상세 | GET | `/api/meeting/{id}` |
| 모임 생성 | POST | `/api/meeting` |
| 모임 참여 | POST | `/api/meeting/{id}` |
