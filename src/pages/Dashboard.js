import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardApi, problemsApi } from '../api';
import Loading from '../components/Loading';
import './Dashboard.css';

const Dashboard = ({ onLogout, children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('전체');
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    // 검색 핸들러
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

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
        { rank: 1, title: '최단경로', num: '#1753', tier: 'Gold IV', tags: ['다익스트라', '최단경로'], reason: '최근 그래프 풀이 이후 다익스트라와 다익스트라 중심부 학습 — 이 내용으로 실력 높이는 단계', category: '유사 문제' },
        { rank: 2, title: '계단 오르기', num: '#2579', tier: 'Silver III', tags: ['DP'], reason: 'DP 파트 2 풀이 수가 전체 평균 대비 낮아 나이도 상승 추천', category: '나이도 상승' },
        { rank: 3, title: '단지번호붙이기', num: '#2667', tier: 'Silver I', tags: ['BFS', '그래프'], reason: '최근 2번 연속 #7576의 완료된 BFS 패턴 — 동일 문제', category: '유사 문제' },
        { rank: 4, title: 'LCS', num: '#9251', tier: 'Gold V', tags: ['DP', '문자열'], reason: '나이도 점화 기준으로 Gold 가진 분들의 다음 단계 추천', category: '나이도 상승' },
        { rank: 5, title: '스택 수열', num: '#1874', tier: 'Silver II', tags: ['스택', '자료구조'], reason: '자료구조 태그 수가 상당히 낮은 상황에서 적합 나이도 — 학습 추천', category: '약점 보완' },
        { rank: 6, title: '트리 순회', num: '#1991', tier: 'Silver I', tags: ['트리', '재귀'], reason: '트리 구조 이해를 위한 기초 문제', category: '약점 보완' },
        { rank: 7, title: '이분 탐색', num: '#1920', tier: 'Silver IV', tags: ['이분탐색'], reason: '이분 탐색 기초 학습', category: '약점 보완' },
    ];

    const recentProblems = [
        { title: '#7576 토마토', tier: 'Gold V', tags: ['BFS'], lang: 'Python', time: '2시간 전' },
        { title: '#11724 연결 요소의 개수', tier: 'Silver II', tags: ['그래프'], lang: 'Python', time: '어제' },
        { title: '#1260 DFS와 BFS', tier: 'Silver II', tags: ['DFS', 'BFS'], lang: 'Java', time: '2일 전' },
        { title: '#2178 미로 탐색', tier: 'Silver I', tags: ['BFS'], lang: 'Python', time: '3일 전' },
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

    const difficultyDist = [
        { name: 'Bronze', count: 99, color: '#CD7F32' },
        { name: 'Silver', count: 74, color: '#9CA3AF' },
        { name: 'Gold', count: 49, color: '#F59E0B' },
        { name: 'Platinum+', count: 25, color: '#A78BFA' },
    ];

    const tabs = ['전체', '유사 문제', '약점 보완', '나이도 상승'];

    const getTierColor = (tier) => {
        if (tier.includes('Gold')) return '#F59E0B';
        if (tier.includes('Silver')) return '#9CA3AF';
        if (tier.includes('Platinum')) return '#A78BFA';
        return '#CD7F32';
    };

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
                <div className="sidebar-section-label">문제 탐색</div>
                <nav className="sidebar-nav">
                    <Link to="/search" className={`sidebar-item ${location.pathname === '/search' ? 'active' : ''}`}>
                        <SearchIcon />문제 검색
                    </Link>
                    <Link to="/categories" className={`sidebar-item ${location.pathname === '/categories' ? 'active' : ''}`}>
                        <ListIcon />유형별 보기
                    </Link>
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
                        <form onSubmit={handleSearch} className="search-bar">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="문제 번호, 태그 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
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
                        <form onSubmit={handleSearch} className="search-bar">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="문제 번호, 태그 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
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
                            <div className="banner-stat gold">
                                <div className="b-num">{dashboardStats?.averageTier || 'N/A'}</div>
                                <div className="b-label">현재 레벨</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metric cards */}
                <div className="metrics">
                    <div className="metric-card">
                        <div className="metric-header">
                            <PulseIcon />
                            <span className="metric-change positive">▲ +3</span>
                        </div>
                        <div className="metric-num">23</div>
                        <div className="metric-label">이번 달 풀이 수</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-header">
                            <CheckIcon />
                            <span className="metric-change positive">▲ 5%</span>
                        </div>
                        <div className="metric-num">91%</div>
                        <div className="metric-label">정답률</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-header">
                            <AlertIcon />
                            <span className="metric-change negative">▼ 2</span>
                        </div>
                        <div className="metric-num">7</div>
                        <div className="metric-label">부족 유형 수</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-header">
                            <TimerIcon />
                            <span className="metric-change negative">▼ 2일</span>
                        </div>
                        <div className="metric-num">14일</div>
                        <div className="metric-label">현재 스트릭</div>
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
                        <div className="filter-tabs">
                            {tabs.map(t => (
                                <button key={t} className={`filter-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="problem-list">
                            {(recommendations.length > 0 ? recommendations : recommendedProblems)
                                .filter(p => activeTab === '전체' || p.category === activeTab)
                                .slice(0, 5)
                                .map((p, i) => (
                                <div className="problem-item" key={i}>
                                    <div className="prob-rank">{i + 1}</div>
                                    <div className="prob-main">
                                        <div className="prob-title-row">
                                            <span className="prob-title">{p.title}</span>
                                            <span className="prob-num">#{p.problemNumber || p.num}</span>
                                            <span className="prob-tier" style={{ color: getTierColor(p.tier) }}>{p.tier}</span>
                                            {(p.tags || []).map(tag => <span key={tag} className="prob-tag">{tag}</span>)}
                                        </div>
                                        <div className="prob-reason">{p.description || p.reason}</div>
                                    </div>
                                    <button
                                        className="prob-arrow"
                                        onClick={() => navigate(`/problems/${p.id || i + 1}`)}
                                    >›</button>
                                </div>
                            ))}
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

                {/* Bottom two col */}
                <div className="two-col">
                    {/* Streak */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <div className="card-title">🔥 풀이 스트릭</div>
                                <div className="card-sub">최근 1년 기록</div>
                            </div>
                        </div>
                        <div className="streak-info">
                            <span className="streak-fire">🔥</span>
                            <span className="streak-num">14</span>
                            <span className="streak-label">일 연속 풀이 중!</span>
                            <span className="streak-best">최장 스트릭 22일</span>
                        </div>
                        <div className="streak-grid">
                            {Array.from({ length: 182 }).map((_, i) => {
                                const intensity = Math.random();
                                const cls = intensity > 0.85 ? 'day-4' : intensity > 0.7 ? 'day-3' : intensity > 0.5 ? 'day-2' : intensity > 0.3 ? 'day-1' : 'day-0';
                                return <div key={i} className={`streak-day ${cls}`}></div>;
                            })}
                        </div>
                    </div>

                    {/* Difficulty distribution */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <div className="card-title">📊 난이도 분포</div>
                                <div className="card-sub">총 247문제</div>
                            </div>
                        </div>
                        <div className="diff-chart">
                            <div className="diff-bars">
                                {difficultyDist.map((d, i) => (
                                    <div key={i} className="diff-bar-item">
                                        <div className="diff-bar" style={{ height: `${(d.count / 99) * 80}px`, background: d.color }}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="diff-legend">
                                {difficultyDist.map((d, i) => (
                                    <div key={i} className="diff-legend-item">
                                        <div className="diff-dot" style={{ background: d.color }}></div>
                                        <span className="diff-name">{d.name}</span>
                                        <span className="diff-count">{d.count}</span>
                                    </div>
                                ))}
                            </div>
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
                                onClick={() => navigate(`/problems/${i + 100}`)}
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
const SearchIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ListIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const GitIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>;
const ClockIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const BookmarkIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>;
const PulseIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const AlertIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>;
const TimerIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const RefreshIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;
const CheckSmIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;

export default Dashboard;