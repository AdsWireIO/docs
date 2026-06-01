---
title: Tools overview
sidebar_position: 1
---

# Tools

AdsWire exposes Google Ads operations as MCP tools.
Your AI agent discovers them automatically via `tools/list`.

## Google Ads tools

| Category | Tools | Ability required |
|---|---|---|
| Accounts | list_accounts | read |
| Campaigns | get, create, update, remove | read / create / update / remove |
| Ad groups | get, create, update, remove | read / create / update / remove |
| Keywords | get, create, update, remove | read / create / update / remove |
| Ads | get, create, update, remove | read / create / update / remove |
| Reports | performance, budget pacing, search terms | read |
| Diagnostics | disapproved ads, wasted spend, quality score | read |

## AdsWire tools

| Tool | Description |
|---|---|
| create_support_ticket | File a bug report from your AI agent |
| create_feature_request | Request a new feature |

## Permissions

Each tool requires an OAuth scope. You select these on the consent screen
when connecting. Read-only tools require the `read` scope only.
Destructive tools (remove_*) require the `remove` scope.

→ [Authentication and scopes](/authentication)
→ [Governance policy](/governance)
