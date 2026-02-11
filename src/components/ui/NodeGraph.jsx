/**
 * NodeGraph — Top-down flow diagram component
 * Renders nodes vertically and connection paths for system logic visualization.
 * Used in Demo Part II to show automation decision tree.
 */

export default function NodeGraph({ nodes, connections }) {
    const NODE_WIDTH = 140
    const NODE_HEIGHT = 52
    const LEVEL_SPACING = 100
    const BRANCH_OFFSET = 160
    const CENTER_X = 400
    const PADDING_TOP = 40

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
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full max-w-3xl mx-auto"
            style={{ minHeight: '500px' }}
        >
            <title>System Logic Flow</title>

            {/* Connection paths */}
            {connectionPaths.map((conn, i) => (
                <path
                    key={`conn-${i}`}
                    className="connection-path"
                    d={conn.d}
                    stroke="var(--accent, #d4af37)"
                    strokeWidth={2}
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
                        rx={12}
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
                        fontSize="15"
                        fontWeight="500"
                    >
                        {node.label}
                    </text>
                </g>
            ))}
        </svg>
    )
}
