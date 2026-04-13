import React, { useState, useEffect } from 'react';
import { problemsApi } from '../api';
import Loading from '../components/Loading';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const response = await problemsApi.getRecommendations();
      setRecommendations(response.data);
    } catch (err) {
      setError('추천 문제를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="추천 문제를 불러오는 중..." />;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">오늘의 추천 문제</h1>
        <p className="text-gray-500 text-base">당신의 코딩 패턴을 분석한 맞춤형 문제입니다</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((problem) => (
          <div
            key={problem.id}
            className="bg-white border border-gray-200 rounded-xl p-7 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
            onClick={() => window.location.href = `/problems/${problem.id}`}
          >
            {/* 헤더: 제목 + 난이도 */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {problem.title}
              </h3>
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                problem.difficulty === 'Gold' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                problem.difficulty === 'Silver' ? 'bg-slate-50 text-slate-700 border border-slate-200' :
                problem.difficulty === 'Bronze' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {problem.difficulty}
              </span>
            </div>

            {/* 태그 */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {problem.tags?.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-md text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* 정보 */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
              <span className="font-medium">정답률 {problem.acceptanceRate}%</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-600">{problem.solvedCount}명</span>
              </span>
            </div>

            {/* 추천 이유 */}
            {problem.reason && (
              <div className="pt-5 border-t border-gray-100">
                <p className="text-sm text-blue-600 leading-relaxed flex items-start gap-2">
                  <span className="text-base flex-shrink-0">💡</span>
                  <span>{problem.reason}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-base">추천 문제가 없습니다.</p>
          <p className="text-sm mt-3">GitHub 커밋 히스토리를 분석하면 맞춤 문제를 추천받을 수 있습니다.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
