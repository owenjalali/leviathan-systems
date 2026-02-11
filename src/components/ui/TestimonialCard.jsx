/**
 * TestimonialCard — Individual testimonial.
 * Quote + name + role + business. Subtle glass background.
 */
export default function TestimonialCard({ quote, name, role, business }) {
    return (
        <div className="flex-shrink-0 w-[350px] rounded-lg border border-[var(--border)] bg-[var(--glass)] p-6 backdrop-blur-sm">
            <blockquote className="text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] mb-5">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
                {/* Avatar placeholder — circle with initials */}
                <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-medium text-[var(--text-muted)]">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                        {role}{business ? ` · ${business}` : ''}
                    </p>
                </div>
            </div>
        </div>
    )
}
