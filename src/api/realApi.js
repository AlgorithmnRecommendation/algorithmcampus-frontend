import apiClient from './client';

// 실제 백엔드 API 호출 함수들
export const realAuthApi = {
  // GitHub 로그인 URL 가져오기
  getGithubLoginUrl: () => {
    return apiClient.get('/auth/github/login');
  },

  // GitHub OAuth 콜백 처리
  handleGithubCallback: (code) => {
    return apiClient.post('/auth/github/callback', { code });
  },

  // 로그아웃
  logout: () => {
    return apiClient.post('/auth/logout');
  },

  // 현재 사용자 정보
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  }
};

export const realUserApi = {
  // 사용자 정보 가져오기
  getUser: () => {
    return apiClient.get('/user/me');
  },

  // GitHub 저장소 목록
  getRepositories: () => {
    return apiClient.get('/user/repositories');
  },

  // GitHub 분석 시작
  analyzeGithub: () => {
    return apiClient.post('/user/analyze');
  }
};

export const realProblemsApi = {
  // 추천 문제 목록
  getRecommendations: () => {
    return apiClient.get('/problems/recommendations');
  },

  // 문제 상세 정보
  getProblem: (problemNumber) => {
    return apiClient.get(`/problems/${problemNumber}`);
  },

  // 문제 북마크
  bookmarkProblem: (problemNumber) => {
    return apiClient.post(`/problems/${problemNumber}/bookmark`);
  },

  // 북마크 해제
  unbookmarkProblem: (problemNumber) => {
    return apiClient.delete(`/problems/${problemNumber}/bookmark`);
  }
};

export const realDashboardApi = {
  // 대시보드 통계
  getStats: () => {
    return apiClient.get('/dashboard/stats');
  },

  // 풀이 이력
  getHistory: (limit = 20, offset = 0) => {
    return apiClient.get('/dashboard/history', {
      params: { limit, offset }
    });
  },

  // 약점 분석
  getWeakPoints: () => {
    return apiClient.get('/dashboard/weak-points');
  }
};