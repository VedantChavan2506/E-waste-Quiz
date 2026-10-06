import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, FastForward } from 'lucide-react';

const BRIEFING_LINES = [
  { text: '02:17 AM — NOVA CITY', delay: 0, style: 'timestamp' },
  { text: '', delay: 600 },
  { text: 'Emergency systems have detected abnormal electronic waste activity across the city.', delay: 800 },
  { text: '', delay: 2400 },
  { text: 'Three collection centers are reporting unexplained contamination.', delay: 2600 },
  { text: '', delay: 4000 },
  { text: 'Hazardous materials have been identified in residential zones.', delay: 4200 },
  { text: '', delay: 5600 },
  { text: 'Personal data from discarded devices is being accessed by unknown parties.', delay: 5800 },
  { text: '', delay: 7200 },
  { text: 'You have 15 minutes to identify the source and neutralize the crisis.', delay: 7400, style: 'warning' },
  { text: '', delay: 9000 },
  { text: 'You are the E-Waste Response Officer.', delay: 9200, style: 'emphasis' },
  { text: 'Nova City is counting on you.', delay: 10500, style: 'emphasis' },
];

export default function Briefing({ onAccept, playerName }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [showAccept, setShowAccept] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const timeoutsRef = useRef([]);

  const playBriefing = () => {
    setDisplayedLines([]);
    setShowAccept(false);
    BRIEFING_LINES.forEach(({ text, delay, style }) => {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { text, style }]);
      }, delay);
      timeoutsRef.current.push(t);
    });
    const t = setTimeout(() => setShowAccept(true), 12000);
    timeoutsRef.current.push(t);
  };

  const skipBriefing = () => {
    timeoutsRef.current.forEach(clearTimeout);
    setDisplayedLines(BRIEFING_LINES.map(l => ({ text: l.text, style: l.style })));
    setShowAccept(true);
    setSkipped(true);
  };

  useEffect(() => {
    playBriefing();
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="page-enter" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '640px', width: '100%' }}>
        {/* Officer badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          padding: '0.875rem 1.25rem',
          background: 'rgba(0,214,143,0.06)',
          border: '1px solid rgba(0,214,143,0.2)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontSize: '1.5rem' }}>🛡️</div>
          <div>
            <div className="data-label">ACTIVE OFFICER</div>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginTop: '2px' }}>
              {playerName || 'Officer'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <div className="status-dot status-dot-green" />
            <span className="badge badge-green">AUTHORIZED</span>
          </div>
        </div>

        {/* Terminal briefing */}
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          minHeight: '340px',
          fontFamily: 'var(--font-mono)',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Scanline effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(transparent 50%, rgba(0,214,143,0.015) 50%)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '0.75rem',
            }}>
              NOVA CITY E-WASTE RESPONSE SYSTEM // MISSION BRIEFING
            </div>

            {displayedLines.map((line, i) => (
              <div key={i} style={{
                marginBottom: '0.25rem',
                animation: 'fadeIn 0.3s ease',
              }}>
                {line.text === '' ? (
                  <div style={{ height: '0.5rem' }} />
                ) : (
                  <p style={{
                    fontSize: line.style === 'timestamp' ? '0.9375rem' : '0.875rem',
                    color: line.style === 'timestamp'
                      ? 'var(--accent-green)'
                      : line.style === 'warning'
                      ? 'var(--accent-amber)'
                      : line.style === 'emphasis'
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                    fontWeight: line.style === 'timestamp' || line.style === 'emphasis' ? 600 : 400,
                    letterSpacing: line.style === 'timestamp' ? '0.1em' : 'normal',
                    lineHeight: 1.7,
                  }}>
                    {line.style !== 'timestamp' && (
                      <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>{'>'}</span>
                    )}
                    {line.text}
                  </p>
                )}
              </div>
            ))}

            {!showAccept && (
              <span className="typewriter-cursor" />
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          {!showAccept && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={skipBriefing}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              <FastForward size={12} />
              SKIP
            </button>
          )}
          {showAccept && (
            <button
              className="btn btn-primary btn-lg"
              onClick={onAccept}
              id="accept-mission-btn"
              style={{ animation: 'fadeUp 0.4s ease' }}
            >
              ACCEPT MISSION
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
