---
title: Connecting AdsWire on a Google Workspace account
---

# Connecting AdsWire on a Google Workspace account

## Why you're seeing "This app is blocked"

Google shows two different screens when an OAuth app isn't fully trusted by
your organization:

- **"Google hasn't verified this app"** — has a Continue button. You can
  proceed. This means your Workspace policy isn't restricting third-party
  apps, or AdsWire is already on a trusted list.
- **"This app is blocked"** — a red warning with no Continue button. This is
  a hard block. Your Workspace admin has restricted third-party OAuth
  connections, and only your admin can resolve it.

AdsWire is a **Verified** Google OAuth application. If you're seeing the
blocked screen, it's a Workspace admin policy issue, not a problem with
AdsWire's own verification status.

## What your IT admin needs to do

1. Go to [admin.google.com](https://admin.google.com)
2. Navigate to **Security → Access and data control → API controls**
3. Under **App access control**, click **Manage Third-Party App Access**
4. Click **Configure new app**
5. Search for `adswire`, or search by Client ID (see below)
6. Select **AdsWire** (Web · Verified ✓)
7. Choose scope — entire organization, or specific organizational units
8. Set access level to **Trusted**
9. Click **Save**

## Client IDs

If your admin searches by Client ID instead of app name:

```
Primary:   893955179587-01ame754oc9r1orbmahr89a526637ij.apps.googleusercontent.com
Secondary: 893955179587-3nbfou8hvc3ltd8bok9cnqo3f2umn79.apps.googleusercontent.com
```

Both are marked **Verified ✓** in the Google Workspace admin console.

## How long it takes

Changes take effect within minutes, but may take up to 24 hours to fully
propagate across all active sessions in your organization.

## Not on Google Workspace?

If you're using a personal Gmail account, you won't see the blocked screen.
Go back and try connecting again — you should see the "Google hasn't
verified this app" screen instead, which has a Continue button.

## Related

Send your admin a [ready-to-send email](https://app.adswire.io/help/workspace-access)
with these exact steps.
