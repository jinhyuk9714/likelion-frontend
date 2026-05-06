# Likelion Frontend

Likelion Frontend는 커뮤니티 플랫폼을 위한 React 기반 프론트엔드입니다. 로그인/회원가입, 게시글, 댓글, 좋아요, 모임 기능을 백엔드 API와 연동해 화면으로 제공합니다.

## 주요 기능

- JWT 기반 로그인/로그아웃 상태 관리
- Access Token 만료 시 Refresh Token으로 재발급 요청
- 인증이 필요한 라우트 보호
- 게시글 목록, 상세, 작성, 수정, 삭제
- 게시글 좋아요와 좋아요 취소
- 댓글과 대댓글 표시/작성/삭제
- 모임 목록, 상세, 생성, 참여
- 8개 카테고리 필터: 신체, 감정, 사회, 영적, 학습, 환경, 경제, 직업
- Axios 인스턴스와 API 모듈 분리

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Frontend | React 18, Create React App |
| Routing | React Router 6 |
| HTTP | Axios |
| State | Context API |
| Style | CSS Modules 방식의 컴포넌트별 CSS |
| Build | npm, react-scripts |

## 구조

```text
src/
├── api/              # auth, post, comment, meeting API 모듈
├── assets/icons/     # 카테고리와 네비게이션 아이콘
├── components/       # Header, PostCard, MeetingCard, Comment, Category
├── contexts/         # AuthContext
├── pages/            # Auth, Home, Post, Group, NotFound
├── App.js            # 라우팅
└── index.js          # 엔트리포인트
```

## 페이지 라우팅

| 경로 | 페이지 | 설명 |
| --- | --- | --- |
| `/login` | Login | 로그인 |
| `/signup` | Signup | 회원가입 |
| `/` | Main | 게시글 목록 |
| `/post/new` | PostCreate | 게시글 작성 |
| `/post/:id` | PostDetail | 게시글 상세와 댓글 |
| `/post/:id/edit` | PostEdit | 게시글 수정 |
| `/group` | Total | 모임 목록 |
| `/group/new` | MeetingCreate | 모임 생성 |
| `/group/:meetingId` | MeetingDetail | 모임 상세 |

## 실행 방법

Node.js와 npm이 필요합니다. 백엔드 API는 기본적으로 `http://localhost:8080`을 사용합니다.

```bash
npm install
npm start
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

API 서버 주소는 `.env`에서 바꿀 수 있습니다.

```env
REACT_APP_API_URL=http://localhost:8080
```

프로덕션 빌드는 다음 명령을 사용합니다.

```bash
npm run build
```

## API 연동

| 기능 | Method | Endpoint |
| --- | --- | --- |
| 로그인 | POST | `/login` |
| 회원가입 | POST | `/api/signUp` |
| 내 정보 | GET | `/api/member` |
| 게시글 | GET/POST/PUT/DELETE | `/api/post` |
| 좋아요 | POST/DELETE | `/api/post/{id}/like` |
| 댓글 | POST/DELETE | `/api/post/{id}/comment/{commentId}`, `/api/comment/{id}` |
| 모임 | GET/POST | `/api/meeting` |
| 모임 상세/참여 | GET/POST | `/api/meeting/{id}` |

## 참고 사항

- 이 저장소는 프론트엔드만 포함합니다. API 동작 확인에는 `likelion-backend` 서버가 필요합니다.
- 토큰은 현재 브라우저 `localStorage`에 저장됩니다.
