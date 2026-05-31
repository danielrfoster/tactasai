import type { Connection, Node } from "@/lib/diagram-templates"

export type DiagramNodeType = Node["type"]
export type DiagramConnectionType = Connection["type"]

export const diagramSvgColors = {
  background: "#07111f",
  grid: "#1f354a",
  nodeBackground: "#0f172a",
  text: "#f8fafc",
  muted: "#94a3b8",
  subgraph: "#2f66ff",
  fallback: "#94a3b8",
} as const

export const nodeTypeColors: Record<DiagramNodeType, string> = {
  atem: "#2f66ff",
  pc: "#06b6d4",
  device: "#64748b",
  converter: "#f59e0b",
  cloud: "#ef4444",
  stream: "#34d399",
}

export const connectionTypeStyles: Record<DiagramConnectionType, { stroke: string; glow: string }> = {
  hdmi: { stroke: "#22d3ee", glow: "#22d3ee" },
  sdi: { stroke: "#fb923c", glow: "#fb923c" },
  usb: { stroke: "#4ade80", glow: "#4ade80" },
  wireless: { stroke: "#f472b6", glow: "#f472b6" },
  ethernet: { stroke: "#facc15", glow: "#facc15" },
  stream: { stroke: "#a78bfa", glow: "#a78bfa" },
  audio: { stroke: "#f87171", glow: "#f87171" },
}

export const connectionTypeColors = Object.fromEntries(
  Object.entries(connectionTypeStyles).map(([type, style]) => [type, style.stroke]),
) as Record<DiagramConnectionType, string>
