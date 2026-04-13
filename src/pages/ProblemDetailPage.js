import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { problemsApi } from '../api';
import Loading from '../components/Loading';

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); // description, solution, discussion

  useEffect(() => {
    loadProblem();
  }, [id]);

  const loadProblem = async () => {
    try {
      setLoading(true);
      const data = await problemsApi.getProblem(id);
      setProblem(data);
      setBookmarked(data.isBookmarked || false);
    } catch (err) {
      console.error('문제 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await problemsApi.unbookmarkProblem(id);
        setBookmarked(false);
      } else {
        await problemsApi.bookmarkProblem(id);
        setBookmarked(true);
      }
    } catch (err) {
      console.error('북마크 처리 실패:', err);
    }
  };

  if (loading) return <Loading message="문제를 불러오는 중..." />;
  if (!problem) return <div className="p-8 text-red-600">문제를 찾을 수 없습니다</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{problem.title}</h1>
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                problem.difficulty === 'Platinum' ? 'bg-cyan-100 text-cyan-800' :
                problem.difficulty === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                problem.difficulty === 'Silver' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>#{problem.id}</span>
              <span>•</span>
              <span className="capitalize">{problem.platform}</span>
              <span>•</span>
              <span>정답률: {problem.acceptanceRate}%</span>
              <span>•</span>
              <span>{problem.solvedCount}명이 해결</span>
            </div>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-3 rounded-lg transition-colors ${
              bookmarked
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={bookmarked ? '북마크 해제' : '북마크 추가'}
          >
            <svg className="w-6 h-6" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* 태그 */}
        <div className="flex gap-2 flex-wrap">
          {problem.tags?.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'description'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            문제 설명
          </button>
          <button
            onClick={() => setActiveTab('solution')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'solution'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            풀이 접근
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'discussion'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            토론
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">문제 설명</h2>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {problem.description || '문제 설명이 곧 업데이트됩니다.'}
              </div>

              {problem.inputFormat && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">입력</h3>
                  <p className="text-gray-700">{problem.inputFormat}</p>
                </div>
              )}

              {problem.outputFormat && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">출력</h3>
                  <p className="text-gray-700">{problem.outputFormat}</p>
                </div>
              )}

              {problem.examples && problem.examples.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">예제</h3>
                  {problem.examples.map((example, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">입력 {idx + 1}</div>
                          <pre className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                            {example.input}
                          </pre>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">출력 {idx + 1}</div>
                          <pre className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                            {example.output}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'solution' && (
            <div>
              <h2 className="text-xl font-bold mb-4">풀이 접근법</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 힌트</h3>
                  <p className="text-blue-800">
                    {problem.hint || '이 문제는 ' + (problem.tags?.[0] || '알고리즘') + ' 유형입니다. 해당 알고리즘의 기본 개념을 복습해보세요.'}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✓ 접근 방법</h3>
                  <ol className="list-decimal list-inside space-y-2 text-green-800">
                    <li>문제의 입출력 형식을 정확히 파악하기</li>
                    <li>적용할 수 있는 알고리즘/자료구조 고민하기</li>
                    <li>시간 복잡도가 제한 내에 들어오는지 확인하기</li>
                    <li>예제 입력으로 검증하며 구현하기</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 주의사항</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-800">
                    <li>엣지 케이스 (최소값, 최대값) 확인</li>
                    <li>자료형 범위 체크 (오버플로우)</li>
                    <li>입력 형식 정확히 맞추기</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div>
              <h2 className="text-xl font-bold mb-4">토론</h2>
              <div className="text-center py-12 text-gray-500">
                <p>토론 기능은 곧 추가될 예정입니다</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4">
          <a
            href={problem.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            문제 풀러 가기 →
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
