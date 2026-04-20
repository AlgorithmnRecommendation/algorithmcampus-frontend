import React, { useState, useEffect } from 'react';
import { problemsApi } from '../api';
import Loading from '../components/Loading';
import { getProblemNumber, goToProblemUrl } from '../utils/problemUrl';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      // Mock 데이터
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookmarks([
        {
          id: 101,
          title: '동적 계획법 - 배낭 문제',
          difficulty: 'Gold',
          tags: ['DP', '배낭'],
          acceptanceRate: 35,
          solvedCount: 789,
          bookmarkedAt: '2024-01-15',
          note: '나중에 다시 풀어보기'
        },
        {
          id: 102,
          title: '그래프 최단 경로',
          difficulty: 'Gold',
          tags: ['그래프', '다익스트라'],
          acceptanceRate: 28,
          solvedCount: 1234,
          bookmarkedAt: '2024-01-14',
          note: '다익스트라 알고리즘 복습'
        },
        {
          id: 103,
          title: '트리 DP',
          difficulty: 'Platinum',
          tags: ['트리', 'DP'],
          acceptanceRate: 18,
          solvedCount: 456,
          bookmarkedAt: '2024-01-12',
          note: ''
        }
      ]);
    } catch (err) {
      console.error('북마크 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnbookmark = async (problemId) => {
    try {
      await problemsApi.unbookmarkProblem(problemId);
      setBookmarks(bookmarks.filter(b => b.id !== problemId));
    } catch (err) {
      console.error('북마크 해제 실패:', err);
    }
  };

  if (loading) return <Loading message="북마크를 불러오는 중..." />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">북마크</h1>
        <p className="text-gray-600">나중에 풀어볼 문제들을 저장해두었습니다</p>
      </div>

      {/* 북마크 카운트 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-sm text-gray-600 mb-1">저장된 문제</div>
        <div className="text-3xl font-bold text-blue-600">{bookmarks.length}개</div>
      </div>

      {/* 북마크 리스트 */}
      <div className="space-y-4">
        {bookmarks.map((problem) => (
          <div
            key={problem.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => goToProblemUrl(problem)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{problem.title}</h3>
                <div className="text-sm text-gray-500 mb-2">#{getProblemNumber(problem)}</div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {problem.tags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${
                  problem.difficulty === 'Platinum' ? 'bg-cyan-100 text-cyan-800' :
                  problem.difficulty === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                  problem.difficulty === 'Silver' ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {problem.difficulty}
                </span>
                <button
                  onClick={() => handleUnbookmark(problem.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="북마크 해제"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>정답률: {problem.acceptanceRate}%</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
              <span>북마크: {problem.bookmarkedAt}</span>
            </div>

            {problem.note && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700 italic">📝 {problem.note}</p>
              </div>
            )}
          </div>
        ))}

        {bookmarks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p>북마크한 문제가 없습니다</p>
            <p className="text-sm mt-2">나중에 풀어보고 싶은 문제를 저장해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
