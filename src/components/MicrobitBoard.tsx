import LedMatrix from './LedMatrix'
import { features } from '../data/features'
import type { Feature } from '../types'

interface MicrobitBoardProps {
  selectedId: string | null
  hoveredId: string | null
  onSelect: (feature: Feature) => void
  onHover: (id: string | null) => void
}

function featureColor(id: string): string {
  return features.find((f) => f.id === id)?.color ?? '#888'
}

export default function MicrobitBoard({ selectedId, hoveredId, onSelect, onHover }: MicrobitBoardProps) {
  function sel(id: string) {
    return selectedId === id
  }
  function hov(id: string) {
    return hoveredId === id
  }

  function glowStyle(id: string): React.CSSProperties {
    const color = featureColor(id)
    if (sel(id)) return { filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}66)`, transition: 'filter 0.2s', cursor: 'pointer' }
    if (hov(id)) return { filter: `drop-shadow(0 0 4px ${color}bb)`, transition: 'filter 0.2s', cursor: 'pointer' }
    return { transition: 'filter 0.2s', cursor: 'pointer' }
  }

  function handleClick(id: string) {
    const feature = features.find((f) => f.id === id)
    if (feature) onSelect(feature)
  }

  // Edge connector large pad positions
  const largePads = [
    { x: 68,  label: '0' },
    { x: 148, label: '1' },
    { x: 228, label: '2' },
    { x: 308, label: '3V' },
    { x: 388, label: 'GND' },
  ]

  // Small pins between large pads
  const smallPinXs = [
    98, 108, 118, 128, 138,
    178, 188, 198, 208, 218,
    258, 268, 278, 288, 298,
    338, 348, 358, 368, 378,
  ]

  return (
    <svg
      viewBox="0 0 480 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Interactive BBC Micro:bit board diagram"
      style={{ width: '100%', height: '100%', maxHeight: '600px' }}
    >
      <defs>
        <radialGradient id="pcbGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e6b2e" />
          <stop offset="100%" stopColor="#0d3d18" />
        </radialGradient>
        <radialGradient id="btnGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#222" />
        </radialGradient>
        <radialGradient id="btnGradHover" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </radialGradient>
        <filter id="pcbBevel">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000066" />
        </filter>
        <pattern id="speakerMesh" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.5" fill="#1a3a22" />
        </pattern>
      </defs>

      {/* ── PCB body ─────────────────────────────────────────────── */}
      <rect
        x="30" y="10"
        width="420" height="350"
        rx="22" ry="22"
        fill="url(#pcbGrad)"
        filter="url(#pcbBevel)"
        stroke="#0a2d12"
        strokeWidth="1.5"
      />

      {/* PCB edge highlight (top-left bevel) */}
      <rect
        x="31" y="11"
        width="418" height="348"
        rx="21" ry="21"
        fill="none"
        stroke="#2a7a3a"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Mounting holes */}
      {[[52, 32], [428, 32], [52, 338], [428, 338]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#0a2a14" stroke="#0d3a1a" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="5" fill="#051a0a" />
        </g>
      ))}

      {/* ── Antenna trace ─────────────────────────────────────────── */}
      <g
        style={glowStyle('bluetooth-radio')}
        onClick={() => handleClick('bluetooth-radio')}
        onMouseEnter={() => onHover('bluetooth-radio')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="175" y="14" width="130" height="28" rx="4" fill="transparent" />
        {/* PCB trace meander */}
        <path
          d="M 200 38 L 200 22 L 280 22 L 280 38"
          fill="none"
          stroke="#c8a84b"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 210 38 L 210 28 L 270 28 L 270 38"
          fill="none"
          stroke="#c8a84b"
          strokeWidth="1.5"
          opacity="0.7"
          strokeLinecap="round"
        />
        <text x="240" y="48" textAnchor="middle" fontSize="8" fill="#c8a84b" fontFamily="monospace" opacity="0.9">
          BLE / RADIO
        </text>
      </g>

      {/* ── LED Matrix ────────────────────────────────────────────── */}
      <g style={glowStyle('led-matrix')}>
        <LedMatrix
          x={153}
          y={62}
          spacing={36}
          radius={13}
          allPulse={sel('led-matrix')}
          highlightColor={sel('led-matrix') ? '#10B981' : undefined}
          isSelected={sel('led-matrix')}
          isHovered={hov('led-matrix')}
          onClick={() => handleClick('led-matrix')}
          onMouseEnter={() => onHover('led-matrix')}
          onMouseLeave={() => onHover(null)}
        />
      </g>

      {/* ── Button A ──────────────────────────────────────────────── */}
      <g
        style={glowStyle('button-a')}
        onClick={() => handleClick('button-a')}
        onMouseEnter={() => onHover('button-a')}
        onMouseLeave={() => onHover(null)}
      >
        {/* mount ring */}
        <circle cx="72" cy="183" r="28" fill="#0d3018" stroke="#1a5a28" strokeWidth="1.5" />
        {/* button cap */}
        <circle
          cx="72" cy="183" r="20"
          fill={hov('button-a') || sel('button-a') ? '#4b5563' : '#2d3748'}
          stroke="#555"
          strokeWidth="1"
        />
        <circle cx="72" cy="183" r="13" fill={hov('button-a') || sel('button-a') ? '#6b7280' : '#374151'} />
        {/* label */}
        <text x="72" y="183" textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="bold" fill="#e5e7eb" fontFamily="sans-serif">A</text>
        {/* silk label */}
        <text x="72" y="218" textAnchor="middle" fontSize="8" fill="#a0c878" fontFamily="monospace">BTN A</text>
      </g>

      {/* ── Button B ──────────────────────────────────────────────── */}
      <g
        style={glowStyle('button-b')}
        onClick={() => handleClick('button-b')}
        onMouseEnter={() => onHover('button-b')}
        onMouseLeave={() => onHover(null)}
      >
        <circle cx="408" cy="183" r="28" fill="#0d3018" stroke="#1a5a28" strokeWidth="1.5" />
        <circle
          cx="408" cy="183" r="20"
          fill={hov('button-b') || sel('button-b') ? '#4b5563' : '#2d3748'}
          stroke="#555"
          strokeWidth="1"
        />
        <circle cx="408" cy="183" r="13" fill={hov('button-b') || sel('button-b') ? '#6b7280' : '#374151'} />
        <text x="408" y="183" textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="bold" fill="#e5e7eb" fontFamily="sans-serif">B</text>
        <text x="408" y="218" textAnchor="middle" fontSize="8" fill="#a0c878" fontFamily="monospace">BTN B</text>
      </g>

      {/* ── nRF52833 Processor chip ────────────────────────────────── */}
      <g
        style={glowStyle('processor')}
        onClick={() => handleClick('processor')}
        onMouseEnter={() => onHover('processor')}
        onMouseLeave={() => onHover(null)}
      >
        {/* chip body */}
        <rect x="164" y="250" width="100" height="72" rx="3" fill="#111" stroke="#333" strokeWidth="1" />
        {/* chip pads top */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={`ct${i}`} x={174 + i * 14} y="245" width="8" height="7" rx="1" fill="#c8a84b" />
        ))}
        {/* chip pads bottom */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={`cb${i}`} x={174 + i * 14} y="320" width="8" height="7" rx="1" fill="#c8a84b" />
        ))}
        {/* chip pads left */}
        {[0,1,2,3].map(i => (
          <rect key={`cl${i}`} x="157" y={260 + i * 16} width="9" height="8" rx="1" fill="#c8a84b" />
        ))}
        {/* chip pads right */}
        {[0,1,2,3].map(i => (
          <rect key={`cr${i}`} x="262" y={260 + i * 16} width="9" height="8" rx="1" fill="#c8a84b" />
        ))}
        {/* chip label */}
        <text x="214" y="280" textAnchor="middle" fontSize="7.5" fill="#888" fontFamily="monospace">nRF52833</text>
        <text x="214" y="292" textAnchor="middle" fontSize="6.5" fill="#666" fontFamily="monospace">Nordic Semi</text>
        {/* dot mark */}
        <circle cx="171" cy="257" r="3" fill="#444" />
        {/* subtle circuit lines */}
        <line x1="214" y1="322" x2="214" y2="345" stroke="#1a5a28" strokeWidth="0.8" opacity="0.6" />
        <line x1="200" y1="322" x2="200" y2="340" stroke="#1a5a28" strokeWidth="0.8" opacity="0.6" />
        <line x1="228" y1="322" x2="228" y2="340" stroke="#1a5a28" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* ── LSM303AGR Motion sensor chip ──────────────────────────── */}
      <g
        style={glowStyle('accelerometer')}
        onClick={() => handleClick('accelerometer')}
        onMouseEnter={() => onHover('accelerometer')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="330" y="98" width="50" height="38" rx="2" fill="#111" stroke="#333" strokeWidth="0.8" />
        {[0,1,2].map(i => (
          <rect key={`mt${i}`} x={336 + i * 13} y="93" width="8" height="6" rx="1" fill="#c8a84b" />
        ))}
        {[0,1,2].map(i => (
          <rect key={`mb${i}`} x={336 + i * 13} y="135" width="8" height="6" rx="1" fill="#c8a84b" />
        ))}
        <text x="355" y="113" textAnchor="middle" fontSize="5.5" fill="#888" fontFamily="monospace">LSM303</text>
        <text x="355" y="122" textAnchor="middle" fontSize="5" fill="#666" fontFamily="monospace">AGR</text>
        <circle cx="334" cy="101" r="2" fill="#444" />
        {/* label below */}
        <text x="355" y="150" textAnchor="middle" fontSize="7" fill="#a0c878" fontFamily="monospace">ACCEL+MAG</text>
      </g>

      {/* ── Magnetometer — separate clickable area over same chip ─── */}
      {/* We overlay a second hotspot label so students can click "compass" too */}
      <g
        style={glowStyle('magnetometer')}
        onClick={() => handleClick('magnetometer')}
        onMouseEnter={() => onHover('magnetometer')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="330" y="155" width="50" height="14" rx="2" fill="transparent" />
        <text x="355" y="165" textAnchor="middle" fontSize="7" fill="#c084fc" fontFamily="monospace"
          style={{ textDecoration: 'underline' }}>COMPASS</text>
      </g>

      {/* ── Microphone ────────────────────────────────────────────── */}
      <g
        style={glowStyle('microphone')}
        onClick={() => handleClick('microphone')}
        onMouseEnter={() => onHover('microphone')}
        onMouseLeave={() => onHover(null)}
      >
        {/* mic body */}
        <circle cx="390" cy="268" r="16" fill="#0d1a10" stroke="#1e4a26" strokeWidth="1" />
        {/* mic hole */}
        <circle cx="390" cy="268" r="5" fill="#050e08" stroke="#333" strokeWidth="0.5" />
        {/* active LED ring (pink/orange when on) */}
        <circle cx="390" cy="268" r="9"
          fill="none"
          stroke={sel('microphone') || hov('microphone') ? '#f97316' : '#1a3020'}
          strokeWidth="1.5"
          style={{ transition: 'stroke 0.2s' }}
        />
        {/* small dots around mic */}
        {[0,1,2,3,4,5].map(i => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <circle
              key={i}
              cx={390 + Math.cos(angle) * 13}
              cy={268 + Math.sin(angle) * 13}
              r="1.2"
              fill="#2a5a32"
            />
          )
        })}
        <text x="390" y="290" textAnchor="middle" fontSize="7" fill="#a0c878" fontFamily="monospace">MIC</text>
      </g>

      {/* ── Speaker ───────────────────────────────────────────────── */}
      <g
        style={glowStyle('speaker')}
        onClick={() => handleClick('speaker')}
        onMouseEnter={() => onHover('speaker')}
        onMouseLeave={() => onHover(null)}
      >
        <circle cx="78" cy="280" r="30" fill="url(#speakerMesh)" stroke="#1a5a28" strokeWidth="1" />
        <circle cx="78" cy="280" r="30" fill="transparent" />
        {/* concentric rings */}
        {[8, 16, 24].map(r => (
          <circle key={r} cx="78" cy="280" r={r}
            fill="none"
            stroke={sel('speaker') || hov('speaker') ? '#10b98155' : '#1a3a2255'}
            strokeWidth="1"
            style={{ transition: 'stroke 0.2s' }}
          />
        ))}
        <circle cx="78" cy="280" r="4" fill="#0d2a14" stroke="#2a5a32" strokeWidth="0.8" />
        <text x="78" y="318" textAnchor="middle" fontSize="7.5" fill="#a0c878" fontFamily="monospace">SPEAKER</text>
      </g>

      {/* ── Temperature sensor label (internal to processor) ──────── */}
      <g
        style={glowStyle('temperature')}
        onClick={() => handleClick('temperature')}
        onMouseEnter={() => onHover('temperature')}
        onMouseLeave={() => onHover(null)}
      >
        {/* temp icon — thermometer shape */}
        <rect x="105" y="256" width="16" height="36" rx="8" fill="#111" stroke={sel('temperature') || hov('temperature') ? '#8B5CF6' : '#333'} strokeWidth="1" style={{ transition: 'stroke 0.2s' }} />
        <rect x="110" y="260" width="6" height="24" rx="3"
          fill={sel('temperature') || hov('temperature') ? '#8B5CF6' : '#3a1a5a'}
          style={{ transition: 'fill 0.2s' }}
        />
        <circle cx="113" cy="286" r="6" fill={sel('temperature') || hov('temperature') ? '#8B5CF6' : '#3a1a5a'} style={{ transition: 'fill 0.2s' }} />
        {/* tick marks */}
        {[0,1,2].map(i => (
          <line key={i} x1="121" y1={266 + i * 8} x2="126" y2={266 + i * 8} stroke="#555" strokeWidth="1" />
        ))}
        <text x="113" y="303" textAnchor="middle" fontSize="7" fill="#a0c878" fontFamily="monospace">TEMP</text>
      </g>

      {/* ── USB Connector ─────────────────────────────────────────── */}
      <g
        style={glowStyle('usb')}
        onClick={() => handleClick('usb')}
        onMouseEnter={() => onHover('usb')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="196" y="344" width="88" height="24" rx="4"
          fill={sel('usb') || hov('usb') ? '#374151' : '#1f2937'}
          stroke={sel('usb') || hov('usb') ? '#EF4444' : '#4b5563'}
          strokeWidth="1.2"
          style={{ transition: 'fill 0.2s, stroke 0.2s' }}
        />
        {/* USB notch */}
        <rect x="218" y="344" width="44" height="6" rx="2" fill="#111" />
        {/* contacts */}
        {[0,1,2,3].map(i => (
          <rect key={i} x={211 + i * 16} y="350" width="8" height="10" rx="1"
            fill={sel('usb') || hov('usb') ? '#c8a84b' : '#a07838'}
          />
        ))}
        <text x="240" y="378" textAnchor="middle" fontSize="7.5" fill="#a0c878" fontFamily="monospace">USB</text>
      </g>

      {/* ── Battery Connector ─────────────────────────────────────── */}
      <g
        style={glowStyle('battery')}
        onClick={() => handleClick('battery')}
        onMouseEnter={() => onHover('battery')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="42" y="310" width="64" height="22" rx="3"
          fill={sel('battery') || hov('battery') ? '#374151' : '#1f2937'}
          stroke={sel('battery') || hov('battery') ? '#EF4444' : '#4b5563'}
          strokeWidth="1"
          style={{ transition: 'fill 0.2s, stroke 0.2s' }}
        />
        {/* JST pins */}
        <rect x="54" y="306" width="10" height="7" rx="1" fill="#c8a84b" />
        <rect x="76" y="306" width="10" height="7" rx="1" fill="#c8a84b" />
        <text x="74" y="342" textAnchor="middle" fontSize="7" fill="#a0c878" fontFamily="monospace">BATTERY</text>
      </g>

      {/* ── Status LED ────────────────────────────────────────────── */}
      <circle cx="170" cy="358" r="5"
        fill={sel('usb') || hov('usb') ? '#22c55e' : '#14532d'}
        stroke="#166534"
        strokeWidth="0.8"
        style={{ transition: 'fill 0.3s', filter: sel('usb') || hov('usb') ? 'drop-shadow(0 0 4px #22c55e)' : 'none' }}
      />

      {/* ── Reset button (indicated on back) ──────────────────────── */}
      <g opacity="0.7">
        <rect x="398" y="312" width="26" height="26" rx="13"
          fill="#0d1a10"
          stroke="#1e4a26"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <text x="411" y="325" textAnchor="middle" dominantBaseline="central" fontSize="7.5" fill="#6b7280" fontFamily="monospace">RST</text>
        <text x="411" y="346" textAnchor="middle" fontSize="6.5" fill="#4b5563" fontFamily="monospace">(back)</text>
      </g>

      {/* ── Edge Connector strip ──────────────────────────────────── */}
      <rect x="30" y="362" width="420" height="46" rx="0"
        fill="#0d2a14"
        stroke="none"
      />
      <rect x="30" y="362" width="420" height="4" fill="#1a5a28" opacity="0.5" />

      {/* Small pins */}
      <g
        style={glowStyle('edge-connector')}
        onClick={() => handleClick('edge-connector')}
        onMouseEnter={() => onHover('edge-connector')}
        onMouseLeave={() => onHover(null)}
      >
        {smallPinXs.map((px, i) => (
          <rect key={i} x={px} y="364" width="7" height="20" rx="1"
            fill={sel('edge-connector') || hov('edge-connector') ? '#d4a853' : '#a07838'}
            stroke="#8a6020"
            strokeWidth="0.5"
          />
        ))}

        {/* Large pads */}
        {largePads.map(({ x: px, label }) => (
          <g key={label}>
            <rect x={px} y="362" width="62" height="46" rx="2"
              fill={sel('edge-connector') || hov('edge-connector') ? '#d4a853' : '#b8872a'}
              stroke="#8a6020"
              strokeWidth="0.8"
            />
            {/* hole */}
            <circle cx={px + 31} cy="393" r="7" fill="#0a1e0e" stroke="#6a4a10" strokeWidth="0.5" />
            <text x={px + 31} y="374" textAnchor="middle" fontSize="9" fontWeight="bold"
              fill={sel('edge-connector') || hov('edge-connector') ? '#0d2a14' : '#1a3a10'}
              fontFamily="monospace">
              {label}
            </text>
          </g>
        ))}

        {/* Touch pin glow */}
        {sel('touch-pins') || hov('touch-pins') ? (
          [68, 148, 228].map((px, i) => (
            <rect key={i} x={px} y="362" width="62" height="46" rx="2"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px #3B82F6)' }}
            />
          ))
        ) : null}
      </g>

      {/* ── Touch pins label ──────────────────────────────────────── */}
      <g
        style={glowStyle('touch-pins')}
        onClick={() => handleClick('touch-pins')}
        onMouseEnter={() => onHover('touch-pins')}
        onMouseLeave={() => onHover(null)}
      >
        <rect x="30" y="406" width="272" height="14" rx="0" fill="transparent" />
        <text x="150" y="416" textAnchor="middle" fontSize="7" fill={sel('touch-pins') || hov('touch-pins') ? '#60a5fa' : '#4b7a60'} fontFamily="monospace">
          ← TOUCH SENSITIVE
        </text>
      </g>

      {/* Remaining pin label */}
      <text x="356" y="416" textAnchor="middle" fontSize="7" fill="#4b7a60" fontFamily="monospace">POWER →</text>

      {/* ── Silk-screen labels ────────────────────────────────────── */}
      <text x="240" y="38" textAnchor="middle" fontSize="9" fill="#a0c878" fontFamily="monospace" opacity="0.6">
        BBC micro:bit
      </text>

      {/* ── Board outline score ───────────────────────────────────── */}
      <rect
        x="30" y="10"
        width="420" height="350"
        rx="22" ry="22"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.3"
        opacity="0.08"
      />
    </svg>
  )
}
