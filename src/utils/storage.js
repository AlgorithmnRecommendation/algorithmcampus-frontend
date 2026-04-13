// localStorage 유틸리티 함수

export const storage = {
  // 토큰 관리
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // 사용자 정보 관리
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  // 전체 삭제
  clear: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};