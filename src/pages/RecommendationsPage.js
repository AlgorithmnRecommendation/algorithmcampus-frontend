import React, { useState, useEffect } from 'react';
import { problemsApi } from '../api';
import Loading from '../components/Loading';
import { getProblemNumber, goToProblemUrl } from '../utils/problemUrl';

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

  const recommendationGroups = Array.from(
    recommendations.reduce((groups, problem) => {
      const type = problem.reason || problem.recommendationType || '추천';
      if (!groups.has(type)) groups.set(type, []);
      groups.get(type).push(problem);
      return groups;
    }, new Map())
  ).map(([type, problems]) => ({
    type,
    problems: problems.slice(0, 5)
  }));

  const getGroupId = (type) => `recommendation-${encodeURIComponent(type)}`;

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">오늘의 추천 문제</h1>
        <p className="text-gray-500 text-base">당신의 코딩 패턴을 분석한 맞춤형 문제입니다</p>
      </div>

      {recommendationGroups.length > 0 && (
        <div className="mb-8">
          <div className="text-sm font-semibold text-gray-700 mb-3">추천 태그</div>
          <div className="flex gap-2 flex-wrap">
            {recommendationGroups.map((group) => (
              <a
                key={group.type}
                href={`#${getGroupId(group.type)}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {group.type}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-10">
        {recommendationGroups.map((group) => (
          <section key={group.type} id={getGroupId(group.type)}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">{group.type}</h2>
              <p className="text-sm text-gray-500 mt-1">대표 추천 문제 5개</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.problems.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-white border border-gray-200 rounded-xl p-7 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => goToProblemUrl(problem)}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <span className="text-sm text-gray-400 whitespace-nowrap">#{getProblemNumber(problem)}</span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                      problem.difficulty === 'Gold' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      problem.difficulty === 'Silver' ? 'bg-slate-50 text-slate-700 border border-slate-200' :
                      problem.difficulty === 'Bronze' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-5 flex-wrap">
                    {problem.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 mb-5">
                    <span className="font-medium">정답률 {problem.acceptanceRate}%</span>
                  </div>

                  <div className="pt-5 border-t border-gray-100">
                    <p className="text-sm text-blue-600 leading-relaxed flex items-start gap-2">
                      <span className="text-base flex-shrink-0">💡</span>
                      <span>{group.type}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
