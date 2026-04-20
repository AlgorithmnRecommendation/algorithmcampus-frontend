# API 연동 가이드

## 현재 상태
프론트엔드는 **Mock API**로 동작하고 있으며, 백엔드 준비 시 간단한 설정 변경만으로 실제 API에 연결할 수 있습니다.

## 디렉토리 구조
```
src/
├── api/
│   ├── index.js          # Mock/Real API 전환 로직 (여기서 모든 API import)
│   ├── client.js         # Axios 인스턴스 설정 (JWT 토큰 자동 추가)
│   ├── mockApi.js        # Mock API 함수들
│   └── realApi.js        # 실제 백엔드 API 함수들
├── mocks/
│   └── mockData.js       # Mock 데이터
├── contexts/
│   └── AuthContext.js    # 인증 상태 관리
├── utils/
│   └── storage.js        # localStorage 유틸
└── components/
    └── Loading.js        # 로딩 컴포넌트
```

## Mock → Real API 전환 방법

### 1단계: 환경 변수 수정
`.env` 파일을 열어서 다음 값을 변경:

```env
# Mock 모드 끄기
REACT_APP_USE_MOCK=false

# 백엔드 API URL 설정
REACT_APP_API_URL=https://your-backend-domain.com/api

# GitHub OAuth Client ID (백엔드 팀에서 제공)
REACT_APP_GITHUB_CLIENT_ID=your_actual_github_client_id
```

### 2단계: 재시작
```bash
npm start
```

이게 전부입니다! 이제 실제 백엔드 API를 호출합니다.

## API 사용 방법

### 컴포넌트에서 API 호출
```javascript
import { dashboardApi, problemsApi, authApi, userApi } from '../api';

// 사용 예시
const MyComponent = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await dashboardApi.getStats();
        console.log(response.data);
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };
    loadData();
  }, []);
};
```

### 인증이 필요한 API
JWT 토큰은 자동으로 추가됩니다. `api/client.js`의 인터셉터가 처리합니다.

```javascript
// 로그인 후 자동으로 토큰이 저장되고, 이후 모든 API 요청에 자동 추가됨
const response = await userApi.getUser();
```

## 사용 가능한 API

### 1. authApi
- `getGithubLoginUrl()` - GitHub 로그인 URL 가져오기
- `handleGithubCallback(code)` - OAuth 콜백 처리
- `logout()` - 로그아웃
- `getCurrentUser()` - 현재 사용자 정보

### 2. userApi
- `getUser()` - 사용자 정보
- `getRepositories()` - GitHub 저장소 목록
- `analyzeGithub()` - GitHub 분석 시작

### 3. problemsApi
- `getRecommendations()` - 추천 문제 목록
- `bookmarkProblem(problemNumber)` - 문제 북마크
- `unbookmarkProblem(problemNumber)` - 북마크 해제

### 4. dashboardApi
- `getStats()` - 대시보드 통계
- `getHistory(limit, offset)` - 풀이 이력
- `getWeakPoints()` - 약점 분석

## 백엔드 API 명세 확인 필요

`src/api/realApi.js` 파일의 엔드포인트 URL들이 백엔드 실제 API와 일치하는지 확인하세요:

```javascript
// 예시
export const realAuthApi = {
  getGithubLoginUrl: () => {
    return apiClient.get('/auth/github/login');  // 이 경로가 백엔드와 일치하는지 확인
  },
  // ...
};
```

## 에러 처리

API 에러는 `api/client.js`의 인터셉터에서 자동 처리됩니다:
- **401 (Unauthorized)**: 자동 로그아웃 후 랜딩 페이지로 리다이렉트
- **403 (Forbidden)**: 콘솔에 에러 로그
- **500 (Server Error)**: 콘솔에 에러 로그

## 개발 팁

### Mock 데이터 수정
`src/mocks/mockData.js` 파일에서 테스트용 데이터를 수정할 수 있습니다.

### 실제 API 엔드포인트 수정
백엔드 API 경로가 변경되면 `src/api/realApi.js` 파일만 수정하면 됩니다.

### 로컬 개발 시 CORS 문제
백엔드가 `http://localhost:8080`에서 실행 중이고 CORS 에러가 발생하면:
1. 백엔드에서 CORS 설정 확인
2. 또는 `package.json`에 proxy 추가:
```json
{
  "proxy": "http://localhost:8080"
}
```

## Mock API 동작 방식

Mock API는 실제 네트워크 지연을 시뮬레이션합니다 (500ms):
```javascript
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
```

이를 통해 로딩 상태를 테스트할 수 있습니다.
