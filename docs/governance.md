---
title: Governance
---

# Governance policy

AdsWire enforces a four-tier governance policy on every tool call.
Tenant admins configure it. It cannot be overridden by the user or the agent.

## Tiers

| Tier | Name | Behaviour | Default tools |
|---|---|---|---|
| 1 | Always | Executes immediately, no log | Navigation, read-only reports |
| 2 | Audit | Executes immediately, writes audit log | Create, update operations |
| 3 | Confirm | Requires two-step confirmation token | Remove operations |
| 4 | Disabled | Tool is unavailable — not shown in tool list | Configurable per tenant |

## Configuration

Tenant admins configure governance policy at:
**Settings → Governance policy**

Each of the 20+ tools has its own tier setting.
Changes take effect within 5 minutes (5-minute cache TTL).

## Audit log

Every tier 2 and tier 3 action is written to the audit log with:
- Timestamp
- Tool name
- Parameters used
- User email
- OAuth token used

View your audit log at: **Settings → Audit log**
