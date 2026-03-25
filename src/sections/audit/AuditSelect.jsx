import { Check, ChevronDown, Search } from 'lucide-react'
import { useDeferredValue, useEffect, useId, useRef, useState } from 'react'

function defaultSearchText(option) {
  return `${option.label || ''} ${option.value || ''}`.trim().toLowerCase()
}

export default function AuditSelect({
  ariaLabel,
  error,
  name,
  onBlur,
  onChange,
  options,
  placeholder,
  renderOptionContent,
  renderTriggerContent,
  searchPlaceholder = 'Search',
  value,
}) {
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const searchRef = useRef(null)

  const listboxId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const selectedOption = options.find((option) => option.value === value) || null
  const filteredOptions = deferredQuery
    ? options.filter((option) =>
        (option.searchText || defaultSearchText(option))
          .toLowerCase()
          .includes(deferredQuery)
      )
    : options

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    searchRef.current?.focus()

    function handlePointerDown(event) {
      if (rootRef.current?.contains(event.target)) {
        return
      }

      setIsOpen(false)
      setQuery('')
      onBlur?.(name)
    }

    function handleEscape(event) {
      if (event.key !== 'Escape') {
        return
      }

      setIsOpen(false)
      setQuery('')
      triggerRef.current?.focus()
      onBlur?.(name)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, name, onBlur])

  function closeMenu(shouldBlur = true) {
    setIsOpen(false)
    setQuery('')

    if (shouldBlur) {
      onBlur?.(name)
    }
  }

  function handleToggle() {
    if (isOpen) {
      closeMenu()
      return
    }

    setQuery('')
    setIsOpen(true)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={name}
        name={name}
        type="button"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={`flex min-h-[58px] w-full items-center gap-3 rounded-2xl border bg-[rgba(255,255,255,0.03)] px-4 py-3 text-left text-base text-[var(--text-primary)] transition focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${
          error
            ? 'border-red-400/70'
            : 'border-white/[0.08] hover:border-white/[0.14]'
        }`}
        onBlur={(event) => {
          if (rootRef.current?.contains(event.relatedTarget)) {
            return
          }

          if (!isOpen) {
            onBlur?.(name)
          }
        }}
        onClick={handleToggle}
      >
        <div className="min-w-0 flex-1">
          {selectedOption ? (
            renderTriggerContent(selectedOption)
          ) : (
            <span className="text-[var(--text-muted)]">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-[var(--text-muted)] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+0.6rem)] z-40 w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[rgba(10,10,15,0.98)] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              placeholder={searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  closeMenu()
                  triggerRef.current?.focus()
                }
              }}
            />
          </div>

          <div
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className="country-dropdown mt-3 max-h-72 space-y-1 overflow-y-auto pr-1"
          >
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const isSelected = selectedOption?.value === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      isSelected
                        ? 'bg-[var(--accent)]/14 text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]'
                    }`}
                    onClick={() => {
                      onChange(option)
                      closeMenu()
                      triggerRef.current?.focus()
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      {renderOptionContent(option, { isSelected })}
                    </div>
                    {isSelected ? (
                      <Check className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" />
                    ) : null}
                  </button>
                )
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.08] px-4 py-6 text-sm text-[var(--text-secondary)]">
                No matches found.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
