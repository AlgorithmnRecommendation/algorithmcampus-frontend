import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onLogin }) => {
    // 스무스 스크롤 핸들러
    const handleScrollTo = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="landing">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="nav-inner">
                    <div className="nav-logo">
                        <div className="logo-icon">A</div>
                        <span><strong>Algorithm</strong>Campus</span>
                    </div>
                    <div className="nav-links">
                        <a href="#usage" onClick={(e) => handleScrollTo(e, 'usage')}>사용 방법</a>
                        <a href="#features" onClick={(e) => handleScrollTo(e, 'features')}>주요 기능</a>
                        <a href="#start" onClick={(e) => handleScrollTo(e, 'start')}>시작하기</a>
                    </div>
                    <div className="nav-actions">
                        <button className="btn-login" onClick={onLogin}>로그인</button>
                        <button className="btn-github-nav" onClick={onLogin}>
                            <GithubIcon />
                            GitHub로 시작하기
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero">
                <div className="hero-badge">✦ 딱 맞는 문제 추천 서비스</div>
                <h1 className="hero-title">
                    당신의 GitHub가<br />
                    <span className="hero-highlight">다음 문제</span>를<br />
                    알고 있습니다
                </h1>
                <p className="hero-subtitle">AI 기반 개인 맞춤형 알고리즘 문제 추천</p>
                <p className="hero-desc">
                    이미 쌓아온 GitHub 풀이 기록을 분석해,<br />
                    지금 당신에게 꼭 필요한 백준 문제를 추천해드립니다.<br />
                    적점 보완부터 나이도 상승까지, 체계적인 학습을 시작하세요.
                </p>
                <button className="btn-hero" onClick={onLogin}>
                    <GithubIcon />
                    GitHub로 무료 시작하기
                </button>
                <p className="hero-note">별도 회원가입 없이 GitHub 계정으로 바로 시작할 수 있습니다.</p>

                <div className="hero-tabs">
                    <span className="tab active">백준</span>
                    <span className="tab">프로그래머스 (예정)</span>
                    <span className="tab">LeetCode (예정)</span>
                </div>
            </section>

            {/* Stats */}
            <section className="stats">
                <div className="stats-inner">
                    <div className="stat-item">
                        <div className="stat-number">3만+</div>
                        <div className="stat-label">백준 문제 데이터베이스</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">5가지</div>
                        <div className="stat-label">분석 알고리즘</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">30초</div>
                        <div className="stat-label">GitHub 분석 소요 시간</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">무료</div>
                        <div className="stat-label">모든 기능 무료 제공</div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="how-it-works" id="usage">
                <div className="section-inner">
                    <p className="section-label">HOW IT WORKS</p>
                    <h2 className="section-title">딱 3단계로 시작하세요</h2>
                    <p className="section-desc">복잡한 설정 없이 GitHub 계정만 연동하면, 나머지는 AlgorithmCampus가 알아서 해줍니다.</p>

                    <div className="steps">
                        <div className="step-card">
                            <div className="step-icon"><GitBranchIcon /></div>
                            <span className="step-num">01</span>
                            <h3>GitHub 계정 연동</h3>
                            <p>GitHub 로그인 버튼 하나로 계정을 연동하면, 백준이나 프로그래머스와 연결된 알고리즘 풀이들을 자동으로 선별합니다.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon"><SearchIcon /></div>
                            <span className="step-num">02</span>
                            <h3>풀이 이력 자동 분석</h3>
                            <p>커밋 메시지, 풀더명, 파일명에서 문제 번호·분류·난이도·태그 나이도를 자동 추출해 학습 패턴을 분석합니다.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon"><StarIcon /></div>
                            <span className="step-num">03</span>
                            <h3>맞춤 문제 추천</h3>
                            <p>분석한 이력을 바탕으로 유사 문제, 약점 보완, 나이도 상승 등 나에게 딱 맞는 문제를 추천받습니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="core-features" id="features">
                <div className="section-inner">
                    <p className="section-label-light">CORE FEATURES</p>
                    <h2 className="section-title-light">
                        단순 추천을 넘어,<br />
                        <span className="highlight-blue">학습의 맥락</span>을 연결합니다
                    </h2>
                    <p className="section-desc-light">왜 이 문제인지 설명해주는 추천, 내 실력을 한눈에 보여주는 대시보드.</p>

                    <div className="features-grid">
                        <div className="feature-card dark-card">
                            <div className="feature-icon"><ChartIcon /></div>
                            <h3>추천 근거 설명</h3>
                            <p>문제를 추천할 때 "왜 이 문제인지" 명확하게 설명합니다. 추천 날짜 가이드로 방향성을 잡을 수 있습니다.</p>
                            <div className="feature-tags">
                                <span className="tag">최근 2주간 그래프 없음 부족</span>
                                <span className="tag">BFS 심화 예비</span>
                                <span className="tag">나이도 1단계 상승</span>
                            </div>
                        </div>
                        <div className="feature-card dark-card">
                            <div className="feature-icon"><BarChartIcon /></div>
                            <h3>풀이 이력 시각화</h3>
                            <p>풀이 알고리즘 분류, 나이도, 부족한 유형, 최근 풀이 추이, 나이도 분포를 한눈에 확인할 수 있는 대시보드.</p>
                        </div>
                        <div className="feature-card dark-card">
                            <div className="feature-icon"><BookmarkIcon /></div>
                            <h3>약점 보완 추천</h3>
                            <p>상대적으로 적게 푼 태그나, 자주 틀렸던 나이도를 기반으로 보완해 필요한 학습을 보완합니다.</p>
                        </div>
                        <div className="feature-card dark-card">
                            <div className="feature-icon"><BoltIcon /></div>
                            <h3>난이도 적응형 추천</h3>
                            <p>너무 쉬운 문제도, 너무 어려운 문제도 선반하다 — 전체 실력에 맞게 적절한 나이도 성장 곡선을 제공합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section" id="start">
                <div className="cta-inner">
                    <h2>지금 바로 분석을 시작하세요</h2>
                    <p>이미 GitHub에 쌓아온 풀이 기록이 있다면,<br />AlgorithmCampus가 당신의 다음 문제를 찾아드립니다.</p>
                    <button className="btn-cta" onClick={onLogin}>
                        <GithubIcon />
                        GitHub로 무료 시작하기
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-inner">
                    <div className="footer-logo">
                        <div className="logo-icon small">A</div>
                        <span><strong>Algorithm</strong>Campus</span>
                    </div>
                    <p className="footer-copy">© 2025 AlgorithmCampus. MVP — 백준 전용</p>
                    <div className="footer-links">
                        <button type="button" onClick={() => {}}>개인정보처리방침</button>
                        <button type="button" onClick={() => {}}>이용약관</button>
                        <button type="button" onClick={() => {}}>GitHub</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Icons
const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const GitBranchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

const ChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
);

const BarChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
);

const BookmarkIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
    </svg>
);

const BoltIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
);

export default LandingPage;