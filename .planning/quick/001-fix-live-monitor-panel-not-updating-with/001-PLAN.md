---
phase: quick-001
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/hooks/useLiveMonitor.js
  - src/hooks/useVapiCall.js
  - src/components/DemoSection.jsx
autonomous: false  # Has checkpoint for browser testing

must_haves:
  truths:
    - "LiveMonitorTerminal displays data during active Vapi call"
    - "Field cards update when call data changes"
    - "Summary appears after call ends"
  artifacts:
    - path: "src/hooks/useLiveMonitor.js"
      provides: "Polling hook with debug logging"
      exports: ["useLiveMonitor"]
    - path: "src/hooks/useVapiCall.js"
      provides: "Vapi integration with session tracking"
      exports: ["useVapiCall"]
  key_links:
    - from: "useVapiCall"
      to: "DemoSection"
      via: "sessionId prop"
      pattern: "sessionId.*handleCallStart"
    - from: "useLiveMonitor"
      to: "n8n webhook"
      via: "fetch with demo_session_id"
      pattern: "demo_session_id=.*sessionId"
---

<objective>
Debug and fix live monitor panel data updates from Vapi calls.

Purpose: Ensure the LiveMonitorTerminal displays real-time call data as Vapi extracts information during demo calls. Currently, Vapi calls work but the side panel doesn't update with data.

Output: Working live monitor that displays field updates and summary from Vapi calls.
</objective>

<execution_context>
@C:\Users\owenj\leviathan-systems\.claude\get-shit-done\workflows\execute-plan.md
@C:\Users\owenj\leviathan-systems\.claude\get-shit-done\templates\summary.md
</execution_context>

<context>
@C:\Users\owenj\leviathan-systems\.planning\PROJECT.md
@C:\Users\owenj\leviathan-systems\.planning\STATE.md

# Key components
@C:\Users\owenj\leviathan-systems\src\hooks\useLiveMonitor.js
@C:\Users\owenj\leviathan-systems\src\hooks\useVapiCall.js
@C:\Users\owenj\leviathan-systems\src\components\DemoSection.jsx
@C:\Users\owenj\leviathan-systems\src\components\LiveMonitorTerminal.jsx
@C:\Users\owenj\leviathan-systems\src\components\VapiCallButton.jsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add comprehensive debug logging to trace data flow</name>
  <files>
    src/hooks/useLiveMonitor.js
    src/hooks/useVapiCall.js
    src/components/DemoSection.jsx
  </files>
  <action>
Add detailed console logging to trace the complete data flow from Vapi call start through n8n polling:

**useLiveMonitor.js:**
- Log when startPolling() called with sessionId
- Log fetch URL being called (full URL with query params)
- Log response status and parsed JSON data
- Log when data state updates
- Log changedFields detection results

**useVapiCall.js:**
- Log generated sessionId in startCall()
- Log the complete variableValues object being sent to Vapi
- Log call-start, call-end events with sessionId

**DemoSection.jsx:**
- Log handleCallStart with received sessionId
- Log terminal status transitions
- Log data object when it updates

Use clear prefixes like `[useLiveMonitor]`, `[useVapiCall]`, `[DemoSection]` for easy filtering.

This logging will help identify where in the chain the data flow breaks:
- Is sessionId generated correctly?
- Is sessionId passed to Vapi assistant?
- Is polling hitting the correct endpoint?
- Is n8n returning data?
- Is React state updating?
  </action>
  <verify>
```bash
# Start dev server
npm run dev

# Open browser console and make a test call
# Logs should show complete flow from sessionId generation through polling responses
```
  </verify>
  <done>
Console logs clearly trace sessionId from generation → Vapi call → polling requests → response data.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Debug logging instrumentation across Vapi call and polling flow</what-built>
  <how-to-verify>
1. Open http://localhost:5173 in browser
2. Open browser DevTools Console (F12)
3. Start a demo call by clicking the call button
4. During the call, mention a problem (e.g., "My water heater is leaking")
5. Watch console logs for:
   - `[useVapiCall]` logs showing sessionId generation and Vapi start
   - `[useLiveMonitor]` logs showing polling start and fetch URLs
   - Response logs showing HTTP status and data
   - `[DemoSection]` logs showing terminal status changes
