# Leviathan Systems — Planning Index

## Quick Links

| File | What It Is |
|------|-----------|
| [PROJECT.md](PROJECT.md) | Project overview, constraints, key decisions |
| [ROADMAP.md](ROADMAP.md) | 5-phase roadmap with success criteria |
| [REQUIREMENTS.md](REQUIREMENTS.md) | All requirements (COPY, DESGN, HOME, DEMO, etc.) |
| [REDESIGN-PROMPT.md](REDESIGN-PROMPT.md) | Original redesign brief |

## Phases

| Phase | Folder | Status |
|-------|--------|--------|
| **1. Content & Cleanup** | [phases/phase-1-content/](phases/phase-1-content/) | ✅ COMPLETE |
| **2. Design System** | [phases/phase-2-design/](phases/phase-2-design/) | ⏳ Next |
| **3. Website Structure** | [phases/phase-3-structure/](phases/phase-3-structure/) | — |
| **4. Interactive Demos** | [phases/phase-4-demos/](phases/phase-4-demos/) | — |
| **5. Polish & Ship** | [phases/phase-5-polish/](phases/phase-5-polish/) | — |

## Research

| File | What It Is |
|------|-----------|
| [research/ARCHITECTURE.md](research/ARCHITECTURE.md) | Component architecture, file structure |
| [research/STACK.md](research/STACK.md) | Technology decisions |
| [research/FEATURES.md](research/FEATURES.md) | Feature analysis (must-have vs differentiators) |
| [research/PITFALLS.md](research/PITFALLS.md) | Watch-outs and risks |
| [research/SUMMARY.md](research/SUMMARY.md) | Research synthesis |
| [research/Components For Leviathan.txt](research/Components%20For%20Leviathan.txt) | 21st.dev component references |

---

### How This Works

Each phase gets its own folder under `phases/`. When you start a phase:
1. `/discuss-phase N` → discussion decisions go in `phases/phase-N/DECISIONS.md`
2. `/plan N` → execution plan goes in `phases/phase-N/PLAN.md`
3. `/execute N` → work happens, output docs go in the phase folder
4. `/verify N` → verification results go in `phases/phase-N/VERIFICATION.md`

Phase 1's `DECISIONS.md` and `CONTENT-SPEC.md` are the backbone — every future phase references them.
