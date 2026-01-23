# Quick Task 001: Fix Live Monitor Panel

**Status:** ✅ Complete
**Date:** 2026-01-23

## Problem

Live monitor panel (LiveMonitorTerminal) was not updating with call data during Vapi calls. The Vapi calling functionality worked perfectly, but no data was flowing to the side panel.

## Root Cause

**Vapi assistant was not configured to call the n8n webhook.**

The entire data flow infrastructure was in place:
- ✅ Website correctly generated `demo_session_id` and passed to Vapi
- ✅ n8n webhook (`POST /demo/update`) was ready and tested
- ✅ n8n GET endpoint (`GET /demo/latest`) was working
- ✅ `useLiveMonitor` polling hook was implemented
- ✅ `LiveMonitorTerminal` component was ready to display data

But the critical link was missing: **Vapi assistant had no function tool configured to POST data to n8n during calls.**

## Solution

Configured Vapi assistant (ID: `955decb7-0492-40c9-b788-0b0e16f73a0a`) with custom function tool via Vapi API:

### 1. Added Function Tool
```json
{
  "type": "function",
  "async": true,
  "function": {
    "name": "update_demo_session",
    "description": "Update the live monitor with caller information as you gather it",
    "parameters": {
      "type": "object",
      "properties": {
        "demo_session_id": {"type": "string"},
        "status": {"type": "string", "enum": ["active_call", "call_ended"]},
        "name": {"type": "string"},
        "location": {"type": "string"},
        "issue": {"type": "string"},
        "intent": {"type": "string", "enum": ["repair_request", "emergency", "estimate", "general_inquiry"]},
        "urgency": {"type": "string", "enum": ["emergency", "urgent", "routine"]},
        "callback_number": {"type": "string"},
        "final_summary": {"type": "string"}
      },
      "required": ["demo_session_id"]
    }
  },
  "server": {
    "url": "https://systems.leviathan-systems.com/webhook/demo/update",
    "timeoutSeconds": 20
  }
}
```

### 2. Updated System Prompt
Instructed assistant to:
- Call `update_demo_session` tool multiple times during conversation
- Pass `{{demo_session_id}}` variable (provided by Vapi)
- Update monitor as details are gathered (name, location, issue, urgency)
- Send final update at call end with `status="call_ended"` and `final_summary`

## Data Flow (Now Working)

```
1. User clicks call
   ↓
2. useVapiCall generates demo_session_id (UUID)
   ↓
3. Vapi call starts with variableValues: {demo_session_id: "..."}
   ↓
4. During conversation, assistant calls update_demo_session tool
   ↓
5. Vapi POSTs to n8n: https://systems.leviathan-systems.com/webhook/demo/update
   ↓
6. n8n validates + stores in Redis: leviathan:demo:{session_id}
   ↓
7. useLiveMonitor polls GET endpoint every 1 second
   ↓
8. n8n returns data from Redis
   ↓
9. LiveMonitorTerminal updates with real-time data
```

## Files Modified

- `src/hooks/useVapiCall.js` - Removed debug logging (kept session ID generation)
- `.planning/quick/001-.../vapi-assistant-config.json` - Tool configuration reference

## External Changes

- **Vapi Assistant** (`955decb7-0492-40c9-b788-0b0e16f73a0a`):
  - Added `update_demo_session` function tool
  - Updated system prompt with tool usage instructions
  - Tool POSTs to: `https://systems.leviathan-systems.com/webhook/demo/update`

## Testing

Test the fix:
1. `npm run dev`
2. Open http://localhost:5173
3. Click "Start Demo Call"
4. During call, mention a problem (e.g., "My water heater is leaking in Toronto")
5. Watch live monitor panel update in real-time with:
   - Name
   - Location (city)
   - Issue description
   - Urgency classification
   - Final summary (at call end)

## Why This Happened

The v1.0 implementation focused on building the infrastructure (n8n webhooks, polling hooks, UI components) but the Vapi assistant configuration was incomplete. The assistant's system prompt *mentioned* calling a tool, but the tool itself wasn't defined in the assistant's `model.tools` array.

## Prevention

When integrating external services (like Vapi):
1. Verify both sides of the integration are configured
2. Test end-to-end data flow, not just individual components
3. Check service dashboards/configurations match code expectations

---

**Commit:** See git history
**Time to fix:** ~45 minutes (diagnosis + Vapi API configuration)
