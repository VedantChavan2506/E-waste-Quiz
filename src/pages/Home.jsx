import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Info, ChevronRight, AlertTriangle, Zap, Recycle, Shield } from 'lucide-react';
import { cityStatusData } from '../data/locations';

export default function Home({ onStart, gameState, navigate }) {
  const [playerName, setPlayerName] = useState(gameState.playerName || '');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [nameError, setNameError] = useState('');
  const [crtClicks, setCrtClicks] = useState(0);

  const handleStart = () => {
    const name = playerName.trim() || 'Officer';
    onStart(name);
  };

  const handleCrtClick = () => {
    const next = crtClicks + 1;
    setCrtClicks(next);
    if (next >= 5) {
      // Easter egg trigger handled in parent via addEasterEgg
      window.dispatchEvent(new CustomEvent('easter-egg', { detail: 'crt-secret' }));
    }
  };

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '6rem', paddingBottom: '4rem' }}>
        {/* Background City SVG */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '280px', opacity: 0.4 }}>
          <CityBackground />
        </div>

        {/* Grid overlay */}
        <div className="grid-bg" style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Status row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div className="status-dot status-dot-green" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent-green)', letterSpacing: '0.15em' }}>
              NOVA CITY E-WASTE RESPONSE CENTER — ONLINE
            </span>
          </div>

          {/* Main Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem',
            }}>
              E-WASTE
            </h1>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
              fontWeight: 400,
              color: 'var(--accent-green)',
              letterSpacing: '0.3em',
              marginBottom: '1.5rem',
            }}>
              THE LAST DEVICE
            </div>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}>
              Every device has a second life.<br />
              <em style={{ color: 'var(--text-primary)', fontStyle: 'normal' }}>Your decisions determine what happens next.</em>
            </p>
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            marginBottom: '2.5rem',
          }}>
            YOUR DEVICE. YOUR DECISION. OUR PLANET.
          </div>

          {/* Name input + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                OFFICER NAME (optional)
              </label>
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name..."
                maxLength={30}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.625rem 1rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-green)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-card)'}
              />
            </div>

            {gameState.gameStarted && !gameState.gameCompleted ? (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('map')} style={{ flex: 1 }}>
                  <Play size={16} />
                  CONTINUE MISSION
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={handleStart} id="start-investigation-btn">
                <Play size={16} />
                START INVESTIGATION
              </button>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={() => setShowHowItWorks(!showHowItWorks)} style={{ flex: 1, minWidth: '130px' }}>
                <Info size={14} />
                HOW IT WORKS
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('admin')} style={{ flex: 1, minWidth: '130px', borderColor: 'rgba(0,180,216,0.3)', color: 'var(--accent-blue)' }} id="home-admin-login-btn">
                <Shield size={14} />
                ADMIN LOGIN
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('learn')} style={{ flex: 1, minWidth: '130px' }}>
                <BookOpen size={14} />
                ABOUT E-WASTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* City Status Panel */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            maxWidth: '720px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div className="status-dot status-dot-red" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>
                NOVA CITY — LIVE STATUS
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { label: 'Electronic Waste', value: 'CRITICAL', color: 'var(--accent-red)', icon: AlertTriangle },
                { label: 'Recycling Rate', value: '42%', color: 'var(--accent-amber)', icon: Recycle },
                { label: 'Hazard Level', value: 'HIGH', color: 'var(--accent-red)', icon: Zap },
                { label: 'Recovery Potential', value: '78%', color: 'var(--accent-green)', icon: Shield },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                      <Icon size={12} color={item.color} />
                      <span className="data-label">{item.label}</span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: item.color,
                    }}>
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Admin Link */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('admin')}
            style={{ fontSize: '0.7rem', color: 'var(--text-muted)', gap: '4px' }}
            id="home-admin-footer-btn"
          >
            🔒 ADMIN CONTROL CENTER (/admin)
          </button>
        </div>
      </section>

      {/* How It Works */}
      {showHowItWorks && (
        <section style={{ padding: '0 0 3rem' }}>
          <div className="container">
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '720px',
            }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent-green)' }}>
                HOW IT WORKS
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { step: '01', text: 'Receive your mission briefing as a Nova City E-Waste Response Officer.' },
                  { step: '02', text: 'Navigate the interactive city map and unlock locations.' },
                  { step: '03', text: 'Inspect electronic devices, identify hazards, and make disposal decisions.' },
                  { step: '04', text: 'Solve escape room puzzles — circuit board sorting, code breaking, data wipes.' },
                  { step: '05', text: 'Every decision affects Eco Impact, Resource Recovery, and City Risk.' },
                  { step: '06', text: 'Complete all 5 locations and create the final E-Waste Action Plan.' },
                  { step: '07', text: 'Receive your personalized Environmental Impact Report and rank.' },
                ].map(item => (
                  <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--accent-green)',
                      background: 'rgba(0,214,143,0.08)',
                      border: '1px solid rgba(0,214,143,0.2)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '2px 8px',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      {item.step}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,214,143,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,214,143,0.15)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-green)' }}>
                  ⏱ Mission time: 15 minutes | 5 locations | 12+ puzzles | 50+ decisions
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Highlights */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            MISSION FEATURES
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { icon: '🔍', title: 'Device Investigation', desc: 'Inspect and analyze 6+ electronic devices.' },
              { icon: '🧩', title: 'Escape Room Puzzles', desc: 'Circuit sorting, code breaking, data wipe challenges.' },
              { icon: '🗺️', title: 'Interactive City Map', desc: 'Unlock 5 unique investigation zones.' },
              { icon: '📊', title: 'Dynamic Consequences', desc: 'Every decision changes real city metrics.' },
              { icon: '🏆', title: 'Achievement System', desc: '12 achievements, including secret easter eggs.' },
              { icon: '📈', title: 'Impact Report', desc: 'Personalized analysis of your decisions.' },
            ].map(feature => (
              <div key={feature.title} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.625rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden CRT Easter Egg */}
      <div
        onClick={handleCrtClick}
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          width: '32px',
          height: '28px',
          opacity: crtClicks > 0 ? 0.4 : 0.08,
          cursor: 'pointer',
          fontSize: '1.25rem',
          transition: 'opacity 0.3s',
          userSelect: 'none',
        }}
        title={crtClicks > 0 ? `${crtClicks}/5` : undefined}
        aria-hidden="true"
      >
        📺
      </div>
    </div>
  );
}

