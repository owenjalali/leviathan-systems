/**
 * PhoneMockup - Realistic iPhone device frame component
 * Renders an iPhone-style mockup with notch, rounded corners, and screen area.
 * Dark theme compatible with subtle shadows and premium feel.
 */

export default function PhoneMockup({ children, className = '' }) {
    return (
        <div className={`relative mx-auto ${className}`}>
            {/* iPhone device frame */}
            <div className="relative border-[14px] border-[#1f1f1f] rounded-[2.5rem] shadow-2xl max-w-[320px] mx-auto">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[26px] bg-[#1f1f1f] rounded-b-[1.25rem] z-10" />

                {/* Screen area with children */}
                <div className="relative bg-[var(--bg-primary)] rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
