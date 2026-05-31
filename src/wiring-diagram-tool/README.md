# Wireflow

Interactive wiring diagram visualization tool for streaming and recording setups.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ctxzz/v0-diagram-generation)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/um69diBcyuj)

## Features

- **Mermaid Import** - Paste Mermaid graph syntax to instantly generate interactive diagrams
- **Drag & Drop** - Freely reposition nodes with real-time connection updates
- **Edit Mode** - Add, modify, and delete nodes and connections
- **Zoom & Pan** - Navigate large diagrams with smooth controls (Ctrl+scroll, Alt+drag)
- **Export** - Download diagrams as PNG, SVG, Mermaid, or JSON
- **Highlight Mode** - Toggle all connections active to visualize the full signal flow
- **Auto Layout** - Automatic positioning and grouping based on subgraph definitions

## Supported Connection Types

| Type | Color | Description |
|------|-------|-------------|
| HDMI | Cyan | HDMI video connections |
| SDI | Orange | SDI broadcast connections |
| USB | Green | USB data connections |
| Ethernet | Yellow | Network connections |
| Type-C | Magenta | USB Type-C connections |

## Usage

### Import from Mermaid

Click "Paste Mermaid" and paste your diagram code:

\`\`\`mermaid
graph LR
  subgraph Studio
    PC[Streaming PC]
    CAM[Camera]
    ATEM[ATEM Mini]
  end
  
  PC -->|HDMI| ATEM
  CAM -->|HDMI| ATEM
  ATEM -->|USB| PC
\`\`\`

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Apply Mermaid code | `Cmd/Ctrl + Enter` |
| Zoom in/out | `Ctrl + Scroll` |
| Pan | `Alt + Drag` or `Middle Mouse + Drag` |
| Reset zoom | Click zoom percentage |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Development

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## License

MIT
