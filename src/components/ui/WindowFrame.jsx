/**
 * WindowFrame — macOS-style window chrome component
 * Provides realistic window frame with title bar, traffic light dots, and content area
 * Used by Demo Part III (Owner Dashboard)
 */

export default function WindowFrame({
    title = 'Owner Dashboard',
    children,
    className = '',
}) {
    return (
        <div
            className={`border border-[var(--border)] rounded-lg overflow-hidden shadow-2xl bg-[var(--bg-secondary)] ${className}`}
        >
            {/* Title bar with traffic light dots */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-[var(--border)]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="ml-2 text-xs text-[var(--text-secondary)]">
                    {title}
                </span>
            </div>

            {/* Window content area */}
            <div className="p-6">{children}</div>
        </div>
    )
}
