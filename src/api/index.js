// Mock/Real API 전환 로직
import { mockAuthApi, mockUserApi, mockProblemsApi, mockDashboardApi } from './mockApi';
import { realAuthApi, realUserApi, realProblemsApi, realDashboardApi } from './realApi';

// 환경 변수로 Mock 사용 여부 결정
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';

// API Export - 환경에 따라 자동 전환
export const authApi = USE_MOCK ? mockAuthApi : realAuthApi;
export const userApi = USE_MOCK ? mockUserApi : realUserApi;
export const problemsApi = USE_MOCK ? mockProblemsApi : realProblemsApi;
export const dashboardApi = USE_MOCK ? mockDashboardApi : realDashboardApi;

// 현재 모드 확인 (디버깅용)
export const getApiMode = () => USE_MOCK ? 'MOCK' : 'REAL';

console.log(`[API Mode] ${getApiMode()} API 사용 중`);