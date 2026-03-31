import type { Feature } from '../types'
import { CATEGORY_LABELS } from '../types'

interface InfoPanelProps {
  feature: Feature | null
  onClose: () => void
}

export default function InfoPanel({ feature, onClose }: InfoPanelProps) {
  const isVisible = feature !== null

  return (
    <div
      aria-label="Component information panel"
      aria-hidden={!isVisible}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderLeft: feature ? `3px solid ${feature.color}` : '3px solid transparent',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s',
        overflowY: 'auto',
        zIndex: 50,
        boxShadow: isVisible ? '-4px 0 24px rgba(0,0,0,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {feature && (
        <>
          {/* Header */}
          <div style={{
            padding: '24px 20px 16px',
            borderBottom: `1px solid ${feature.color}33`,
            background: `linear-gradient(135deg, ${feature.color}12 0%, transparent 60%)`,
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: feature.color,
                  backgroundColor: `${feature.color}22`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  marginBottom: '8px',
                }}>
                  {CATEGORY_LABELS[feature.category]}
                </span>
                <h2 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0f172a',
                  lineHeight: 1.2,
                }}>
                  {feature.name}
                </h2>
                <p style={{
                  margin: '6px 0 0',
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: 1.4,
                }}>
                  {feature.shortDescription}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close panel"
                style={{
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  lineHeight: 1,
                  flexShrink: 0,
                  marginLeft: '12px',
                  marginTop: '2px',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#94a3b8'
                  e.currentTarget.style.color = '#0f172a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.color = '#94a3b8'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '20px', flex: 1 }}>
            {/* Description */}
            <p style={{
              margin: '0 0 24px',
              fontSize: '14px',
              lineHeight: 1.65,
              color: '#334155',
            }}>
              {feature.description}
            </p>

            {/* Technical Details */}
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 10px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: feature.color,
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '1px',
                  backgroundColor: feature.color,
                  opacity: 0.6,
                }} />
                Technical Details
              </h3>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}>
                {feature.technicalDetails.map((detail, i) => (
                  <li key={i} style={{
                    padding: '7px 0 7px 16px',
                    fontSize: '13px',
                    color: '#334155',
                    borderBottom: i < feature.technicalDetails.length - 1 ? '1px solid #f1f5f9' : 'none',
                    position: 'relative',
                    fontFamily: 'monospace',
                    lineHeight: 1.5,
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: feature.color,
                      opacity: 0.7,
                    }}>›</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </section>

            {/* Fun Facts */}
            <section>
              <h3 style={{
                margin: '0 0 10px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: feature.color,
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '1px',
                  backgroundColor: feature.color,
                  opacity: 0.6,
                }} />
                Did You Know?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {feature.funFacts.map((fact, i) => (
                  <div key={i} style={{
                    padding: '12px 14px',
                    backgroundColor: `${feature.color}12`,
                    borderRadius: '8px',
                    border: `1px solid ${feature.color}30`,
                    fontSize: '13px',
                    color: '#334155',
                    lineHeight: 1.55,
                  }}>
                    {fact}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid #f1f5f9',
            flexShrink: 0,
          }}>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#475569',
              fontFamily: 'monospace',
              textAlign: 'center',
            }}>
              Click another component to explore • Press Esc to close
            </p>
          </div>
        </>
      )}
    </div>
  )
}
