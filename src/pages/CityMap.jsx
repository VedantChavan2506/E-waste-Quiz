import React, { useState } from 'react';
import { Lock, CheckCircle, ChevronRight, MapPin, AlertTriangle } from 'lucide-react';
import { locations } from '../data/locations';

export default function CityMap({ gameState, onLocationSelect, navigate, timer }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const isUnlocked = (loc) => gameState.unlockedLocations.includes(loc.id);
  const isCompleted = (loc) => gameState.completedLocations.includes(loc.id);

  const statusColors = {
    red: 'var(--accent-red)',
    amber: 'var(--accent-amber)',
    green: 'var(--accent-green)',
  };

  return (
    <div className="page-enter" style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="data-label" style={{ marginBottom: '0.5rem' }}>INVESTIGATION ZONE</div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            NOVA CITY
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Select a location to begin investigation. Complete locations to unlock new areas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Map */}
          <div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid bg */}
              <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

              {/* SVG City Map */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: '100%', aspectRatio: '1.4', display: 'block' }}
                  aria-label="Nova City interactive map"
                >
                  {/* Roads */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="2"/>
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="2"/>
                  <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                  <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                  <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                  <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>

                  {/* Connection lines between locations */}
                  {locations.map((loc, i) => {
                    if (i === 0) return null;
                    const prev = locations[i - 1];
                    const unlocked = isUnlocked(loc);
                    return (
                      <line
                        key={`line-${loc.id}`}
                        x1={prev.x}
                        y1={prev.y}
                        x2={loc.x}
                        y2={loc.y}
                        stroke={unlocked ? 'rgba(0,214,143,0.3)' : 'rgba(255,255,255,0.08)'}
                        strokeWidth="0.5"
                        strokeDasharray={unlocked ? 'none' : '2,2'}
                      />
                    );
                  })}

                  {/* Location nodes */}
                  {locations.map(loc => {
                    const unlocked = isUnlocked(loc);
                    const completed = isCompleted(loc);
                    const hovered = hoveredLocation === loc.id;
                    const statusColor = statusColors[loc.statusColor] || 'var(--text-muted)';

                    return (
                      <g
                        key={loc.id}
                        transform={`translate(${loc.x}, ${loc.y})`}
                        style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }}
                        onClick={() => unlocked && onLocationSelect(loc.id)}
                        onMouseEnter={() => setHoveredLocation(loc.id)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        tabIndex={unlocked ? 0 : -1}
                        role="button"
                        aria-label={`${loc.name} — ${unlocked ? 'Enter location' : 'Locked'}`}
                        onKeyDown={e => e.key === 'Enter' && unlocked && onLocationSelect(loc.id)}
                      >
                        {/* Pulse ring for active/unlocked */}
                        {unlocked && !completed && (
                          <circle
                            r="7"
                            fill="none"
                            stroke={statusColor}
                            strokeWidth="0.5"
                            opacity="0.4"
                          >
                            <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                          </circle>
                        )}

                        {/* Node circle */}
                        <circle
                          r={hovered ? 6 : 5}
                          fill={
                            completed ? 'rgba(0,214,143,0.2)' :
                            unlocked ? `rgba(${loc.statusColor === 'red' ? '239,68,68' : loc.statusColor === 'amber' ? '245,158,11' : '0,214,143'},0.2)` :
                            'rgba(255,255,255,0.05)'
                          }
                          stroke={
                            completed ? 'var(--accent-green)' :
                            unlocked ? statusColor :
                            'rgba(255,255,255,0.15)'
                          }
                          strokeWidth={hovered ? 1 : 0.75}
                          style={{ transition: 'all 0.2s' }}
                        />

                        {/* Icon text */}
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ fontSize: completed ? '4px' : '4.5px', userSelect: 'none' }}
                        >
                          {completed ? '✓' : loc.icon}
                        </text>

                        {/* Label */}
                        <text
                          y="9"
                          textAnchor="middle"
                          style={{
                            fontSize: '2.5px',
                            fill: unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.3px',
                          }}
                        >
                          {loc.shortName}
                        </text>

                        {/* Lock icon for locked */}
                        {!unlocked && (
                          <text
                            y="-7"
                            textAnchor="middle"
                            style={{ fontSize: '3px', fill: 'var(--text-muted)', userSelect: 'none' }}
                          >
                            🔒
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map legend */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}>
                {[
                  { color: 'var(--accent-green)', label: 'Completed' },
                  { color: 'var(--accent-red)', label: 'Critical' },
                  { color: 'var(--accent-amber)', label: 'Warning' },
                  { color: 'var(--text-muted)', label: 'Locked' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {locations.map(loc => {
              const unlocked = isUnlocked(loc);
              const completed = isCompleted(loc);
              const hovered = hoveredLocation === loc.id;
              const statusColor = statusColors[loc.statusColor] || 'var(--text-muted)';

              return (
                <div
                  key={loc.id}
                  onClick={() => unlocked && onLocationSelect(loc.id)}
                  onMouseEnter={() => setHoveredLocation(loc.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{
                    background: completed ? 'rgba(0,214,143,0.05)' : hovered && unlocked ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    border: `1px solid ${completed ? 'rgba(0,214,143,0.3)' : hovered && unlocked ? 'var(--border-accent)' : 'var(--border-card)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    opacity: unlocked ? 1 : 0.5,
                    transition: 'all 0.2s',
                  }}
                  tabIndex={unlocked ? 0 : -1}
                  role="button"
                  aria-label={`${loc.name}`}
                  onKeyDown={e => e.key === 'Enter' && unlocked && onLocationSelect(loc.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      width: '42px',
                      height: '42px',
                      background: unlocked ? `rgba(${loc.statusColor === 'red' ? '239,68,68' : loc.statusColor === 'amber' ? '245,158,11' : '0,214,143'},0.1)` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${unlocked ? statusColor : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {completed ? '✅' : unlocked ? loc.icon : '🔒'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{loc.name}</h3>
                        {completed && <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>COMPLETED</span>}
                        {unlocked && !completed && <span className="badge badge-blue" style={{ fontSize: '0.6rem' }}>AVAILABLE</span>}
                        {!unlocked && <span className="badge" style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>LOCKED</span>}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                        {loc.description}
                      </p>
                      {unlocked && !completed && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {loc.deviceCount > 0 && (
                            <span className="data-label">{loc.deviceCount} devices</span>
                          )}
                          {loc.clueCount > 0 && (
                            <span className="data-label">• {loc.clueCount} clues</span>
                          )}
                          <span className="data-label">• +{loc.completionReward} pts</span>
                        </div>
                      )}
                      {loc.hazardWarning && unlocked && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.5rem' }}>
                          <AlertTriangle size={10} color="var(--accent-amber)" />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--accent-amber)' }}>
                            {loc.hazardWarning}
                          </span>
                        </div>
                      )}
                    </div>
                    {unlocked && !completed && (
                      <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .city-map-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
