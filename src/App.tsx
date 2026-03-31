import { useState, useEffect, useCallback } from 'react'
import MicrobitBoard from './components/MicrobitBoard'
import InfoPanel from './components/InfoPanel'
import type { Feature } from './types'
import { features } from './data/features'

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleClose = useCallback(() => setSelectedFeature(null), [])

  // Close panel on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  const panelOpen = selectedFeature !== null

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            BBC Micro:bit Explorer
          </h1>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
            Click any component to learn how it works
          </p>
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Input', color: '#3B82F6' },
            { label: 'Output', color: '#10B981' },
            { label: 'Sensor', color: '#8B5CF6' },
            { label: 'Connectivity', color: '#F59E0B' },
            { label: 'Power', color: '#EF4444' },
            { label: 'Processor', color: '#06B6D4' },
          ].map(({ label, color }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#475569' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block', flexShrink: 0 }} />
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main style={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Board area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            transition: 'padding-right 0.3s',
            paddingRight: panelOpen ? '400px' : '20px',
            minHeight: 'calc(100vh - 60px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <div style={{
            width: '100%',
            maxWidth: '560px',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
          }}>
            <MicrobitBoard
              selectedId={selectedFeature?.id ?? null}
              hoveredId={hoveredId}
              onSelect={setSelectedFeature}
              onHover={setHoveredId}
            />
          </div>

          {/* Hovered component tooltip */}
          <div style={{
            marginTop: '12px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
          }}>
            {hoveredId && !selectedFeature && (() => {
              const f = features.find((ft) => ft.id === hoveredId)
              return f ? (
                <div style={{
                  padding: '6px 14px',
                  backgroundColor: '#ffffff',
                  border: `1px solid ${f.color}66`,
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#334155',
                  fontFamily: 'monospace',
                  animation: 'fadeIn 0.15s ease-out',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  <span style={{ color: f.color, fontWeight: 600 }}>{f.name}</span>
                  {' — '}
                  {f.shortDescription}
                </div>
              ) : null
            })()}
          </div>

          {/* Component quick-access buttons */}
          {!panelOpen && (
            <div style={{
              marginTop: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              maxWidth: '560px',
            }}>
              {features.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFeature(f)}
                  style={{
                    padding: '4px 10px',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    backgroundColor: hoveredId === f.id ? `${f.color}18` : '#ffffff',
                    color: hoveredId === f.id ? f.color : '#64748b',
                    border: `1px solid ${hoveredId === f.id ? f.color + '88' : '#e2e8f0'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={() => setHoveredId(f.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Slide-in info panel */}
      <InfoPanel feature={selectedFeature} onClose={handleClose} />
    </div>
  )
}
