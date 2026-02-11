/**
 * SectionWrapper — Consistent container with variable vertical padding.
 * Presets enforce the design reference spacing system.
 */
const paddingPresets = {
    hero: 'py-40',      // 160px
    content: 'py-[120px]', // 120px
    dense: 'py-[100px]',   // 100px
    cta: 'py-[140px]',     // 140px
    none: 'py-0',
}

export default function SectionWrapper({
    children,
    spacing = 'content',
    className = '',
    id,
}) {
    const padding = paddingPresets[spacing] || paddingPresets.content

    return (
        <section
            id={id}
            className={`mx-auto w-full max-w-[1200px] px-6 ${padding} ${className}`}
        >
            {children}
        </section>
    )
}
