/**
 * MarqueeTrack — CSS-driven infinite horizontal scroll.
 * Used for testimonials. Pauses on hover and focus-within (keyboard accessible).
 * Content is duplicated to create seamless loop.
 */
export default function MarqueeTrack({ children, className = '' }) {
    return (
        <div
            className={`overflow-hidden ${className}`}
            role="region"
            aria-label="Scrolling testimonials — hover or focus to pause"
        >
            <div className="flex animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] w-max">
                {/* Original set */}
                <div className="flex gap-6 pr-6">
                    {children}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex gap-6 pr-6" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    )
}
