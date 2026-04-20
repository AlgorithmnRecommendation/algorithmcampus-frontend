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
    problemNumber: 1753,
    title: "최단경로",
    tier: "Gold 4",
    tags: ["그래프", "다익스트라", "최단경로"],
    reason: "약점 보완",
    description: "최단 경로 유형을 보강하기 좋은 기본 문제입니다.",
    difficulty: 3,
    acceptanceRate: 26.8,
    recommendedDate: "2025-04-13",
    url: "https://www.acmicpc.net/problem/1753"
  },
  {
    id: 3,
    problemNumber: 1238,
    title: "파티",
    tier: "Gold 3",
    tags: ["그래프", "다익스트라"],
    reason: "약점 보완",
    description: "다익스트라를 양방향 관점에서 적용해볼 수 있습니다.",
    difficulty: 4,
    acceptanceRate: 48.1,
    recommendedDate: "2025-04-13",
    url: "https://www.acmicpc.net/problem/1238"
  },
  {
    id: 4,
    problemNumber: 1504,
    title: "특정한 최단 경로",
    tier: "Gold 4",
    tags: ["그래프", "다익스트라"],
    reason: "약점 보완",
    description: "필수 경유 조건이 있는 최단 경로 문제입니다.",
    difficulty: 3,
    acceptanceRate: 29.5,
    recommendedDate: "2025-04-13",
    url: "https://www.acmicpc.net/problem/1504"
  },
  {
    id: 5,
    problemNumber: 4485,
    title: "녹색 옷 입은 애가 젤다지?",
    tier: "Gold 4",
    tags: ["그래프", "다익스트라", "격자"],
    reason: "약점 보완",
    description: "격자에서 최단 경로 감각을 익히기 좋습니다.",
    difficulty: 3,
    acceptanceRate: 46.6,
    recommendedDate: "2025-04-13",
    url: "https://www.acmicpc.net/problem/4485"
  },
  {
    id: 6,
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
    id: 7,
    problemNumber: 1600,
    title: "말이 되고픈 원숭이",
    tier: "Gold 3",
    tags: ["BFS", "그래프"],
    reason: "난이도 상승",
    description: "상태를 확장한 BFS로 한 단계 높은 난이도에 도전할 수 있습니다.",
    difficulty: 4,
    acceptanceRate: 25.2,
    recommendedDate: "2025-04-14",
    url: "https://www.acmicpc.net/problem/1600"
  },
  {
    id: 8,
    problemNumber: 2638,
    title: "치즈",
    tier: "Gold 3",
    tags: ["BFS", "구현"],
    reason: "난이도 상승",
    description: "시뮬레이션과 BFS를 함께 다루는 문제입니다.",
    difficulty: 4,
    acceptanceRate: 44.7,
    recommendedDate: "2025-04-14",
    url: "https://www.acmicpc.net/problem/2638"
  },
  {
    id: 9,
    problemNumber: 9328,
    title: "열쇠",
    tier: "Gold 1",
    tags: ["BFS", "구현"],
    reason: "난이도 상승",
    description: "조건 변화가 있는 탐색으로 난이도를 올려볼 수 있습니다.",
    difficulty: 5,
    acceptanceRate: 29.1,
    recommendedDate: "2025-04-14",
    url: "https://www.acmicpc.net/problem/9328"
  },
  {
    id: 10,
    problemNumber: 16946,
    title: "벽 부수고 이동하기 4",
    tier: "Gold 2",
    tags: ["BFS", "그래프"],
    reason: "난이도 상승",
    description: "탐색 결과를 재사용하는 연습에 적합합니다.",
    difficulty: 5,
    acceptanceRate: 39.4,
    recommendedDate: "2025-04-14",
    url: "https://www.acmicpc.net/problem/16946"
  },
  {
    id: 11,
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
    id: 12,
    problemNumber: 11726,
    title: "2×n 타일링",
    tier: "Silver 3",
    tags: ["DP"],
    reason: "유사 문제",
    description: "기초 점화식을 다시 확인할 수 있는 DP 문제입니다.",
    difficulty: 2,
    acceptanceRate: 38.7,
    recommendedDate: "2025-04-15",
    url: "https://www.acmicpc.net/problem/11726"
  },
  {
    id: 13,
    problemNumber: 2579,
    title: "계단 오르기",
    tier: "Silver 3",
    tags: ["DP"],
    reason: "유사 문제",
    description: "최근 DP 풀이 패턴과 이어지는 대표 문제입니다.",
    difficulty: 2,
    acceptanceRate: 36.9,
    recommendedDate: "2025-04-15",
    url: "https://www.acmicpc.net/problem/2579"
  },
  {
    id: 14,
    problemNumber: 1149,
    title: "RGB거리",
    tier: "Silver 1",
    tags: ["DP"],
    reason: "유사 문제",
    description: "상태 전이를 깔끔하게 정리하는 연습에 좋습니다.",
    difficulty: 2,
    acceptanceRate: 54.2,
    recommendedDate: "2025-04-15",
    url: "https://www.acmicpc.net/problem/1149"
  },
  {
    id: 15,
    problemNumber: 2156,
    title: "포도주 시식",
    tier: "Silver 1",
    tags: ["DP"],
    reason: "유사 문제",
    description: "계단 오르기와 비슷한 선택 제한 DP입니다.",
    difficulty: 2,
    acceptanceRate: 34.8,
    recommendedDate: "2025-04-15",
    url: "https://www.acmicpc.net/problem/2156"
  },
  {
    id: 16,
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
    id: 17,
    problemNumber: 1717,
    title: "집합의 표현",
    tier: "Gold 5",
    tags: ["자료구조", "유니온파인드"],
    reason: "새로운 알고리즘",
    description: "유니온 파인드의 기본 연산을 익히는 문제입니다.",
    difficulty: 3,
    acceptanceRate: 32.6,
    recommendedDate: "2025-04-16",
    url: "https://www.acmicpc.net/problem/1717"
  },
  {
    id: 18,
    problemNumber: 1976,
    title: "여행 가자",
    tier: "Gold 4",
    tags: ["그래프", "유니온파인드"],
    reason: "새로운 알고리즘",
    description: "연결성 판정을 유니온 파인드로 풀어볼 수 있습니다.",
    difficulty: 3,
    acceptanceRate: 39.2,
    recommendedDate: "2025-04-16",
    url: "https://www.acmicpc.net/problem/1976"
  },
  {
    id: 19,
    problemNumber: 4195,
    title: "친구 네트워크",
    tier: "Gold 2",
    tags: ["자료구조", "유니온파인드", "해시"],
    reason: "새로운 알고리즘",
    description: "문자열 키와 집합 크기를 함께 관리하는 문제입니다.",
    difficulty: 5,
    acceptanceRate: 29.8,
    recommendedDate: "2025-04-16",
    url: "https://www.acmicpc.net/problem/4195"
  },
  {
    id: 20,
    problemNumber: 20040,
    title: "사이클 게임",
    tier: "Gold 4",
    tags: ["자료구조", "유니온파인드"],
    reason: "새로운 알고리즘",
    description: "사이클 판정을 빠르게 처리하는 연습에 적합합니다.",
    difficulty: 3,
    acceptanceRate: 51.2,
    recommendedDate: "2025-04-16",
    url: "https://www.acmicpc.net/problem/20040"
  },
  {
    id: 21,
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
  },
  {
    id: 22,
    problemNumber: 11279,
    title: "최대 힙",
    tier: "Silver 2",
    tags: ["자료구조", "힙"],
    reason: "기초 다지기",
    description: "우선순위 큐 기본 사용법을 복습할 수 있습니다.",
    difficulty: 2,
    acceptanceRate: 45.5,
    recommendedDate: "2025-04-17",
    url: "https://www.acmicpc.net/problem/11279"
  },
  {
    id: 23,
    problemNumber: 11286,
    title: "절댓값 힙",
    tier: "Silver 1",
    tags: ["자료구조", "힙"],
    reason: "기초 다지기",
    description: "비교 기준을 직접 설계하는 힙 문제입니다.",
    difficulty: 2,
    acceptanceRate: 56.3,
    recommendedDate: "2025-04-17",
    url: "https://www.acmicpc.net/problem/11286"
  },
  {
    id: 24,
    problemNumber: 1874,
    title: "스택 수열",
    tier: "Silver 2",
    tags: ["자료구조", "스택"],
    reason: "기초 다지기",
    description: "스택의 동작 과정을 차근히 점검할 수 있습니다.",
    difficulty: 2,
    acceptanceRate: 38.4,
    recommendedDate: "2025-04-17",
    url: "https://www.acmicpc.net/problem/1874"
  },
  {
    id: 25,
    problemNumber: 1966,
    title: "프린터 큐",
    tier: "Silver 3",
    tags: ["자료구조", "큐"],
    reason: "기초 다지기",
    description: "큐와 우선순위 흐름을 함께 다룰 수 있습니다.",
    difficulty: 2,
    acceptanceRate: 56.7,
    recommendedDate: "2025-04-17",
    url: "https://www.acmicpc.net/problem/1966"
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
