import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../api';

const SyncPage = () => {
  const { user } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncResult, setSyncResult] = useState(null);

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      // GitHub 분석 시작
      const result = await userApi.analyzeGithub();

      setLastSync(new Date().toLocaleString('ko-KR'));
      setSyncResult({
        success: true,
        stats: result
      });
    } catch (err) {
      console.error('동기화 실패:', err);
      setSyncResult({
        success: false,
        error: '동기화에 실패했습니다. 다시 시도해주세요.'
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">GitHub 동기화</h1>
        <p className="text-gray-600">GitHub 커밋 히스토리를 분석하여 맞춤 추천을 받으세요</p>
      </div>

      {/* 사용자 정보 카드 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.avatarUrl || 'https://via.placeholder.com/80'}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-600">@{user?.username || 'username'}</p>
          </div>
        </div>

        {lastSync && (
          <div className="text-sm text-gray-600">
            마지막 동기화: {lastSync}
          </div>
        )}
      </div>

      {/* 동기화 설명 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">동기화가 필요한 이유</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>GitHub 커밋 히스토리를 분석하여 자주 사용하는 알고리즘 패턴 파악</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>약점 분석 및 개선이 필요한 알고리즘 유형 도출</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>개인 맞춤형 문제 추천으로 효율적인 학습</span>
          </li>
        </ul>
      </div>

      {/* 동기화 버튼 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="text-center">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            {syncing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                분석 중... (최대 1분 소요)
              </span>
            ) : (
              '지금 동기화하기'
            )}
          </button>
          <p className="text-sm text-gray-600 mt-3">
            GitHub 레포지토리 접근 권한이 필요합니다
          </p>
        </div>
      </div>

      {/* 동기화 결과 */}
      {syncResult && (
        <div className={`rounded-lg p-6 ${
          syncResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {syncResult.success ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-green-900">동기화 완료!</h3>
              </div>
              <div className="text-green-800">
                <p className="mb-2">GitHub 분석이 완료되었습니다.</p>
                {syncResult.stats && (
                  <div className="mt-4 space-y-2">
                    <p>• 분석된 레포지토리: {syncResult.stats.repositoryCount || 0}개</p>
                    <p>• 분석된 커밋: {syncResult.stats.commitCount || 0}개</p>
                    <p>• 발견된 알고리즘 패턴: {syncResult.stats.patternCount || 0}개</p>
                  </div>
                )}
                <div className="mt-4">
                  <a href="/" className="text-green-700 underline hover:text-green-800">
                    대시보드로 가서 추천 문제 확인하기 →
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-red-900">동기화 실패</h3>
              </div>
              <p className="text-red-800">{syncResult.error}</p>
            </div>
          )}
        </div>
      )}

      {/* 안내 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">💡 Tip</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 정기적으로 동기화하여 최신 분석 결과를 받아보세요</li>
          <li>• 알고리즘 문제 풀이 레포지토리가 public이어야 분석이 가능합니다</li>
          <li>• 분석 시간은 레포지토리 크기에 따라 다를 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default SyncPage;
