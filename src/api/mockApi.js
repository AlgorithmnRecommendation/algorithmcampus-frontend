import {
  mockUser,
  mockDashboardStats,
  mockRecommendations,
  mockSolvedHistory,
  mockWeakPoints
} from '../mocks/mockData';

// 네트워크 지연 시뮬레이션
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API 함수들
export const mockAuthApi = {
  // GitHub 로그인 URL 가져오기
  getGithubLoginUrl: async () => {
    await delay();
    return {
      data: {
        url: 'https://github.com/login/oauth/authorize?client_id=mock_client_id'
      }
    };
  },

  // GitHub OAuth 콜백 처리
  handleGithubCallback: async (code) => {
    await delay(1000);
    const token = 'mock_jwt_token_' + Date.now();
    return {
      data: {
        token,
        user: mockUser
      }
    };
  },

  // 로그아웃
  logout: async () => {
    await delay(300);
    return { data: { message: 'Logged out successfully' } };
  },

  // 현재 사용자 정보
  getCurrentUser: async () => {
    await delay();
    return { data: mockUser };
  }
};

export const mockUserApi = {
  // 사용자 정보 가져오기
  getUser: async () => {
    await delay();
    return { data: mockUser };
  },

  // GitHub 저장소 목록
  getRepositories: async () => {
    await delay();
    return { data: mockUser.repositories };
  },

  // GitHub 분석 시작
  analyzeGithub: async () => {
    await delay(2000); // 분석은 시간이 걸리므로
    return {
      data: {
        message: 'Analysis completed',
        stats: {
          totalCommits: 245,
          problemsFound: 127,
          newProblems: 5
        }
      }
    };
  }
};

export const mockProblemsApi = {
  // 추천 문제 목록
  getRecommendations: async () => {
    await delay();
    return { data: mockRecommendations };
  },

  // 문제 상세 정보
  getProblem: async (problemNumber) => {
    await delay();
    const problem = mockRecommendations.find(p => p.problemNumber === parseInt(problemNumber));
    return { data: problem || mockRecommendations[0] };
  },

  // 문제 북마크
  bookmarkProblem: async (problemNumber) => {
    await delay(300);
    return { data: { message: 'Bookmarked', problemNumber } };
  },

  // 북마크 해제
  unbookmarkProblem: async (problemNumber) => {
    await delay(300);
    return { data: { message: 'Unbookmarked', problemNumber } };
  }
};

export const mockDashboardApi = {
  // 대시보드 통계
  getStats: async () => {
    await delay();
    return { data: mockDashboardStats };
  },

  // 풀이 이력
  getHistory: async (limit = 20, offset = 0) => {
    await delay();
    return {
      data: {
        items: mockSolvedHistory,
        total: mockSolvedHistory.length,
        limit,
        offset
      }
    };
  },

  // 약점 분석
  getWeakPoints: async () => {
    await delay();
    return { data: mockWeakPoints };
  }
};
