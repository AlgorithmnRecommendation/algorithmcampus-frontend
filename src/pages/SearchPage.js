import React, { useState } from 'react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    platform: 'all', // all, baekjoon, programmers, leetcode
    difficulty: 'all', // all, bronze, silver, gold, platinum
    tags: []
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Mock 검색 결과
      await new Promise(resolve => setTimeout(resolve, 500));
      setSearchResults([
        {
          id: 1001,
          title: '두 수의 합',
          platform: 'baekjoon',
          difficulty: 'Silver',
          tags: ['구현', '수학'],
          acceptanceRate: 45,
          solvedCount: 1234
        },
        {
          id: 1002,
          title: '최단 경로',
          platform: 'baekjoon',
          difficulty: 'Gold',
          tags: ['그래프', '다익스트라'],
          acceptanceRate: 32,
          solvedCount: 890
        },
        {
          id: 1003,
          title: '동적 프로그래밍 기초',
          platform: 'programmers',
          difficulty: 'Level 3',
          tags: ['DP'],
          acceptanceRate: 28,
          solvedCount: 567
        }
      ]);
    } catch (err) {
      console.error('검색 실패:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">문제 검색</h1>
        <p className="text-gray-600">원하는 알고리즘 문제를 찾아보세요</p>
      </div>

      {/* 검색 바 */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="문제 제목, 번호, 알고리즘 유형으로 검색..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={searching}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {searching ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>

      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="font-semibold mb-4">필터</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 플랫폼 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">플랫폼</label>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="baekjoon">백준</option>
              <option value="programmers">프로그래머스</option>
              <option value="leetcode">LeetCode</option>
            </select>
          </div>

          {/* 난이도 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>

          {/* 태그 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">알고리즘 유형</label>
            <input
              type="text"
              placeholder="예: DP, 그래프, 구현..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <div>
        {searchResults.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {searchResults.length}개의 문제를 찾았습니다
            </div>
            <div className="space-y-4">
              {searchResults.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => window.location.href = `/problems/${problem.id}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {problem.title}
                      </h3>
                      <div className="flex gap-2 items-center text-sm text-gray-600">
                        <span className="capitalize">{problem.platform}</span>
                        <span>•</span>
                        <span>#{problem.id}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      problem.difficulty.includes('Gold') ? 'bg-yellow-100 text-yellow-800' :
                      problem.difficulty.includes('Silver') ? 'bg-gray-100 text-gray-800' :
                      problem.difficulty.includes('Bronze') ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-3 flex-wrap">
                    {problem.tags?.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>정답률: {problem.acceptanceRate}%</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {problem.solvedCount}명
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p>검색어를 입력하여 문제를 찾아보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
