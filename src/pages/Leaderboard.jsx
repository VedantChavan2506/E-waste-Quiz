import React, { useState } from 'react';
import { Trophy, RotateCcw, Trash2 } from 'lucide-react';

const RANK_COLORS = {
  'NOVA CITY E-WASTE HERO': '#f59e0b',
  'CIRCULAR ECONOMY CHAMPION': '#00d68f',
  'ECO INVESTIGATOR': '#00b4d8',
  'RESOURCE SAVER': '#8b5cf6',
  'E-WASTE ROOKIE': '#8b9ab8',
};

export default function Leaderboard({ gameState, getRank, navigate }) {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ewaste-leaderboard') || '[]');
    } catch {
      return [];
    }
  });

  const clearRecords = () => {
    localStorage.removeItem('ewaste-leaderboard');
    setEntries([]);
  };

  return (
    <div className="page-enter" style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="data-label" style={{ marginBottom: '0.5rem' }}>LOCAL MISSION RECORDS</div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            TOP E-WASTE RESPONDERS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Scores saved locally on this device. No account required.
          </p>
        </div>

        {/* Current player card */}
        {gameState.gameStarted && (
          <div style={{
            background: 'rgba(0,214,143,0.06)',
            border: '1px solid rgba(0,214,143,0.3)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: '1.5rem' }}>👤</div>
            <div style={{ flex: 1 }}>
              <div className="data-label" style={{ marginBottom: '2px', color: 'var(--accent-green)' }}>CURRENT PLAYER</div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>{gameState.playerName || 'Officer'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="data-label">SCORE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                {gameState.score}
              </div>
            </div>
            {gameState.gameCompleted && (
              <div style={{ textAlign: 'right' }}>
                <div className="data-label">RANK</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: RANK_COLORS[getRank(gameState.score).rank] }}>
                  {getRank(gameState.score).rank}
                </div>
              </div>
            )}
          </div>
        )}

        {entries.length > 0 ? (
          <div>
            {/* Leaderboard table */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr auto auto auto',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                {['#', 'OFFICER', 'RANK', 'ECO IMPACT', 'SCORE'].map(col => (
                  <div key={col} className="data-label" style={{ textAlign: col === 'SCORE' ? 'right' : 'left' }}>
                    {col}
                  </div>
                ))}
              </div>

              {/* Entries */}
              {entries.map((entry, i) => {
                const rankColor = RANK_COLORS[entry.rank] || 'var(--text-muted)';
                const isTop3 = i < 3;
                const medals = ['🥇', '🥈', '🥉'];

                return (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '48px 1fr auto auto auto',
                      gap: '0.75rem',
                      padding: '0.875rem 1.25rem',
                      borderBottom: i < entries.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      background: isTop3 ? `rgba(${i === 0 ? '245,158,11' : i === 1 ? '139,139,139' : '180,120,60'},0.04)` : 'transparent',
                      alignItems: 'center',
                    }}
                  >
                    {/* Rank number */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: isTop3 ? '1.25rem' : '0.9375rem',
                      fontWeight: 700,
                      color: isTop3 ? (i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : '#cd7f32') : 'var(--text-muted)',
                      textAlign: 'center',
                    }}>
                      {isTop3 ? medals[i] : `#${i + 1}`}
                    </div>

                    {/* Name + date */}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '2px' }}>
                        {entry.name}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {entry.date}
                      </div>
                    </div>

                    {/* Rank */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: rankColor,
                      background: `${rankColor}15`,
                      border: `1px solid ${rankColor}25`,
                      padding: '2px 8px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap',
                    }}>
                      {entry.rank?.split(' ').slice(0, 2).join(' ')}
                    </div>

                    {/* Eco */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      color: entry.ecoImpact >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                      textAlign: 'center',
                    }}>
                      {(entry.ecoImpact >= 0 ? '+' : '') + entry.ecoImpact}
                    </div>

                    {/* Score */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--accent-green)',
                      textAlign: 'right',
                    }}>
                      {entry.score}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-danger btn-sm"
                onClick={clearRecords}
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <Trash2 size={12} />
                Clear Records
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>No records yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Complete the investigation and save your score to appear here.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('home')}>
              START MISSION
            </button>
          </div>
        )}

        {/* Info note */}
        <div style={{
          marginTop: '1.5rem',
          padding: '0.875rem 1.25rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--text-secondary)' }}>Local Mission Records</strong> — scores are stored in your browser's local storage. 
            Clearing browser data will remove these records. No account or server required.
          </p>
        </div>
      </div>
    </div>
  );
}