6. End the call
7. Check if polling continues and if summary data arrives

**Expected behavior:**
- SessionId generated and logged
- Polling starts with correct URL format
- GET requests to n8n endpoint every 1 second
- Data appears in response and triggers LiveMonitorTerminal updates

**Look for issues:**
- 404 responses (session not found in n8n)
- Empty data responses (n8n not storing data)
- SessionId mismatch between Vapi and polling
- No polling activity (startPolling not called)
- Data received but terminal not updating (React state issue)
  </how-to-verify>
  <resume-signal>
Paste relevant console logs showing the issue, or type "working" if data flows correctly.

Example issues to report:
- "Getting 404 on all polling requests"
- "Polling never starts - no [useLiveMonitor] logs"
- "Data received but terminal stays on standby"
- "SessionId is undefined in polling URL"
  </resume-signal>
</task>

<task type="auto">
  <name>Task 2: Fix identified issue based on debug findings</name>
  <files>
    src/hooks/useLiveMonitor.js
    src/hooks/useVapiCall.js
    src/components/DemoSection.jsx
    src/components/LiveMonitorTerminal.jsx
  </files>
  <action>
Based on checkpoint findings, apply targeted fix:

**If sessionId not passed to polling:**
- Verify DemoSection.handleCallStart() receives and passes sessionId correctly
- Check startPolling() is called with valid sessionId

**If n8n returns 404:**
- Verify Vapi assistant is configured to POST to n8n webhook with demo_session_id
- Check n8n workflow is storing data with correct session ID key
- Use n8n MCP tools to inspect workflow execution logs

**If data received but terminal not updating:**
- Check data structure matches expected format (data.data.field_name)
- Verify changedFields detection is working
- Check LiveMonitorTerminal props are being updated

**If polling URL malformed:**
- Fix URL construction in useLiveMonitor.fetchData()
- Ensure sessionId is properly URL-encoded

**If polling not starting:**
- Check DemoSection is calling startPolling() on handleCallStart
- Verify sessionId is not null/undefined when passed

Apply the specific fix identified during debugging. Remove debug logs if they're too verbose for production, or leave minimal diagnostic logging.
  </action>
  <verify>
```bash
# With dev server running:
# 1. Make a test call
# 2. Verify LiveMonitorTerminal updates with call data
# 3. Check field cards populate (issue, urgency, location, intent)
# 4. Check summary appears after call ends
# 5. Verify terminal transitions through states: standby → active → processing → captured
```
  </verify>
  <done>
LiveMonitorTerminal displays real-time updates during calls. Field cards populate with extracted data. Summary appears after call completion. Terminal status transitions correctly through all states.
  </done>
</task>

</tasks>

<verification>
Complete verification checklist:

**Data Flow:**
- [ ] SessionId generated on call start
- [ ] SessionId passed to Vapi assistant
- [ ] Polling starts with correct sessionId
- [ ] n8n endpoint returns data for session
- [ ] React state updates with received data

**Visual Behavior:**
- [ ] Terminal status: standby → active (during call) → processing (after call ends) → captured (when summary arrives)
- [ ] Field cards populate during call
- [ ] Field glow animation when values change
- [ ] Summary appears with typewriter effect
- [ ] "You decide what happens next" message appears
- [ ] Event log animates in (CAPTURE, CLASSIFY, QUEUE)

**Edge Cases:**
- [ ] Multiple consecutive calls work correctly
- [ ] Stopping call mid-way doesn't break polling
- [ ] 404 responses don't stop polling (expected during call)
- [ ] Browser console shows no errors
</verification>

<success_criteria>
1. Start demo call → LiveMonitorTerminal transitions to "active" state
2. During call, mention issue → "Issue" field card populates
3. Mention location → "Location" field card populates
4. Field cards glow when new data arrives
5. End call → Terminal shows "Processing..." then "Captured"
6. Summary appears with typewriter animation
7. Event log and control statement appear
8. Second call works the same way (no state pollution)
</success_criteria>

<output>
After completion, create `.planning/quick/001-fix-live-monitor-panel-not-updating-with/001-SUMMARY.md`
</output>
