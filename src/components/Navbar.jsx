import React, { useState } from 'react';
import { Menu, X, Monitor, Map, BookOpen, BarChart2, Award, Trophy, RotateCcw, Maximize2, Minimize2, Shield, Sparkles } from 'lucide-react';
import { DEFAULT_AVATAR } from '../data/avatars';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: Monitor },
  { id: 'avatar_select', label: 'WARDROBE', icon: Sparkles },
  { id: 'map', label: 'QUEST HUBS', icon: Map },
  { id: 'learn', label: 'LEARN', icon: BookOpen },
  { id: 'impact', label: 'IMPACT', icon: BarChart2 },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: Award },
  { id: 'leaderboard', label: 'LEADERBOARD', icon: Trophy },
];

export default function Navbar({ currentPage, navigate, gameState, inMission, onReset, presentationMode, onTogglePresentation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (presentationMode) {
    return (
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5rem',
        background: 'rgba(9,14,26,0.98)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', color: 'var(--accent-green)', letterSpacing: '0.1em' }}>
          E-WASTE: THE LAST DEVICE
        </span>
        <button className="btn btn-sm btn-secondary" onClick={onTogglePresentation} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Minimize2 size={14} />
          EXIT PRESENTATION
        </button>
      </header>
    );
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3.5rem',
      background: 'rgba(9,14,26,0.98)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      zIndex: 100,
      backdropFilter: 'blur(8px)',
    }}>
      {/* Logo */}
      <button
        onClick={() => navigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: 0,
        }}
        aria-label="Go to home"
      >
        <div style={{
          width: '28px',
          height: '28px',
          background: 'rgba(0,214,143,0.15)',
          border: '1px solid rgba(0,214,143,0.3)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}>
          ♻️
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            color: 'var(--accent-green)',
            letterSpacing: '0.15em',
            lineHeight: 1.2,
          }}>E-WASTE</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>THE LAST DEVICE</div>
        </div>
      </button>

      {/* Desktop Nav */}
      {!inMission && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id ||
              (item.id === 'map' && ['map','tech_district','residential_block','repair_lab','scrap_yard','recycling_center','final-mystery'].includes(currentPage));
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.id); setMenuOpen(false); }}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(0,214,143,0.08)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Icon size={12} />
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {/* Avatar Profile Chip */}
        <button
          onClick={() => navigate('avatar_select')}
          style={{
            background: 'linear-gradient(135deg, rgba(21, 35, 62, 0.8) 0%, rgba(13, 21, 39, 0.9) 100%)',
            border: '1.5px solid rgba(250, 204, 21, 0.4)',
            borderRadius: '100px',
            padding: '3px 10px 3px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title="Open Avatar Wardrobe"
        >
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid #facc15',
          }}>
            <img
              src={(gameState.avatar && gameState.avatar.avatarImg) || '/avatars/frog_avatar.jpg'}
              alt="Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: '#ffffff',
            maxWidth: '90px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {gameState.playerName || 'Officer'}
          </span>
        </button>

        {/* Score badge */}
        {gameState.gameStarted && (
          <div className="badge badge-green" style={{ fontFamily: 'var(--font-mono)', borderRadius: '100px', padding: '0.3rem 0.75rem' }}>
            {gameState.score} pts
          </div>
        )}

        {/* Presentation mode */}
        <button
          className="btn btn-icon btn-ghost"
          onClick={onTogglePresentation}
          title="Toggle Presentation Mode"
          aria-label="Toggle presentation mode"
        >
          <Maximize2 size={14} />
        </button>

        {/* Admin Control Center */}
        <button
          className="btn btn-icon btn-ghost"
          onClick={() => navigate('admin')}
          title="Admin Control Center (/admin)"
          aria-label="Admin Control Center"
          id="nav-admin-btn"
        >
          <Shield size={14} color={currentPage.startsWith('admin') ? 'var(--accent-green)' : 'var(--text-muted)'} />
        </button>

        {/* Reset (only if started) */}
        {gameState.gameStarted && (
          <button
            className="btn btn-icon btn-ghost"
            onClick={onReset}
            title="Reset Mission"
            aria-label="Reset mission"
          >
            <RotateCcw size={14} />
          </button>
        )}

        {/* Mobile menu */}
        <button
          className="btn btn-icon btn-ghost mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '3.5rem',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-card)',
          padding: '0.5rem',
          zIndex: 99,
        }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.id); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
