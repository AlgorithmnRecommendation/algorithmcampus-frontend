const BAEKJOON_PROBLEM_URL = 'https://www.acmicpc.net/problem';

export const getProblemNumber = (problem) => {
  if (!problem) return null;

  const rawNumber =
    problem.problemNumber ??
    problem.problemId ??
    problem.number ??
    problem.num ??
    problem.id;

  if (rawNumber) {
    const number = String(rawNumber).match(/\d+/)?.[0];
    if (number) return number;
  }

  return String(problem.title || '').match(/#(\d+)/)?.[1] || null;
};

export const getProblemUrl = (problem) => {
  if (problem?.url) return problem.url;

  const problemNumber = getProblemNumber(problem);
  return problemNumber ? `${BAEKJOON_PROBLEM_URL}/${problemNumber}` : BAEKJOON_PROBLEM_URL;
};

export const goToProblemUrl = (problem) => {
  window.location.href = getProblemUrl(problem);
};
