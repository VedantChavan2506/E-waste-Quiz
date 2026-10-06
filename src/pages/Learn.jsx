import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { learnTopics, realWorldActions } from '../data/educationalContent';

const colorMap = {
  green: { bg: 'rgba(0,214,143,0.08)', border: 'rgba(0,214,143,0.2)', text: 'var(--accent-green)' },
  blue: { bg: 'rgba(0,180,216,0.08)', border: 'rgba(0,180,216,0.2)', text: 'var(--accent-blue)' },
  red: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: 'var(--accent-red)' },
  amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', text: 'var(--accent-amber)' },
  purple: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: 'var(--accent-purple)' },
};

export default function Learn({ navigate }) {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('topics'); // topics | actions

  return (
    <div className="page-enter" style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="data-label" style={{ marginBottom: '0.5rem' }}>KNOWLEDGE CENTER</div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            LEARN BEFORE YOU PLAY
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '580px', lineHeight: 1.7 }}>
            Understand e-waste essentials before starting the investigation. Short, visual, practical.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', padding: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)', width: 'fit-content' }}>
          {[
            { id: 'topics', label: '📚 Topics' },
            { id: 'actions', label: '🌍 Real World Actions' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'topics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {learnTopics.map(topic => {
              const colors = colorMap[topic.color] || colorMap.green;
              const isExpanded = expandedTopic === topic.id;

              return (
                <div
                  key={topic.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${isExpanded ? colors.border : 'var(--border-card)'}`,
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Topic header */}
                  <button
                    onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '1.25rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    aria-expanded={isExpanded}
                    id={`learn-topic-${topic.id}`}
                  >
                    <div style={{
                      fontSize: '1.75rem',
                      width: '48px',
                      height: '48px',
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {topic.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {topic.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {topic.summary}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0, color: 'var(--text-muted)' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem',
                      animation: 'fadeDown 0.3s ease',
                    }}>
                      <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '1.25rem' }} />

                      {/* Content sections */}
                      {topic.content.map((section, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                          <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: colors.text,
                            marginBottom: '0.375rem',
                          }}>
                            {section.heading}
                          </h4>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {section.text}
                          </p>
                        </div>
                      ))}

                      {/* Quick facts */}
                      <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 'var(--radius-lg)',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.625rem',
                          color: colors.text,
                          letterSpacing: '0.1em',
                          marginBottom: '0.625rem',
                        }}>
                          QUICK FACTS
                        </div>
                        {topic.quickFacts.map((fact, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '0.375rem',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                          }}>
                            <span style={{ color: colors.text, flexShrink: 0 }}>▸</span>
                            {fact}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'actions' && (
          <div>
            <div style={{
              background: 'rgba(0,214,143,0.06)',
              border: '1px solid rgba(0,214,143,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.375rem', color: 'var(--accent-green)' }}>
                🌍 TAKE IT OUTSIDE THE GAME
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The best environmental impact happens in the real world. Here are concrete actions you can take today.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {realWorldActions.map((action, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.25rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-accent)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-green)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-card)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{action.icon}</div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    {action.action}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {action.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Ready to put knowledge into action?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Start the investigation and apply everything you've learned to Nova City's e-waste crisis.
              </p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('home')}>
                START INVESTIGATION
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
