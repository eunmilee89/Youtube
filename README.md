# ▶️ YouTube Clone

> React와 TypeScript로 제작한 YouTube 클론 웹 애플리케이션

---

## 📖 소개

**YouTube Clone**은 실제 YouTube Data API v3를 연동하여 영상 피드, 재생, 댓글 기능을 구현한 포트폴리오 프로젝트입니다.
API 쿼터 소진 상황에도 개발을 이어갈 수 있도록 실제 API와 목(mock) 데이터를 분리한 서비스 아키텍처를 적용했습니다.

---

## 🛠 기술 스택

| 기술                                                                                                      | 설명                         |
| --------------------------------------------------------------------------------------------------------- | ---------------------------- |
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)                         | UI 컴포넌트 라이브러리       |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)             | 타입 안전성                  |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)     | 서버 상태 관리 & 무한 스크롤 |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)        | 라우팅                       |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)        | 반응형 스타일링              |
| ![YouTube Data API](https://img.shields.io/badge/YouTube_Data_API_v3-FF0000?logo=youtube&logoColor=white) | 영상/댓글 데이터 연동        |

<br/>

---

## ✨ 기능 소개

### 🏠 홈 화면 (Home)

- 인기 영상(Popular Videos) 목록을 무한 스크롤로 탐색
- `useInfiniteQuery` + `IntersectionObserver` 조합으로 스크롤 시 자동으로 다음 페이지 로드

### 🔍 검색 (Header → Search)

- Header의 검색 기능으로 키워드 입력 시 영상 검색
- 검색 완료 화면에서 키워드 관련 영상 목록 표시

### ▶️ 비디오 플레이어 (Watch)

- 영상 시청 가능
- 화면 옆에 관련 영상(Related Videos) 목록 표시
- 댓글 및 답글(대댓글)까지 조회 가능
- `ResizeObserver` 기반 반응형 오버플로우 드롭다운
- "더보기" 클릭 시 영상 설명 확장/축소

### 👤 채널 (Channel)

- 영상/댓글 작성자의 채널 클릭 시 채널 화면으로 이동
- ⚠️ 채널 화면 상세 구현은 아직 미완성

### 서비스 아키텍처 (Youtube / FakeYoutube)

- 실제 API 호출 클래스(`Youtube`)와 목 데이터 클래스(`FakeYoutube`)를 분리 설계
- API 쿼터 소진 시에도 `FakeYoutube`로 전환하여 개발 및 테스트 지속 가능

<br/>

---

## 📄 페이지 소개

### 홈 화면

#### pc 화면

<img src="./public/screenshots/main.png" width="600"/>

#### 모바일 화면

<img src="./public/screenshots/main-mobile.jpg" width="200"/>

### 검색 화면

#### pc 화면

<img src="./public/screenshots/keyword.png" width="600"/>

#### 모바일 화면

<img src="./public/screenshots/keyword-mobile.png" width="200"/>

### 비디오 플레이 화면

#### pc 화면

<img src="./public/screenshots/video-player.png" width="600"/>

##### 댓글 파트

<img src="./public/screenshots/comment.png" width="600"/>

#### 모바일 화면

<img src="./public/screenshots/video-player-mobile.jpg" width="200"/>

<br/>

---

## 📁 프로젝트 구조

```
youtube-clone/
├── public/
│   ├── data/               # 목(mock) API 응답용 JSON 픽스처
│   │   ├── channel-id.json
│   │   ├── comment-by-id.json
│   │   ├── commentThreads-by-id.json
│   │   ├── keyword.json
│   │   ├── popular.json
│   │   └── video-by-id.json
│   ├── img/
│   ├── screenshots/
│   └── types/
│       └── youtube.ts
├── src/
│   ├── api/
│   │   ├── youtube.ts
│   │   └── fakeYoutube.ts
│   ├── app/
│   │   └── router.tsx
│   ├── components/
│   │   ├── channel/
│   │   │   ├── ChannelImageText.tsx
│   │   │   ├── ChannelProfile.tsx
│   │   │   └── ChannelSubscriber.tsx
│   │   ├── comment/
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentImageText.tsx
│   │   │   └── CommentInput.tsx
│   │   ├── common/
│   │   │   ├── DropdownMenuItem.tsx
│   │   │   ├── FeedBackBtn.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── RelatedVideoCard.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   └── VideoCard.tsx
│   │   └── video/
│   │       ├── PopularVideos.tsx
│   │       ├── SearchResult.tsx
│   │       ├── VideoCardSkeleton.tsx
│   │       └── VideoPlayer.tsx
│   ├── context/
│   │   ├── youtubeApiContext.tsx
│   │   └── youtubeApiProvider.tsx
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useYoutubeApi.ts
│   ├── pages/
│   │   ├── Channel.tsx
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   └── Watch.tsx
│   ├── util/
│   │   ├── date.ts
│   │   ├── decodeHtmlEntities.ts
│   │   └── formatCount.ts
│   ├── App.css
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---
