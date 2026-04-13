import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api';
import Loading from '../components/Loading';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, solved, attempted

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await dashboardApi.getHistory();
      setHistory(data.data?.items || []);
    } catch (err) {
      console.error('풀이 기록 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'solved') return item.status === 'solved';
    if (filter === 'attempted') return item.status === 'attempted';
    return true;
  });

  if (loading) return <Loading message="풀이 기록을 불러오는 중..." />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">풀이 기록</h1>
        <p className="text-gray-600">당신의 알고리즘 문제 풀이 히스토리</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">전체 시도</div>
          <div className="text-3xl font-bold text-blue-600">{history.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">성공</div>
          <div className="text-3xl font-bold text-green-600">
            {history.filter(h => h.status === 'solved').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">성공률</div>
          <div className="text-3xl font-bold text-purple-600">
            {history.length > 0
              ? Math.round((history.filter(h => h.status === 'solved').length / history.length) * 100)
              : 0}%
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('solved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'solved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            성공
          </button>
          <button
            onClick={() => setFilter('attempted')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'attempted'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            시도중
          </button>
        </div>
      </div>

      {/* 히스토리 리스트 */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = `/problems/${item.problemId}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  {item.status === 'solved' && (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  {item.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                item.difficulty === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                item.difficulty === 'Silver' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex gap-4">
                <span>{item.date}</span>
                {item.timeSpent && <span>소요 시간: {item.timeSpent}</span>}
                {item.language && <span>언어: {item.language}</span>}
              </div>
              {item.attempts && (
                <span className="text-gray-500">{item.attempts}번 시도</span>
              )}
            </div>

            {item.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">{item.notes}</p>
              </div>
            )}
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>풀이 기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
