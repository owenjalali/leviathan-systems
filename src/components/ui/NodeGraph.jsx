/**
 * NodeGraph — Top-down flow diagram component
 * Renders nodes vertically and connection paths for system logic visualization.
 * Used in Demo Part II to show automation decision tree.
 * Responsive: tighter layout on mobile so nodes stay readable.
 */

import { useState, useEffect, useRef } from 'react'

export default function NodeGraph({ nodes, connections }) {
    const containerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < 640)
        }
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Responsive layout constants
    const NODE_WIDTH = isMobile ? 120 : 200
    const NODE_HEIGHT = isMobile ? 48 : 68
    const LEVEL_SPACING = isMobile ? 90 : 130
    const BRANCH_OFFSET = isMobile ? 100 : 220
    const CENTER_X = isMobile ? 200 : 500
    const PADDING_TOP = isMobile ? 30 : 50
    const FONT_SIZE = isMobile ? 13 : 17
    const CORNER_RADIUS = isMobile ? 10 : 14

    // Compute node positions — top-down layout
    const nodePositions = nodes.map((node) => {
        const y = PADDING_TOP + node.level * LEVEL_SPACING
        let x = CENTER_X - NODE_WIDTH / 2 // centered by default

        if (node.branch === 'left') {
            x = CENTER_X - BRANCH_OFFSET - NODE_WIDTH / 2
        } else if (node.branch === 'right') {
            x = CENTER_X + BRANCH_OFFSET - NODE_WIDTH / 2
        }

        return { ...node, x, y }
    })

    // Generate connection paths with smooth vertical curves
    const connectionPaths = connections.map((conn) => {
        const fromNode = nodePositions.find((n) => n.id === conn.from)
        const toNode = nodePositions.find((n) => n.id === conn.to)

        if (!fromNode || !toNode) return null

        const x1 = fromNode.x + NODE_WIDTH / 2
        const y1 = fromNode.y + NODE_HEIGHT
        const x2 = toNode.x + NODE_WIDTH / 2
        const y2 = toNode.y

        // Vertical bezier curve
        const midY = (y1 + y2) / 2
        const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`

        return { ...conn, d: path }
    }).filter(Boolean)

    const viewBoxWidth = CENTER_X * 2
    const maxLevel = Math.max(...nodes.map(n => n.level))
    const viewBoxHeight = PADDING_TOP * 2 + maxLevel * LEVEL_SPACING + NODE_HEIGHT

    return (
        <svg
            ref={containerRef}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full max-w-5xl mx-auto"
            style={{ minHeight: isMobile ? '500px' : '600px' }}
        >
            <title>System Logic Flow</title>

            {/* Connection paths */}
            {connectionPaths.map((conn, i) => (
                <path
                    key={`conn-${i}`}
                    className="connection-path"
                    d={conn.d}
                    stroke="var(--accent, #d4af37)"
                    strokeWidth={isMobile ? 1.5 : 2}
                    fill="none"
                />
            ))}

            {/* Nodes */}
            {nodePositions.map((node) => (
                <g key={node.id} className="node-group">
                    <rect
                        x={node.x}
                        y={node.y}
                        width={NODE_WIDTH}
                        height={NODE_HEIGHT}
                        rx={CORNER_RADIUS}
                        fill="var(--bg-secondary, #1a1a1a)"
                        stroke="var(--border, #333)"
                        strokeWidth={1.5}
                    />
                    <text
                        x={node.x + NODE_WIDTH / 2}
                        y={node.y + NODE_HEIGHT / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--text-primary, #ffffff)"
                        fontSize={FONT_SIZE}
                        fontWeight="500"
                    >
                        {node.label}
                    </text>
                </g>
            ))}
        </svg>
    )
}
