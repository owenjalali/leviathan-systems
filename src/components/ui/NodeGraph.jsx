/**
 * NodeGraph — Clean node flow diagram component
 * Renders nodes and connection paths for system logic visualization.
 * Used in Demo Part II to show automation decision tree.
 */

export default function NodeGraph({ nodes, connections }) {
    // Layout constants
    const NODE_WIDTH = 120
    const NODE_HEIGHT = 50
    const LEVEL_SPACING = 140
    const BRANCH_OFFSET = 80
    const BASE_Y = 150
    const PADDING_LEFT = 60

    // Compute node positions based on level and branch
    const nodePositions = nodes.map((node) => {
        const x = PADDING_LEFT + node.level * LEVEL_SPACING
        let y = BASE_Y

        // Handle branching at level 3 and 4
        if (node.branch === 'left') {
            y = BASE_Y - BRANCH_OFFSET
        } else if (node.branch === 'right') {
            y = BASE_Y + BRANCH_OFFSET
        }

        return {
            ...node,
            x,
            y,
        }
    })

    // Generate connection paths with smooth curves
    const connectionPaths = connections.map((conn) => {
        const fromNode = nodePositions.find((n) => n.id === conn.from)
        const toNode = nodePositions.find((n) => n.id === conn.to)

        if (!fromNode || !toNode) return null

        const x1 = fromNode.x + NODE_WIDTH
        const y1 = fromNode.y + NODE_HEIGHT / 2
        const x2 = toNode.x
        const y2 = toNode.y + NODE_HEIGHT / 2

        // Use curved paths for smoother flow
        const midX = (x1 + x2) / 2
        const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`

        return {
            ...conn,
            d: path,
        }
    }).filter(Boolean)

    // Calculate viewBox dimensions
    const viewBoxWidth = PADDING_LEFT * 2 + (nodes.length > 0
        ? Math.max(...nodes.map(n => n.level)) * LEVEL_SPACING + NODE_WIDTH
        : 800)
    const viewBoxHeight = BASE_Y * 2 + BRANCH_OFFSET * 2

    return (
        <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full max-w-5xl mx-auto"
            style={{ minHeight: '400px' }}
        >
            <title>System Logic Flow</title>

            {/* Connection paths — render before nodes for layering */}
            {connectionPaths.map((conn, i) => (
                <path
                    key={`conn-${i}`}
                    className="connection-path"
                    d={conn.d}
                    stroke="var(--accent, #d4af37)"
                    strokeWidth={2}
                    fill="none"
                    style={{ opacity: 0 }}
                />
            ))}

            {/* Nodes */}
            {nodePositions.map((node) => (
                <g
                    key={node.id}
                    className="node-group"
                    style={{ opacity: 0 }}
                >
                    <rect
                        x={node.x}
                        y={node.y}
                        width={NODE_WIDTH}
                        height={NODE_HEIGHT}
                        rx={10}
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
                        fontSize="14"
                        fontWeight="500"
                    >
                        {node.label}
                    </text>
                </g>
            ))}
        </svg>
    )
}
