---
title: Changelog
---

# Changelog

## May 2026

### OAuth 2.0 connector support

AdsWire now supports OAuth 2.0 for Claude Desktop and claude.ai.
Click Connect in your AI client's connector UI — no config files or
Bearer tokens to copy. You choose what your agent is allowed to do
on the consent screen.

### Google Ads — 20 tools live

Full CRUD for campaigns, ad groups, keywords, and ads.
Custom GAQL reports. MCC (Manager Account) support.
Budget pacing monitor with daily alerts and auto-pause.

### Governance policy

Per-tenant, per-tool governance controls with four tiers:
always / audit / confirm / disabled.
Every write operation is logged. Remove operations require confirmation.

### Multi-tenant architecture

Per-tenant PostgreSQL database isolation.
One AdsWire account manages multiple client workspaces.
Each workspace has its own credentials, governance policy, and audit log.
