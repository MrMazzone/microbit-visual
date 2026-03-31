import { useEffect, useState } from 'react'

// LED patterns as flat 25-element boolean arrays (row-major, top-left first)
const HEART = [
  false, true,  false, true,  false,
  true,  true,  true,  true,  true,
  true,  true,  true,  true,  true,
  false, true,  true,  true,  false,
  false, false, true,  false, false,
]

const SMILEY = [
  false, true,  false, true,  false,
  false, true,  false, true,  false,
  false, false, false, false, false,
  true,  false, false, false, true,
  false, true,  true,  true,  false,
]

const TICK = [
  false, false, false, false, false,
  false, false, false, false, true,
  false, false, false, true,  false,
  true,  false, true,  false, false,
  false, true,  false, false, false,
]

const DIAMOND = [
  false, false, true,  false, false,
  false, true,  false, true,  false,
  true,  false, false, false, true,
  false, true,  false, true,  false,
  false, false, true,  false, false,
]

const PATTERNS = [HEART, SMILEY, TICK, DIAMOND]
const CYCLE_MS = 2200

interface LedMatrixProps {
  /** x origin of the 5×5 grid */
  x: number
  /** y origin of the 5×5 grid */
  y: number
  /** centre-to-centre spacing between LEDs */
  spacing: number
  /** radius of each LED circle */
  radius: number
  /** when true, all LEDs pulse slowly */
  allPulse?: boolean
  /** highlight colour override (used when feature is selected) */
  highlightColor?: string
  isSelected?: boolean
  isHovered?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function LedMatrix({
  x,
  y,
  spacing,
  radius,
  allPulse = false,
  highlightColor,
  isSelected = false,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LedMatrixProps) {
  const [patternIndex, setPatternIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (allPulse) return
    const interval = setInterval(() => {
      setOpacity(0)
      setTimeout(() => {
        setPatternIndex((i) => (i + 1) % PATTERNS.length)
        setFadeIn(true)
        setOpacity(1)
      }, 300)
    }, CYCLE_MS)
    return () => clearInterval(interval)
  }, [allPulse])

  // suppress unused warning
  void fadeIn

  const pattern = allPulse
    ? Array(25).fill(true)
    : PATTERNS[patternIndex]

  const hitAreaPad = spacing * 0.3
  const gridSize = spacing * 4 + radius * 2

  const ledColor = highlightColor ?? '#FF3B30'
  const offColor = '#1a0a0a'

  return (
    <g
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* invisible hit area */}
      <rect
        x={x - hitAreaPad}
        y={y - hitAreaPad}
        width={gridSize + hitAreaPad * 2}
        height={gridSize + hitAreaPad * 2}
        fill="transparent"
      />

      {/* background panel */}
      <rect
        x={x - 6}
        y={y - 6}
        width={gridSize + 12}
        height={gridSize + 12}
        rx={4}
        fill={isSelected || isHovered ? '#0d0d0d' : '#111111'}
        stroke={
          isSelected
            ? ledColor
            : isHovered
            ? `${ledColor}88`
            : '#222222'
        }
        strokeWidth={isSelected ? 2 : 1}
        style={{ transition: 'stroke 0.2s, fill 0.2s' }}
      />

      {/* LEDs */}
      {pattern.map((on, i) => {
        const col = i % 5
        const row = Math.floor(i / 5)
        const cx = x + col * spacing + radius
        const cy = y + row * spacing + radius
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill={on ? ledColor : offColor}
            style={{
              transition: `opacity 0.3s, fill 0.15s`,
              opacity: allPulse ? undefined : opacity,
              filter: on
                ? `drop-shadow(0 0 ${radius * 0.8}px ${ledColor})`
                : 'none',
              animation: allPulse && on ? 'ledPulse 1.2s ease-in-out infinite' : undefined,
            }}
          />
        )
      })}
    </g>
  )
}
