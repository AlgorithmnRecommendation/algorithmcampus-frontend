// Mock 사용자 데이터
export const mockUser = {
  id: 1,
  githubId: "example_user",
  username: "김알고리즘",
  avatarUrl: "https://via.placeholder.com/150",
  email: "user@example.com",
  createdAt: "2025-01-01T00:00:00Z",
  lastAnalyzedAt: "2025-04-10T00:00:00Z",
  repositories: [
    { id: 1, name: "algorithm-study", fullName: "user/algorithm-study", url: "https://github.com/user/algorithm-study" },
    { id: 2, name: "baekjoon-solutions", fullName: "user/baekjoon-solutions", url: "https://github.com/user/baekjoon-solutions" }
  ]
};

// Mock 대시보드 통계
export const mockDashboardStats = {
  totalSolved: 127,
  averageTier: "Gold 3",
  solvedThisWeek: 8,
  currentStreak: 5,
  longestStreak: 21,
  tierDistribution: [
    { tier: "Bronze", count: 35 },
    { tier: "Silver", count: 48 },
    { tier: "Gold", count: 32 },
    { tier: "Platinum", count: 10 },
    { tier: "Diamond", count: 2 }
  ],
  tagDistribution: [
    { tag: "구현", count: 42 },
    { tag: "DP", count: 28 },
    { tag: "그래프", count: 24 },
    { tag: "그리디", count: 18 },
    { tag: "BFS", count: 16 },
    { tag: "DFS", count: 14 },
    { tag: "이분탐색", count: 12 },
    { tag: "정렬", count: 10 }
  ],
  recentActivity: [
    { date: "2025-04-13", problemsSolved: 2 },
    { date: "2025-04-12", problemsSolved: 1 },
    { date: "2025-04-11", problemsSolved: 3 },
    { date: "2025-04-10", problemsSolved: 1 },
    { date: "2025-04-09", problemsSolved: 0 },
    { date: "2025-04-08", problemsSolved: 1 },
    { date: "2025-04-07", problemsSolved: 2 }
  ]
};

// Mock 추천 문제 목록
export const mockRecommendations = [
  {
    id: 1,
    problemNumber: 1916,
    title: "최소비용 구하기",
    tier: "Gold 5",
    tags: ["그래프", "다익스트라", "최단경로"],
    reason: "약점 보완",
    description: "최근 2주간 그래프 문제 풀이가 부족합니다. 다익스트라 알고리즘 복습이 필요해 보입니다.",
    difficulty: 3,
    acceptanceRate: 32.5,
    recommendedDate: "2025-04-13",
    url: "https://www.acmicpc.net/problem/1916"
  },
  {
    id: 2,
    problemNumber: 2206,
    title: "벽 부수고 이동하기",
    tier: "Gold 3",
    tags: ["BFS", "그래프"],
    reason: "난이도 상승",
    description: "Gold 4 문제를 꾸준히 풀고 계십니다. 한 단계 높은 난이도에 도전해보세요.",
    difficulty: 4,
    acceptanceRate: 28.3,
    recommendedDate: "2025-04-14",
    url: "https://www.acmicpc.net/problem/2206"
  },
  {
    id: 3,
    problemNumber: 11053,
    title: "가장 긴 증가하는 부분 수열",
    tier: "Silver 2",
    tags: ["DP"],
    reason: "유사 문제",
    description: "최근 풀었던 DP 문제와 유사한 패턴입니다. 개념을 확고히 다질 수 있습니다.",
    difficulty: 2,
    acceptanceRate: 42.1,
    recommendedDate: "2025-04-15",
    url: "https://www.acmicpc.net/problem/11053"
  },
  {
    id: 4,
    problemNumber: 1043,
    title: "거짓말",
    tier: "Gold 4",
    tags: ["그래프", "유니온파인드"],
    reason: "새로운 알고리즘",
    description: "아직 시도하지 않은 유니온 파인드 알고리즘을 학습할 수 있는 좋은 문제입니다.",
    difficulty: 3,
    acceptanceRate: 35.7,
    recommendedDate: "2025-04-16",
    url: "https://www.acmicpc.net/problem/1043"
  },
  {
    id: 5,
    problemNumber: 1927,
    title: "최소 힙",
    tier: "Silver 2",
    tags: ["자료구조", "힙"],
    reason: "기초 다지기",
    description: "자료구조의 기본인 힙 구조를 복습할 수 있는 문제입니다.",
    difficulty: 2,
    acceptanceRate: 48.9,
    recommendedDate: "2025-04-17",
    url: "https://www.acmicpc.net/problem/1927"
  }
];

// Mock 풀이 이력
export const mockSolvedHistory = [
  {
    id: 1,
    problemNumber: 1260,
    title: "DFS와 BFS",
    tier: "Silver 2",
    tags: ["BFS", "DFS", "그래프"],
    solvedAt: "2025-04-12T14:30:00Z",
    source: "github"
  },
  {
    id: 2,
    problemNumber: 11726,
    title: "2×n 타일링",
    tier: "Silver 3",
    tags: ["DP"],
    solvedAt: "2025-04-11T10:15:00Z",
    source: "github"
  },
  {
    id: 3,
    problemNumber: 1149,
    title: "RGB거리",
    tier: "Silver 1",
    tags: ["DP"],
    solvedAt: "2025-04-10T16:45:00Z",
    source: "github"
  }
];

// Mock 약점 분석
export const mockWeakPoints = {
  underrepresentedTags: [
    { tag: "트리", count: 3, recommended: 10, gap: 7 },
    { tag: "분할정복", count: 2, recommended: 8, gap: 6 },
    { tag: "백트래킹", count: 4, recommended: 9, gap: 5 }
  ],
  difficultTiers: [
    { tier: "Platinum", attempts: 15, success: 6, successRate: 40 },
    { tier: "Gold 1", attempts: 12, success: 7, successRate: 58.3 }
  ],
  inactivePeriods: [
    { startDate: "2025-03-15", endDate: "2025-03-22", days: 7 },
    { startDate: "2025-02-10", endDate: "2025-02-18", days: 8 }
  ]
};
