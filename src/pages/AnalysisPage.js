import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../api';
import Loading from '../components/Loading';

const AnalysisPage = () => {
  const [stats, setStats] = useState(null);
  const [weakPoints, setWeakPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      const [statsData, weakPointsData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getWeakPoints()
      ]);
      setStats(statsData.data);
      setWeakPoints(weakPointsData.data);
    } catch (err) {
      console.error('분석 데이터 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="분석 데이터를 불러오는 중..." />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">내 분석</h1>
        <p className="text-gray-600">당신의 알고리즘 실력을 상세히 분석합니다</p>
      </div>

      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">총 해결 문제</div>
          <div className="text-3xl font-bold text-blue-600">{stats?.totalSolved || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">현재 티어</div>
          <div className="text-3xl font-bold text-yellow-600">{stats?.currentTier || stats?.averageTier || 'N/A'}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">연속 풀이</div>
          <div className="text-3xl font-bold text-green-600">{stats?.streak || stats?.currentStreak || 0}일</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">평균 정답률</div>
          <div className="text-3xl font-bold text-purple-600">{stats?.avgAccuracy || 0}%</div>
        </div>
      </div>

      {/* 난이도별 분포 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">난이도별 해결 문제</h2>
        <div className="space-y-4">
          {stats?.tierDistribution && (() => {
            const dist = Array.isArray(stats.tierDistribution)
              ? stats.tierDistribution
              : Object.entries(stats.tierDistribution).map(([tier, count]) => ({ tier, count }));
            const total = dist.reduce((a, b) => a + b.count, 0);
            return dist.map(({ tier, count }) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={tier}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{tier}</span>
                    <span className="text-sm text-gray-600">{count}문제 ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* 약점 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">약점 분석</h2>

        {weakPoints?.underrepresentedTags && weakPoints.underrepresentedTags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-red-600">부족한 알고리즘 유형</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {weakPoints.underrepresentedTags.map((tag, idx) => (
                <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-red-800">{tag.tag}</div>
                  <div className="text-xs text-red-600 mt-1">
                    해결: {tag.count}문제 ({tag.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {weakPoints?.difficultTiers && weakPoints.difficultTiers.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-600">어려워하는 난이도</h3>
            <div className="space-y-2">
              {weakPoints.difficultTiers.map((tier, idx) => (
                <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-orange-800">{tier.tier}</span>
                    <span className="text-sm text-orange-600">정답률: {tier.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {weakPoints?.inactivePeriods && weakPoints.inactivePeriods.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-600">활동이 적었던 기간</h3>
            <div className="space-y-2">
              {weakPoints.inactivePeriods.map((period, idx) => (
                <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-yellow-800">
                    {period.period}: {period.problemCount}문제
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 유형별 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">알고리즘 유형별 숙련도</h2>
        <div className="space-y-4">
          {stats?.tagDistribution && (() => {
            const dist = Array.isArray(stats.tagDistribution)
              ? stats.tagDistribution
              : Object.entries(stats.tagDistribution).map(([tag, count]) => ({ tag, count }));
            const total = dist.reduce((a, b) => a + b.count, 0);
            return dist
              .sort((a, b) => b.count - a.count)
              .slice(0, 10)
              .map(({ tag, count }) => {
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={tag}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{tag}</span>
                      <span className="text-sm text-gray-600">{count}문제 ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              });
          })()}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
