import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardApi, problemsApi } from '../api';
import Loading from '../components/Loading';
import { getProblemNumber, goToProblemUrl } from '../utils/problemUrl';
import './Dashboard.css';

const Dashboard = ({ onLogout, children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    // 데이터 로드 (대시보드 메인 페이지에서만)
    useEffect(() => {
        if (location.pathname === '/dashboard') {
            const loadData = async () => {
                try {
                    setLoading(true);
                    // API 호출 - Mock 또는 Real API가 자동으로 선택됨
                    const [statsRes, recsRes] = await Promise.all([
                        dashboardApi.getStats(),
                        problemsApi.getRecommendations()
                    ]);

                    setDashboardStats(statsRes.data);
                    setRecommendations(recsRes.data);
                } catch (error) {
                    console.error('데이터 로드 실패:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadData();
        } else {
            setLoading(false);
        }
    }, [location.pathname]);

    // 새로고침 핸들러
    const handleRefresh = async () => {
        if (location.pathname === '/dashboard') {
            setLoading(true);
            try {
                const [statsRes, recsRes] = await Promise.all([
                    dashboardApi.getStats(),
                    problemsApi.getRecommendations()
                ]);
                setDashboardStats(statsRes.data);
                setRecommendations(recsRes.data);
            } catch (error) {
                console.error('새로고침 실패:', error);
            } finally {
                setLoading(false);
            }
        } else {
            window.location.reload();
        }
    };

    // children이 있으면 항상 렌더링 (서브 페이지)
    const showDashboardMain = !children && location.pathname === '/dashboard';

    if (loading && showDashboardMain) {
        return <Loading message="대시보드 로딩 중..." />;
    }

    const recommendedProblems = [
        { rank: 1, title: '최단경로', num: '#1753', tier: 'Gold IV', tags: ['다익스트라', '최단경로'], reason: '최근 그래프 풀이 이후 다익스트라와 다익스트라 중심부 학습 - 이 내용으로 실력 높이는 단계', category: '유사 문제' },
        { rank: 2, title: '계단 오르기', num: '#2579', tier: 'Silver III', tags: ['DP'], reason: 'DP 파트 2 풀이 수가 전체 평균 대비 낮아 난이도 상승 추천', category: '난이도 상승' },
        { rank: 3, title: '단지번호붙이기', num: '#2667', tier: 'Silver I', tags: ['BFS', '그래프'], reason: '최근 2번 연속 #7576의 완료된 BFS 패턴 - 동일 문제', category: '유사 문제' },
        { rank: 4, title: 'LCS', num: '#9251', tier: 'Gold V', tags: ['DP', '문자열'], reason: '난이도 점화 기준으로 Gold 가진 분들의 다음 단계 추천', category: '난이도 상승' },
        { rank: 5, title: '스택 수열', num: '#1874', tier: 'Silver II', tags: ['스택', '자료구조'], reason: '자료구조 태그 수가 상당히 낮은 상황에서 적합 난이도 - 학습 추천', category: '약점 보완' },
        { rank: 6, title: '트리 순회', num: '#1991', tier: 'Silver I', tags: ['트리', '재귀'], reason: '트리 구조 이해를 위한 기초 문제', category: '약점 보완' },
        { rank: 7, title: '이분 탐색', num: '#1920', tier: 'Silver IV', tags: ['이분탐색'], reason: '이분 탐색 기초 학습', category: '약점 보완' },
    ];

    const recentProblems = [
        { problemNumber: 7576, title: '#7576 토마토', tier: 'Gold V', tags: ['BFS'], lang: 'Python', time: '2시간 전' },
        { problemNumber: 11724, title: '#11724 연결 요소의 개수', tier: 'Silver II', tags: ['그래프'], lang: 'Python', time: '어제' },
        { problemNumber: 1260, title: '#1260 DFS와 BFS', tier: 'Silver II', tags: ['DFS', 'BFS'], lang: 'Java', time: '2일 전' },
        { problemNumber: 2178, title: '#2178 미로 탐색', tier: 'Silver I', tags: ['BFS'], lang: 'Python', time: '3일 전' },
    ];

    const typeAnalysis = [
        { name: 'BFS/DFS', count: 61, color: '#3B82F6', width: 95, status: 'good' },
        { name: '그리디', count: 43, color: '#3B82F6', width: 70, status: 'good' },
        { name: '구현', count: 37, color: '#3B82F6', width: 60, status: 'good' },
        { name: 'DP', count: 22, color: '#F97316', width: 36, status: 'warn' },
        { name: '이분탐색', count: 14, color: '#EF4444', width: 22, status: 'danger' },
        { name: '최단경로', count: 10, color: '#EF4444', width: 16, status: 'danger' },
        { name: '트리/그래프', count: 9, color: '#EF4444', width: 14, status: 'danger' },
    ];

    const getTierLabel = (problem) => {
        if (problem.tier) return problem.tier;
        if (typeof problem.difficulty === 'string') return problem.difficulty;
        return '';
    };

    const getTierColor = (tier = '') => {
        const tierLabel = String(tier);
        if (tierLabel.includes('Gold')) return '#F59E0B';
        if (tierLabel.includes('Silver')) return '#9CA3AF';
        if (tierLabel.includes('Platinum')) return '#A78BFA';
        return '#CD7F32';
    };

    const getRecommendationType = (problem) => (
        problem.category ||
        problem.recommendationType ||
        problem.reason ||
        '추천'
    );

    const recommendationSource = recommendations.length > 0 ? recommendations : recommendedProblems;
    const representativeRecommendations = Array.from(
        recommendationSource.reduce((byType, problem) => {
            const type = getRecommendationType(problem);
            if (!byType.has(type)) byType.set(type, problem);
            return byType;
        }, new Map()).entries()
    ).map(([type, problem], index) => ({ ...problem, recommendationType: type, displayRank: problem.rank || index + 1 }));

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">A</div>
                    <span><strong>Algorithm</strong>Campus</span>
                </div>
                <div className="sidebar-section-label">메인</div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <DashboardIcon />대시보드
                    </Link>
                    <Link to="/recommendations" className={`sidebar-item ${location.pathname === '/recommendations' ? 'active' : ''}`}>
                        <BellIcon />오늘의 추천 <span className="badge">3</span>
                    </Link>
                    <Link to="/analysis" className={`sidebar-item ${location.pathname === '/analysis' ? 'active' : ''}`}>
                        <UserIcon />내 분석
                    </Link>
                </nav>
                <div className="sidebar-section-label">연동</div>
                <nav className="sidebar-nav">
                    <Link to="/sync" className={`sidebar-item ${location.pathname === '/sync' ? 'active' : ''}`}>
                        <GitIcon />GitHub 동기화
                    </Link>
                </nav>
                <div className="sidebar-section-label">기록</div>
                <nav className="sidebar-nav">
                    <Link to="/history" className={`sidebar-item ${location.pathname === '/history' ? 'active' : ''}`}>
                        <ClockIcon />풀이 기록
                    </Link>
                    <Link to="/bookmarks" className={`sidebar-item ${location.pathname === '/bookmarks' ? 'active' : ''}`}>
                        <BookmarkIcon />북마크
                    </Link>
                </nav>
                <div className="sidebar-bottom">
                    <div className="sidebar-user">
                        <div className="user-avatar">{user?.username?.substring(0, 2).toUpperCase() || 'U'}</div>
                        <div>
                            <div className="user-name">{user?.username || '사용자'}</div>
                            <div className="user-handle">@{user?.githubId || 'user'}</div>
                        </div>
                        <button className="user-menu" onClick={onLogout}>⋯</button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="main-content">
                {/* 서브 페이지가 있으면 children 렌더링 */}
                {children ? (
                    <>
                        <div className="topbar">
                    <div>
                        <div className="topbar-greeting-sub">대시보드 🌟</div>
                        <div className="topbar-greeting">오늘도 한 문제씩 성장하세요</div>
                    </div>
                    <div className="topbar-right">
                        <button className="icon-btn" onClick={handleRefresh}><RefreshIcon /></button>
                        <div className="user-avatar-top">{user?.username?.substring(0, 2).toUpperCase() || 'U'}</div>
                    </div>
                </div>
                        {children}
                    </>
                ) : (
                    <>
                        <div className="topbar">
                    <div>
                        <div className="topbar-greeting-sub">대시보드 🌟</div>
                        <div className="topbar-greeting">오늘도 한 문제씩 성장하세요</div>
                    </div>
                    <div className="topbar-right">
                        <button className="icon-btn" onClick={handleRefresh}><RefreshIcon /></button>
                        <div className="user-avatar-top">{user?.username?.substring(0, 2).toUpperCase() || 'U'}</div>
                    </div>
                </div>

                {/* Banner */}
                <div className="banner">
                    <div className="banner-content">
                        <div className="banner-text">
                            <div className="banner-title">총 {dashboardStats?.totalSolved || 0}문제를 풀었군요! 🎉</div>
                            <div className="banner-desc">이번 주 {dashboardStats?.solvedThisWeek || 0}문제를 풀이 완료. BFS / DFS 유형이 가장 많습니다.<br />오늘의 추천 문제 {recommendations?.length || 0}개가 준비되었습니다.</div>
                        </div>
                        <div className="banner-stats">
                            <div className="banner-stat">
                                <div className="b-num">{dashboardStats?.totalSolved || 0}</div>
                                <div className="b-label">총 풀이 수</div>
                            </div>
                            <div className="banner-stat">
                                <div className="b-num">{dashboardStats?.currentStreak || 0}</div>
                                <div className="b-label">연속 스트릭</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two column */}
                <div className="two-col">
                    {/* Today's recommendations */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <div className="card-title">🔥 오늘의 추천 문제</div>
                                <div className="card-sub">GitHub 풀이 기반 맞춤 추천</div>
                            </div>
                            <Link to="/recommendations" className="link-btn">전체 보기</Link>
                        </div>
                        <div className="filter-tabs single">
                            <span className="filter-tab active">전체</span>
                        </div>
                        <div className="problem-list">
                            {representativeRecommendations.slice(0, 5).map((p, i) => {
                                const tier = getTierLabel(p);
                                return (
                                <div className="problem-item" key={`${p.recommendationType}-${getProblemNumber(p) || i}`} onClick={() => goToProblemUrl(p)}>
                                    <div className="prob-rank">{i + 1}</div>
                                    <div className="prob-main">
                                        <div className="prob-title-row">
                                            <span className="prob-title">{p.title}</span>
                                            <span className="prob-num">#{getProblemNumber(p)}</span>
                                            {tier && <span className="prob-tier" style={{ color: getTierColor(tier) }}>{tier}</span>}
                                            <span className="prob-tag type">{p.recommendationType}</span>
                                            {(p.tags || []).map(tag => <span key={tag} className="prob-tag">{tag}</span>)}
                                        </div>
                                        <div className="prob-reason">{p.description || p.reason}</div>
                                    </div>
                                    <button className="prob-arrow" type="button">›</button>
                                </div>
                            );})}
                        </div>
                    </div>

                    {/* Type analysis */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <div className="card-title">유형별 분석</div>
                                <div className="card-sub">풀이 유형 기반 분석 결과</div>
                            </div>
                            <Link to="/analysis" className="link-btn">세세 보기</Link>
                        </div>
                        <div className="type-list">
                            {typeAnalysis.map((t, i) => (
                                <div className="type-item" key={i}>
                                    <div className="type-name">{t.name}</div>
                                    <div className="type-bar-wrap">
                                        <div className="type-bar" style={{ width: `${t.width}%`, background: t.color }}></div>
                                    </div>
                                    <div className="type-count">{t.count}개</div>
                                    <span className={`type-status ${t.status}`}>{t.status === 'good' ? '충분' : t.status === 'warn' ? '부족' : '부족'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent problems */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">📝 최근 풀이 기록</div>
                            <div className="card-sub">GitHub 저장 기록 자동 수집</div>
                        </div>
                        <Link to="/history" className="link-btn">전체 보기</Link>
                    </div>
                    <div className="recent-list">
                        {recentProblems.map((p, i) => (
                            <div
                                className="recent-item"
                                key={i}
                                onClick={() => goToProblemUrl(p)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="recent-check" style={{ borderColor: p.tier.includes('Gold') ? '#F59E0B' : '#9CA3AF' }}>
                                    <CheckSmIcon />
                                </div>
                                <div className="recent-main">
                                    <span className="recent-title">{p.title}</span>
                                    <span className="recent-tier" style={{ color: getTierColor(p.tier) }}>{p.tier}</span>
                                    {p.tags.map(tag => <span key={tag} className="prob-tag">{tag}</span>)}
                                    <span className="prob-tag lang">{p.lang}</span>
                                    <span className="prob-tag">백준</span>
                                </div>
                                <div className="recent-time">{p.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
                    </>
                )}
            </main>
        </div>
    );
};

// Icons
const DashboardIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const BellIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>;
const UserIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const GitIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>;
const ClockIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const BookmarkIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>;
const RefreshIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;
const CheckSmIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;

export default Dashboard;
