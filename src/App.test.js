import { getProblemUrl } from './utils/problemUrl';

test('builds external Baekjoon problem URLs', () => {
  expect(getProblemUrl({ problemNumber: 1916 })).toBe('https://www.acmicpc.net/problem/1916');
  expect(getProblemUrl({ title: '#7576 토마토' })).toBe('https://www.acmicpc.net/problem/7576');
});
