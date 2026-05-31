"use client"

import { useId } from "react"
import { connectionTypeStyles, diagramSvgColors } from "@/lib/diagram-theme"

interface ConnectionLineProps {
  fromX: number
  fromY: number
  toX: number
  toY: number
  label?: string
  type: "hdmi" | "sdi" | "usb" | "wireless" | "ethernet" | "stream" | "audio"
  lineStyle?: "solid" | "dotted" | "thick"
  isHighlighted: boolean
}

export function ConnectionLine({ fromX, fromY, toX, toY, label, type, lineStyle = "solid", isHighlighted }: ConnectionLineProps) {
  const gradientId = useId()
  const { stroke, glow } = connectionTypeStyles[type]

  // Determine stroke width based on lineStyle
  const baseStrokeWidth = lineStyle === "thick" ? 4 : 2
  const highlightedStrokeWidth = lineStyle === "thick" ? 5 : 3

  // Determine dash pattern based on lineStyle and type
  const getDashArray = () => {
    if (lineStyle === "dotted") return "4 4"
    if (type === "wireless") return "8 4"
    return undefined
  }

  // Calculate control points for a curved line
  const midX = (fromX + toX) / 2
  const midY = (fromY + toY) / 2
  const dx = toX - fromX
  const dy = toY - fromY

  // Offset for curved path
  const offset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3
  const cx1 = fromX + dx * 0.25
  const cy1 = fromY
  const cx2 = toX - dx * 0.25
  const cy2 = toY

  const pathD = `M ${fromX} ${fromY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toX} ${toY}`

  return (
    <g className="transition-opacity duration-300" style={{ opacity: isHighlighted ? 1 : 0.3 }}>
      {/* Glow effect */}
      {isHighlighted && (
        <path d={pathD} fill="none" stroke={glow} strokeWidth="6" strokeOpacity="0.3" filter="url(#glow)" />
      )}

      {/* Main line */}
      <path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={isHighlighted ? highlightedStrokeWidth : baseStrokeWidth}
        strokeDasharray={getDashArray()}
        className={isHighlighted ? "animate-flow-line" : ""}
        style={{
          strokeDasharray: getDashArray() || (isHighlighted ? "20 20" : undefined),
        }}
      />

      {/* Animated particles when highlighted */}
      {isHighlighted && (
        <circle r="4" fill={stroke}>
          <animateMotion dur="2s" repeatCount="indefinite" path={pathD} />
        </circle>
      )}

      {/* Label */}
      {label && (
        <g transform={`translate(${midX}, ${midY - 8})`}>
          <rect
            x="-35"
            y="-10"
            width="70"
            height="18"
            rx="4"
            fill="rgba(0,0,0,0.7)"
            stroke={isHighlighted ? stroke : "transparent"}
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isHighlighted ? stroke : diagramSvgColors.muted}
            fontSize="9"
            fontFamily="var(--font-mono)"
            className="select-none"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  )
}
