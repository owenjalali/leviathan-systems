# Roadmap: Leviathan Systems Website

**Milestone:** v1.1 Bug Fix
**Created:** 2026-01-23

## Phase Overview

| # | Phase | Goal | Requirements | Status |
|---|-------|------|--------------|--------|
| 5 | Live Monitor Debug | Fix real-time data flow from Vapi → n8n → LiveMonitorTerminal | BUG-01 | Pending |

---

## Phase 5: Live Monitor Debug

**Goal:** Diagnose and fix the data flow issue preventing LiveMonitorTerminal from updating during Vapi calls

**Requirements:**
- BUG-01: Live monitor panel correctly receives and displays data from Vapi calls in real-time

**Success Criteria:**
1. useLiveMonitor hook successfully polls n8n webhook and receives data
2. LiveMonitorTerminal displays real-time updates (name, phone, service, notes) during active call
3. Demo session ID correctly links Vapi call to n8n webhook data
4. All components work end-to-end: Vapi → n8n → GET endpoint → useLiveMonitor → LiveMonitorTerminal

**Investigation Areas:**
- n8n workflow: Verify Vapi webhook is triggering and storing data correctly
- n8n GET endpoint: Confirm demo_session_id query parameter works
- useLiveMonitor hook: Check polling logic, error handling, data parsing
- LiveMonitorTerminal: Verify component receives and renders data updates
- Vapi integration: Confirm demo_session_id is being sent with calls

---

## Phase Dependencies

No dependencies - single phase for bug fix.

---

*Roadmap created: 2026-01-23*
*Last updated: 2026-01-23 after v1.1 initialization*
