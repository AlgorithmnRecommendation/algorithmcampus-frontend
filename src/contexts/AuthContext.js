import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 초기 로드: localStorage에서 토큰 확인
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);

          // 선택사항: 서버에 토큰 유효성 검증
          // const response = await authApi.getCurrentUser();
          // setUser(response.data);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // GitHub 로그인 시작
  const loginWithGithub = async () => {
    try {
      const response = await authApi.getGithubLoginUrl();
      // GitHub OAuth 페이지로 리다이렉트
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // GitHub OAuth 콜백 처리
  const handleGithubCallback = async (code) => {
    try {
      const response = await authApi.handleGithubCallback(code);
      const { token, user: userData } = response.data;

      // 토큰과 사용자 정보 저장
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error) {
      console.error('GitHub callback failed:', error);
      throw error;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // 로컬 상태 초기화
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Mock 로그인 (개발용)
  const mockLogin = () => {
    const mockUser = {
      id: 1,
      githubId: "mock_user",
      username: "김알고리즘",
      avatarUrl: "https://via.placeholder.com/150",
      email: "user@example.com"
    };
    const mockToken = 'mock_jwt_token_' + Date.now();

    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    loginWithGithub,
    handleGithubCallback,
    logout,
    mockLogin, // 개발용
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;