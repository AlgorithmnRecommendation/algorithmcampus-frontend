import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 401: 인증 실패 -> 로그아웃 처리
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      // 403: 권한 없음
      if (error.response.status === 403) {
        console.error('접근 권한이 없습니다.');
      }
      // 500: 서버 에러
      if (error.response.status === 500) {
        console.error('서버 오류가 발생했습니다.');
      }
    } else if (error.request) {
      console.error('서버에 연결할 수 없습니다.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
