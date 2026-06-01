---
title: Authentication
---

# Authentication

AdsWire uses OAuth 2.0. You connect once through your AI client's
connector UI. After that, your agent carries the token automatically.

## OAuth flow

1. Add your MCP endpoint URL to your AI client
2. Your client shows a **Connect** button
3. You click Connect → AdsWire opens a consent screen
4. You choose what your agent is allowed to do:
   - **Read** — view campaigns, reports, and account data (always included)
   - **Create** — create campaigns, ad groups, keywords and ads
   - **Update** — change bids, budgets, statuses and ad copy
   - **Remove** — delete campaigns, ad groups, keywords and ads
5. You click Connect → your AI client receives a token
6. All subsequent requests are authenticated automatically

## Managing connections

**View active connections:** Settings → Connected apps

**Change permissions:** Disconnect and reconnect — the consent screen reappears

**Revoke access:** Settings → Connected apps → Disconnect

## Token behaviour

Access tokens expire after 1 hour. Your AI client refreshes them automatically
using the refresh token (valid 30 days). No action required from you.

If your token becomes invalid (revoked, expired refresh), your AI client will
prompt you to reconnect.
