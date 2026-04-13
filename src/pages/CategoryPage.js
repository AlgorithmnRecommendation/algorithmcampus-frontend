import React, { useState } from 'react';

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'dp', name: '다이나믹 프로그래밍', count: 45, color: 'blue' },
    { id: 'graph', name: '그래프', count: 38, color: 'green' },
    { id: 'greedy', name: '그리디', count: 32, color: 'yellow' },
    { id: 'implementation', name: '구현', count: 56, color: 'purple' },
    { id: 'math', name: '수학', count: 28, color: 'red' },
    { id: 'string', name: '문자열', count: 24, color: 'indigo' },
    { id: 'tree', name: '트리', count: 19, color: 'pink' },
    { id: 'binary-search', name: '이진 탐색', count: 15, color: 'orange' },
    { id: 'bfs-dfs', name: 'BFS/DFS', count: 42, color: 'teal' },
    { id: 'sorting', name: '정렬', count: 21, color: 'cyan' },
    { id: 'backtracking', name: '백트래킹', count: 17, color: 'lime' },
    { id: 'two-pointer', name: '투 포인터', count: 13, color: 'amber' }
  ];

  const mockProblems = {
    dp: [
      { id: 1, title: '피보나치 수', difficulty: 'Silver', solved: true },
      { id: 2, title: '계단 오르기', difficulty: 'Silver', solved: false },
      { id: 3, title: '배낭 문제', difficulty: 'Gold', solved: false }
    ],
    graph: [
      { id: 4, title: '미로 탐색', difficulty: 'Silver', solved: true },
      { id: 5, title: '최단 경로', difficulty: 'Gold', solved: false }
    ]
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      green: 'bg-green-100 text-green-800 hover:bg-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      red: 'bg-red-100 text-red-800 hover:bg-red-200',
      indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      pink: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      teal: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
      cyan: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
      lime: 'bg-lime-100 text-lime-800 hover:bg-lime-200',
      amber: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">유형별 문제</h1>
        <p className="text-gray-600">알고리즘 유형별로 문제를 찾아보세요</p>
      </div>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-lg shadow-md transition-all ${getColorClasses(category.color)} ${
              selectedCategory === category.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
          >
            <div className="text-lg font-semibold mb-1">{category.name}</div>
            <div className="text-sm opacity-80">{category.count}문제</div>
          </button>
        ))}
      </div>

      {/* 선택된 카테고리의 문제 목록 */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {categories.find(c => c.id === selectedCategory)?.name} 문제
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              닫기 ✕
            </button>
          </div>

          <div className="space-y-3">
            {(mockProblems[selectedCategory] || []).map((problem) => (
              <div
                key={problem.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => window.location.href = `/problems/${problem.id}`}
              >
                <div className="flex items-center gap-3">
                  {problem.solved && (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{problem.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    problem.difficulty === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    problem.difficulty === 'Silver' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}

            {(!mockProblems[selectedCategory] || mockProblems[selectedCategory].length === 0) && (
              <div className="text-center py-8 text-gray-500">
                이 유형의 문제가 아직 없습니다
              </div>
            )}
          </div>
        </div>
      )}

      {!selectedCategory && (
        <div className="text-center py-12 text-gray-500">
          <p>위에서 유형을 선택하여 문제를 확인하세요</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
