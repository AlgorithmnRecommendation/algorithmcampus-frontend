import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api';
import Loading from '../components/Loading';
import { goToProblemUrl } from '../utils/problemUrl';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getHistoryTimestamp = (item) => {
    const dateValue = item.solvedAt || item.date || item.createdAt || item.updatedAt;
    const timestamp = new Date(dateValue).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const formatHistoryDate = (item) => {
    const dateValue = item.solvedAt || item.date || item.createdAt || item.updatedAt;
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue || '';

    return new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const sortedHistory = [...history].sort((a, b) => getHistoryTimestamp(b) - getHistoryTimestamp(a));

  if (loading) return <Loading message="풀이 기록을 불러오는 중..." />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">풀이 기록</h1>
        <p className="text-gray-600">당신의 알고리즘 문제 풀이 히스토리</p>
      </div>

      {/* 히스토리 리스트 */}
      <div className="space-y-4">
        {sortedHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => goToProblemUrl(item)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-sm text-gray-500">#{item.problemNumber || item.problemId || item.id}</span>
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
                (item.tier || item.difficulty || '').includes('Gold') ? 'bg-yellow-100 text-yellow-800' :
                (item.tier || item.difficulty || '').includes('Silver') ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item.tier || item.difficulty || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex gap-4">
                <span>{formatHistoryDate(item)}</span>
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

        {sortedHistory.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>풀이 기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