function CityBackground() {
  return (
    <svg width="100%" height="280" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMax slice" fill="none">
      {/* Buildings */}
      <rect x="0" y="120" width="60" height="160" fill="rgba(0,180,216,0.08)" stroke="rgba(0,180,216,0.15)" strokeWidth="1"/>
      <rect x="10" y="80" width="40" height="40" fill="rgba(0,180,216,0.06)" stroke="rgba(0,180,216,0.1)" strokeWidth="1"/>
      <rect x="70" y="60" width="80" height="220" fill="rgba(0,214,143,0.07)" stroke="rgba(0,214,143,0.12)" strokeWidth="1"/>
      <rect x="80" y="40" width="20" height="20" fill="rgba(0,214,143,0.12)" stroke="rgba(0,214,143,0.2)" strokeWidth="1"/>
      <rect x="160" y="100" width="50" height="180" fill="rgba(0,180,216,0.07)" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>
      <rect x="220" y="40" width="100" height="240" fill="rgba(0,214,143,0.09)" stroke="rgba(0,214,143,0.15)" strokeWidth="1"/>
      <rect x="240" y="20" width="14" height="20" fill="rgba(0,214,143,0.2)" stroke="rgba(0,214,143,0.35)" strokeWidth="1"/>
      <circle cx="247" cy="20" r="5" fill="var(--accent-green)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <rect x="330" y="80" width="70" height="200" fill="rgba(0,180,216,0.07)" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>
      <rect x="410" y="30" width="120" height="250" fill="rgba(0,214,143,0.1)" stroke="rgba(0,214,143,0.18)" strokeWidth="1"/>
      <rect x="540" y="70" width="80" height="210" fill="rgba(0,180,216,0.08)" stroke="rgba(0,180,216,0.13)" strokeWidth="1"/>
      <rect x="630" y="50" width="90" height="230" fill="rgba(0,214,143,0.08)" stroke="rgba(0,214,143,0.13)" strokeWidth="1"/>
      <rect x="730" y="90" width="60" height="190" fill="rgba(0,180,216,0.07)" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>
      <rect x="800" y="40" width="110" height="240" fill="rgba(0,214,143,0.09)" stroke="rgba(0,214,143,0.15)" strokeWidth="1"/>
      <rect x="920" y="75" width="75" height="205" fill="rgba(0,180,216,0.07)" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>
      <rect x="1005" y="55" width="85" height="225" fill="rgba(0,214,143,0.08)" stroke="rgba(0,214,143,0.13)" strokeWidth="1"/>
      <rect x="1100" y="90" width="100" height="190" fill="rgba(0,180,216,0.07)" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>

      {/* Windows */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = Math.floor(Math.random() * 1100) + 50;
        const y = Math.floor(Math.random() * 180) + 50;
        return (
          <rect key={i} x={x} y={y} width="4" height="5" fill={i % 3 === 0 ? 'rgba(0,214,143,0.4)' : 'rgba(0,180,216,0.3)'} rx="0.5" />
        );
      })}

      {/* Ground line */}
      <line x1="0" y1="280" x2="1200" y2="280" stroke="rgba(0,214,143,0.15)" strokeWidth="1"/>

      {/* Circuit traces */}
      <path d="M100,275 L200,275 L200,270 L350,270 L350,275 L500,275" stroke="rgba(0,214,143,0.1)" strokeWidth="1" fill="none"/>
      <path d="M600,275 L700,275 L700,270 L850,270 L850,275 L1000,275" stroke="rgba(0,214,143,0.1)" strokeWidth="1" fill="none"/>
    </svg>
  );
}
