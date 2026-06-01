# Design Implementation Plan

**DMT:** <https://github.com/orgs/AdsWireIO/projects/1/views/1?pane=issue&itemId=191558001>
**Title:** [docs] docs.adswire.io — Docusaurus on GitHub Pages, first public AdsWireIO repo
**Slug:** docs_adswire_io_implementation_plan.md
**Bucket:** new
**Engineer:** Claude Sonnet 4.6 (agent session)
**DIP Created:** 2026-06-01
**DIP Last Updated:** 2026-06-01
**Board Status:** IN_PROGRESS
**Board Status History:**

- 2026-06-01T00:00:00Z MANDATED — Architect created DMT
- 2026-06-01T00:00:00Z IN_RECON — Engineer session started
- 2026-06-01T00:00:00Z PLANNED — DIP authored; board set via GraphQL mutation
- 2026-06-01T00:00:00Z IN_PROGRESS — Coder session started; board set via GraphQL mutation (option 47fc9ee4)

---

## Mandate Reference

**Architect's Intent (summary):**
> `docs.adswire.io` returns 404, blocking the Anthropic connector directory submission, degrading user trust with technical buyers, and leaving the onboarding "See what AdsWire can do" card pointing at a dead URL. The fix is a public GitHub repository (`AdsWireIO/docs`) running Docusaurus 3 on GitHub Pages with a Cloudflare CNAME, delivering 7 minimum content pages, plus a one-line update in `app.adswire.io` to redirect the onboarding card to the live tools overview page.

**DMT Acceptance Criteria (copied from issue):**

- [ ] `github.com/AdsWireIO/docs` repo created — PUBLIC
- [ ] Docusaurus bootstrapped and builds without errors (`npm run build`)
- [ ] GitHub Actions deploy workflow present
- [ ] DNS CNAME: `docs` → `adswireio.github.io` (Cloudflare, grey cloud)
- [ ] GitHub Pages custom domain: `docs.adswire.io`
- [ ] TLS certificate provisioned by GitHub (can take up to 24 h)
- [ ] `https://docs.adswire.io` loads the Docusaurus site
- [ ] All 7 minimum pages present: index, quickstart, tools, authentication, governance, pricing, changelog
- [ ] Broken link in onboarding explore screen fixed
- [ ] `README.md` complete and accurate
- [ ] "See what AdsWire can do" in onboarding links to live docs URL
- [ ] Anthropic connector directory submission can now include a valid docs URL

**Constraints (from DMT):**

- Repository visibility must be PUBLIC — this is the first public AdsWireIO repo and signals credibility
- Cloudflare proxy must be set to DNS-only (grey cloud) — GitHub Pages requires direct DNS for TLS provisioning
- `routeBasePath: '/'` — docs served at domain root, not under `/docs/`
- No blog, no multi-language content yet (es/fr/pt deferred to Phase 2)
- Algolia DocSearch credentials are not yet obtained — search UI must not ship broken

**Explicitly Out of Scope (from DMT):**

- Algolia DocSearch integration (deferred; requires application approval at docsearch.algolia.com)
- i18n translations (es, fr, pt) — content is English-only at launch
- Individual tool detail pages beyond the tools overview
- Video embeds
- Phase 2 additions listed in DMT

---

## Prerequisites

None — all criteria have confirmed dependencies. The new GitHub repository does not exist yet (confirmed via `gh repo list AdsWireIO`), and the `explore.blade.php` link exists in a clean, working app.adswire.io codebase (confirmed via `git status`).

---

## Scope

**In Scope:**

- Create public GitHub repository `AdsWireIO/docs`
- Bootstrap Docusaurus 3.10.1 (classic preset, TypeScript)
- Write 7 minimum content pages per DMT specification
- Configure `docusaurus.config.ts` and `sidebars.ts` per DMT (with algolia block commented out — see ADR-002)
- Configure GitHub Actions deployment using native GitHub Pages method (see ADR-001)
- Add `static/CNAME` file containing `docs.adswire.io`
- Configure GitHub Pages custom domain in repository settings (manual step)
- Add Cloudflare DNS CNAME record (manual step, requires Cloudflare access)
- Write `README.md` per DMT specification
- Update `explore.blade.php` in `app.adswire.io` to point to `https://docs.adswire.io/tools`

**Out of Scope (Engineer-added, beyond DMT):**

- Any changes to `www.adswire.io` source code (the DIP lives here but no code changes are made here)
- GitHub repository template or branch protection rules (no rules declared in DMT)
- CI status checks or required PR reviews for the new docs repo
- Redirects from `www.adswire.io/docs/` to `docs.adswire.io` (not requested)

**Scope Risk:**

- GitHub Pages TLS provisioning can take up to 24 h after DNS propagation — criterion 6 cannot be verified immediately after criterion 4/5
- DNS propagation for the Cloudflare CNAME can take up to 48 h, though typically minutes with Cloudflare
- The `explore.blade.php` change (Step 15) must not be committed until `https://docs.adswire.io` responds successfully, to avoid pointing users at a still-live 404

---

## Recon Findings

### Codebase / Infrastructure State

- `app.adswire.io/resources/views/livewire/onboarding/explore.blade.php:34` — `href="https://docs.adswire.io"` is the sole docs link across all AdsWire codebases; the URL currently returns 404
- `app.adswire.io` git state: up to date with `origin/main`, working tree clean (verified 2026-06-01)
- `www.adswire.io` git state: 6 commits ahead of `origin/main`, working tree clean (verified 2026-06-01)
- No `docs.adswire.io` DNS CNAME record exists (site returns 404 — confirms no prior partial setup)
- `AdsWireIO/docs` repository does not exist (confirmed via `gh repo list AdsWireIO`)
- No test coverage for `explore.blade.php` — it is a Livewire view template with no dedicated browser or feature test

### Related Prior Mandates

- `docs/mandates/navigation/add_sign_in_nav_link_implementation_plan.md` — VERIFIED; touches `www.adswire.io` navigation, no overlap with this mandate
- `docs/mandates/waitlist/multilingual_waitlist_crud_implementation_plan.md` — unrelated domain
- `app.adswire.io/docs/mandates/` — 20+ mandates, none touch `explore.blade.php` or the docs link

### External Dependencies

**Docusaurus** — fetched from https://docusaurus.io/docs/deployment on 2026-06-01
Installed version: 3.10.1 (latest stable, confirmed via `npm show @docusaurus/core version`)
Finding: Official Docusaurus deployment docs recommend native GitHub Pages Actions (`actions/deploy-pages@v4`) over `peaceiris/actions-gh-pages`. The DMT specifies `peaceiris@v3` which is the legacy method. ADR-001 documents this deviation.

**Node.js** — local environment: v22.22.2 (Docusaurus 3 requires Node ≥ 18.0; constraint satisfied)

**peaceiris/actions-gh-pages** — DMT specifies `@v3`. Docusaurus live docs (fetched 2026-06-01) recommend `actions/deploy-pages@v4` (native method) instead. See ADR-001.

**GitHub Pages custom domain** — requires `static/CNAME` file in the published directory AND the domain configured in repo settings AND a DNS CNAME record pointing to `{org}.github.io`. All three steps must be completed for TLS to be provisioned.

**Cloudflare** — grey cloud (DNS-only) is required for GitHub Pages TLS to work. Cloudflare's proxied mode (orange cloud) intercepts TLS and breaks GitHub's Let's Encrypt challenge.

### Relevant Memory / Session Context

- No project memory file found for this workspace
- www.adswire.io is an Astro SSG codebase; app.adswire.io is Laravel 12 + Jetstream + Livewire. The new docs repo is an independent Docusaurus/Node.js codebase — no framework entanglement
- app.adswire.io AGENTS.md declares: `git push` requires explicit user approval ("Ask First" list)

### Framework Observation

No gaps identified this session. All six recon passes completed without structural awkwardness.

---

## Architecture Decisions

### ADR-001: GitHub Actions Deployment — Native Pages vs. peaceiris@v3

**Decision:** Use the native GitHub Pages deployment method (`actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`) rather than `peaceiris/actions-gh-pages@v3` as specified in the DMT.

**Rationale:** The official Docusaurus documentation (fetched 2026-06-01 from https://docusaurus.io/docs/deployment) recommends the native method. The native method requires no personal access token or SSH key configuration — it uses the built-in `GITHUB_TOKEN`. This is simpler, more secure, and aligned with GitHub's current recommended pattern. The `peaceiris/actions-gh-pages@v3` approach in the DMT is the legacy method written before native GitHub Pages Actions existed.

**Alternatives Considered:** Follow the DMT literally with `peaceiris/actions-gh-pages@v3`. Rejected because: it requires configuring the `gh-pages` deploy key or PAT separately; the native method achieves the same result with zero extra configuration.

**Consequences:** The workflow uses `actions/deploy-pages@v4` instead of `peaceiris/actions-gh-pages@v3`. GitHub Pages source must be set to "GitHub Actions" (not "Deploy from a branch") in the repository's Pages settings. This is a prerequisite the DMT does not explicitly call out.

---

### ADR-002: Algolia Config — Omit Placeholder Block

**Decision:** Comment out the entire `algolia` block in `docusaurus.config.ts` rather than shipping with placeholder values (`YOUR_APP_ID`, `YOUR_SEARCH_API_KEY`).

**Rationale:** Shipping a `themeConfig.algolia` block with placeholder values causes the search box to appear in the UI, but all search requests fail at runtime (invalid API key). A non-functional search box degrades UX more than no search box. The DMT explicitly defers Algolia integration to Phase 2.

**Alternatives Considered:** Ship with placeholders as written in the DMT. Rejected: results in a broken search input on launch.

**Consequences:** The site launches with no search functionality. The `algolia` block comment (`// Add Algolia DocSearch when live`) is retained in the config as a marker for Phase 2.

---

### ADR-003: Onboarding Link Target URL

**Decision:** Update `explore.blade.php` to `href="https://docs.adswire.io/tools"` (the tools overview page), applied only after `https://docs.adswire.io` is confirmed live.

**Rationale:** The card body text reads "Browse the full list of tools available for Google Ads, Meta, and TikTok." The `/tools` page is the most accurate destination for this copy. The DMT explicitly instructs this URL. With `routeBasePath: '/'`, the `docs/tools/index.md` file maps to `/tools`.

**Alternatives Considered:**
1. `https://docs.adswire.io` (root) — valid after launch since `index.md` has `slug: /`, but less specific than `/tools` given the card copy.
2. `https://docs.adswire.io/quickstart` — appropriate for onboarding but doesn't match card body text about "tools".
3. Temporary `https://github.com/AdsWireIO/docs` — the DMT offers this as an interim option but requires a second commit to update later. Rejected: sequencing the link update after docs go live is cleaner.

**Consequences:** The `explore.blade.php` change is gated on Step 14 (docs site confirmed live). If the Coder cannot verify the site is live before completing app.adswire.io work, Step 15 must be deferred.

---

### ADR-004: Local Working Directory for Docs Repo

**Decision:** Bootstrap the Docusaurus project at `/home/ubuntu/code/adswire.io.d/docs.adswire.io/` to match the fleet directory naming convention (all AdsWire codebases live under `/home/ubuntu/code/adswire.io.d/`).

**Rationale:** Consistency with the existing directory structure. The fleet currently has: `app.adswire.io/`, `www.adswire.io/`, `api.adswire.io/`, `console.adswire.io/`. The docs site follows the same convention.

**Alternatives Considered:** Bootstrap directly into a temp directory. Rejected: leaves no local clone for future development sessions.

**Consequences:** The Coder must create the parent directory if needed. The local clone lives at the expected fleet path after this mandate.

---

## Implementation Steps

### Phase 1 — Create and Deploy docs.adswire.io

- [ ] **Step 1:** Create the public GitHub repository.

  ```bash
  gh repo create AdsWireIO/docs \
    --public \
    --description "Documentation for AdsWire — the MCP server for paid media management" \
    --clone \
    --gitignore Node \
    --license MIT
  ```

  Move into the cloned directory and verify:

  ```bash
  cd /home/ubuntu/code/adswire.io.d/docs.adswire.io
  git remote -v
  ```

  **Note:** `gh repo create --clone` clones into a directory named after the repo (`docs`). Rename or re-clone to the fleet path if needed:

  ```bash
  # If cloned as 'docs/', move it:
  mv docs /home/ubuntu/code/adswire.io.d/docs.adswire.io
  cd /home/ubuntu/code/adswire.io.d/docs.adswire.io
  ```

  **Verification:** `gh repo view AdsWireIO/docs --json name,visibility` returns `{"name":"docs","visibility":"PUBLIC"}`.

---

- [ ] **Step 2:** Bootstrap Docusaurus 3.

  From the parent directory (NOT inside the cloned repo):

  ```bash
  cd /home/ubuntu/code/adswire.io.d/
  npx create-docusaurus@latest docs.adswire.io classic --typescript
  ```

  **Note:** This scaffolds into a new directory. If Step 1 already cloned into `docs.adswire.io/`, scaffold into a temp dir and merge, or skip `create-docusaurus` and install packages manually:

  ```bash
  cd /home/ubuntu/code/adswire.io.d/docs.adswire.io
  npm init -y
  npm install --save @docusaurus/core @docusaurus/preset-classic
  npm install --save-dev @docusaurus/types typescript
  ```

  **Preferred approach:** Scaffold fresh, then copy `.git/` from the cloned repo, or scaffold first and push to the newly created GitHub repo:

  ```bash
  # Clean approach:
  cd /home/ubuntu/code/adswire.io.d/
  # Remove the empty cloned dir from Step 1
  rm -rf docs.adswire.io/
  # Scaffold Docusaurus (creates docs.adswire.io/ directory)
  npx create-docusaurus@latest docs.adswire.io classic --typescript
  cd docs.adswire.io/
  git init
  git remote add origin git@github.com:AdsWireIO/docs.git
  ```

  **Verification:** `npm run build` completes without errors and produces a `build/` directory.

---

- [ ] **Step 3:** Replace `docusaurus.config.ts` with the AdsWire configuration.

  Replace the entire file with the following content (verbatim — the `algolia` block is present but commented out per ADR-002):

  ```typescript
  import {themes as prismThemes} from 'prism-react-renderer';
  import type {Config} from '@docusaurus/types';

  const config: Config = {
    title:   'AdsWire Documentation',
    tagline: 'AI executes. You drive the strategy.',
    url:     'https://docs.adswire.io',
    baseUrl: '/',

    organizationName: 'AdsWireIO',
    projectName:      'docs',

    onBrokenLinks:        'throw',
    onBrokenMarkdownLinks: 'warn',

    favicon: 'img/favicon.ico',

    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
      // es, fr, pt — add when content is ready
    },

    presets: [
      [
        'classic',
        {
          docs: {
            routeBasePath: '/',   // docs at root, not /docs/
            sidebarPath:   './sidebars.ts',
            editUrl: 'https://github.com/AdsWireIO/docs/tree/main/',
            showLastUpdateTime: true,
          },
          blog:  false,   // no blog
          theme: {
            customCss: './src/css/custom.css',
          },
        },
      ],
    ],

    themeConfig: {
      navbar: {
        title: 'AdsWire',
        logo: {
          alt: 'AdsWire logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/',            label: 'Docs',      position: 'left'},
          {to: '/tools',       label: 'Tools',     position: 'left'},
          {to: '/quickstart',  label: 'Quickstart', position: 'left'},
          {
            href: 'https://app.adswire.io/register',
            label: 'Start free trial',
            position: 'right',
          },
          {
            href: 'https://github.com/AdsWireIO/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              {label: 'Start free trial', href: 'https://app.adswire.io/register'},
              {label: 'Sign in',          href: 'https://app.adswire.io/login'},
              {label: 'Pricing',          to:   '/pricing'},
            ],
          },
          {
            title: 'Documentation',
            items: [
              {label: 'Quickstart',     to: '/quickstart'},
              {label: 'Tools',          to: '/tools'},
              {label: 'Authentication', to: '/authentication'},
              {label: 'Governance',     to: '/governance'},
            ],
          },
          {
            title: 'Company',
            items: [
              {label: 'adswire.io',   href: 'https://www.adswire.io'},
              {label: 'Contact',      href: 'mailto:hello@adswire.io'},
              {label: 'Privacy',      href: 'https://www.adswire.io/privacy'},
              {label: 'Terms',        href: 'https://www.adswire.io/terms'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} AdsWire. Toronto, Ontario, Canada.`,
      },

      prism: {
        theme:     prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python', 'php'],
      },

      // algolia: {
      //   // Add Algolia DocSearch when live — free for open-source docs
      //   // Apply at: docsearch.algolia.com
      //   // appId:     'YOUR_APP_ID',
      //   // apiKey:    'YOUR_SEARCH_API_KEY',
      //   // indexName: 'adswire',
      // },
    },
  };

  export default config;
  ```

  **Verification:** `npm run build` exits 0 with no TypeScript errors. No search box appears in the built output.

---

- [ ] **Step 4:** Replace `sidebars.ts` with the AdsWire sidebar configuration.

  Replace the entire file:

  ```typescript
  import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

  const sidebars: SidebarsConfig = {
    docs: [
      'index',
      'quickstart',
      {
        type:  'category',
        label: 'Tools',
        link:  {type: 'doc', id: 'tools/index'},
        items: [
          'tools/google-ads/index',
          'tools/google-ads/campaigns',
          'tools/google-ads/ad-groups',
          'tools/google-ads/keywords',
          'tools/google-ads/ads',
          'tools/google-ads/reports',
          'tools/google-ads/budget-pacing',
          'tools/google-ads/diagnostics',
          'tools/adswire/support',
        ],
      },
      'authentication',
      'governance',
      'pricing',
      'changelog',
    ],
  };

  export default sidebars;
  ```

  **Important:** The sidebar references `tools/google-ads/index`, `tools/google-ads/campaigns`, etc. — these files do NOT exist yet (out of scope per DMT Phase 2). To prevent a broken build, the sidebar items that reference non-existent files must be removed. Replace the `items` array inside the Tools category with just the overview, or use a simplified sidebar that only lists existing pages:

  ```typescript
  import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

  const sidebars: SidebarsConfig = {
    docs: [
      'index',
      'quickstart',
      {
        type:  'category',
        label: 'Tools',
        link:  {type: 'doc', id: 'tools/index'},
        items: [],
      },
      'authentication',
      'governance',
      'pricing',
      'changelog',
    ],
  };

  export default sidebars;
  ```

  **Verification:** `npm run build` exits 0 with no broken link errors.

---

- [ ] **Step 5:** Create content files — 7 minimum pages.

  Create the following files verbatim from the DMT content. File paths are relative to the repo root.

  **5a.** `docs/index.md` — What is AdsWire (root slug):

  ```markdown
  ---
  slug: /
  title: What is AdsWire
  sidebar_position: 1
  ---

  # What is AdsWire

  AdsWire is the first [Model Context Protocol](https://modelcontextprotocol.io) (MCP)
  server built for paid media management.

  Your AI agent — Claude Desktop, claude.ai, or any MCP-compatible client —
  gets full operational access to your Google Ads accounts through a single
  authenticated connection. Ask in plain English. The agent executes.
  Every change waits for your approval.

  ## What you can do

  - **Pull performance reports** across all campaigns, ad groups, keywords and ads
  - **Find problems automatically** — disapproved ads, wasted spend, low quality scores
  - **Monitor budgets** — daily pacing alerts before overspend becomes a crisis
  - **Execute changes** — create campaigns, adjust bids, pause underperformers
  - **Audit everything** — every action is logged with a timestamp and operator ID

  ## How it works

  AdsWire sits between your AI agent and the Google Ads API:

  ```text
  Your AI agent (Claude Desktop / claude.ai)
          ↓ MCP protocol
  AdsWire (api.adswire.io)
          ↓ Google Ads API
  Your ad accounts
  ```

  Your agent discovers all available tools automatically via MCP's `tools/list`.
  It knows what it can do before you ask — no manual tool registration.

  ## Get started

  → [Quickstart — connect in 5 minutes](/quickstart)
  → [Browse all tools](/tools)
  → [Start your free trial](https://app.adswire.io/register)
  ```

  **5b.** `docs/quickstart.md` — Quickstart

  **5c.** `docs/tools/index.md` — Tools overview

  **5d.** `docs/authentication.md` — Authentication

  **5e.** `docs/governance.md` — Governance policy

  **5f.** `docs/pricing.md` — Pricing

  **5g.** `docs/changelog.md` — Changelog

  For files 5b–5g, use the full content as specified in the DMT body verbatim. Each file must include the correct frontmatter (`title:`, `sidebar_position:` where applicable).

  **Verification:** All 7 files exist. `npm run build` exits 0. No broken internal links.

---

- [ ] **Step 6:** Create `static/CNAME` with the custom domain.

  Create file `static/CNAME` containing exactly one line:

  ```
  docs.adswire.io
  ```

  No trailing whitespace. No trailing newline beyond the standard Unix LF. This file is copied verbatim into the `build/` directory by Docusaurus and is required by GitHub Pages to recognise the custom domain.

  **Verification:** `cat static/CNAME` outputs `docs.adswire.io`. After `npm run build`, `cat build/CNAME` outputs `docs.adswire.io`.

---

- [ ] **Step 7:** Create the GitHub Actions deployment workflow.

  Create file `.github/workflows/deploy.yml` (create `.github/workflows/` directories if absent):

  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: "pages"
    cancel-in-progress: false

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4

        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm

        - run: npm ci
        - run: npm run build

        - uses: actions/upload-pages-artifact@v3
          with:
            path: build

    deploy:
      needs: build
      permissions:
        pages: write
        id-token: write
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      if: github.ref == 'refs/heads/main'
      steps:
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4
  ```

  **Note:** The `pull_request` trigger runs the build job only (not the deploy job, which is gated by `if: github.ref == 'refs/heads/main'`). This validates PRs without deploying them.

  **Verification:** File exists at `.github/workflows/deploy.yml`. YAML is valid (run `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))"` from repo root).

---

- [ ] **Step 8:** Replace `README.md` with the AdsWire public README.

  Replace the entire file with:

  ```markdown
  # AdsWire Documentation

  Documentation for [AdsWire](https://www.adswire.io) — the first Model Context
  Protocol (MCP) server for paid media management.

  ## Live docs

  → **[docs.adswire.io](https://docs.adswire.io)**

  ## What is AdsWire?

  AdsWire connects your AI agent (Claude Desktop, claude.ai, or any MCP-compatible
  client) to your Google Ads accounts. Your agent creates campaigns, pulls reports,
  monitors budgets, and optimises keywords — in plain English, with your approval
  on every change.

  ## Quickstart

  [docs.adswire.io/quickstart](https://docs.adswire.io/quickstart)

  ## Contributing

  Found an error or want to improve the docs?
  Open a pull request or file an issue.
  All contributions welcome.

  ## AdsWire product

  - Website: [adswire.io](https://www.adswire.io)
  - Start free trial: [app.adswire.io/register](https://app.adswire.io/register)
  - Contact: hello@adswire.io
  - Built in Toronto, Ontario, Canada 🇨🇦
  ```

  **Verification:** `cat README.md` contains the live docs URL and product links.

---

- [ ] **Step 9:** Initial commit and push.

  ```bash
  git add -A
  git commit -m "chore: init Docusaurus with adswire.io theme config"
  git push -u origin main
  ```

  **Verification:** GitHub Actions workflow triggers. Navigate to `https://github.com/AdsWireIO/docs/actions` — the `Deploy to GitHub Pages` workflow run appears and the `build` job completes successfully.

  If content was split across multiple commits per DMT's commit list, use that commit sequence instead. The single commit above is acceptable for the initial bootstrap.

---

- [ ] **Step 10:** Enable GitHub Pages — set source to "GitHub Actions".

  In the GitHub repository settings (UI, not CLI):

  1. Navigate to `https://github.com/AdsWireIO/docs/settings/pages`
  2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
  3. Save

  **Alternative (CLI):**

  ```bash
  gh api --method POST repos/AdsWireIO/docs/pages \
    -f "source[branch]=main" \
    -f "source[path]=/" 2>/dev/null || \
  gh api --method PUT repos/AdsWireIO/docs/pages \
    -f "build_type=workflow" 2>/dev/null || true
  ```

  The GitHub Pages source must be set to "GitHub Actions" for `actions/deploy-pages@v4` to work (per ADR-001). The deploy job will fail with a permissions error if Pages source is set to "Deploy from a branch".

  **Verification:** GitHub Actions deploy job completes successfully and the step `Deploy to GitHub Pages` outputs a URL such as `https://adswireio.github.io/docs/` or `https://docs.adswire.io/`.

---

- [ ] **Step 11:** Add Cloudflare DNS CNAME record.

  In Cloudflare DNS for the `adswire.io` zone (requires Cloudflare dashboard access or API):

  | Type | Name | Content | Proxy status | TTL |
  |------|------|---------|-------------|-----|
  | CNAME | docs | adswireio.github.io | DNS only (grey cloud) | Auto |

  **Critical:** The Proxy status MUST be "DNS only" (grey cloud). If set to "Proxied" (orange cloud), GitHub Pages cannot provision the TLS certificate via Let's Encrypt, and HTTPS will fail.

  **Verification:**

  ```bash
  dig CNAME docs.adswire.io +short
  ```

  Expected output: `adswireio.github.io.`

---

- [ ] **Step 12:** Configure GitHub Pages custom domain.

  In `https://github.com/AdsWireIO/docs/settings/pages`:

  1. Under **Custom domain**, enter `docs.adswire.io`
  2. Click **Save**
  3. GitHub will verify the DNS record and begin TLS provisioning

  The `static/CNAME` file in the repo (Step 6) ensures this setting persists across deploys.

  **Verification:** GitHub Pages settings show `docs.adswire.io` as the custom domain and "DNS check successful". The TLS/HTTPS checkbox may not be available immediately — wait up to 24 h.

---

- [ ] **Step 13:** Verify `https://docs.adswire.io` is live.

  After DNS propagation (typically minutes with Cloudflare) and TLS provisioning (up to 24 h):

  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://docs.adswire.io/
  ```

  Expected: `200`

  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://docs.adswire.io/tools
  ```

  Expected: `200`

  Also verify all 7 required pages return 200:

  ```bash
  for path in "" quickstart tools authentication governance pricing changelog; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "https://docs.adswire.io/${path}")
    echo "${path:-/}: ${code}"
  done
  ```

  All must return `200`. If any return `404` or `301`, investigate sidebar/slug config.

  **Do not proceed to Step 14 until this check passes.**

---

### Phase 2 — Fix Onboarding Link in app.adswire.io

- [ ] **Step 14:** Update `explore.blade.php` to point to the live docs URL.

  In `app.adswire.io` codebase — file: `resources/views/livewire/onboarding/explore.blade.php`

  **Change line 34 only:**

  From:
  ```blade
  href="https://docs.adswire.io"
  ```

  To:
  ```blade
  href="https://docs.adswire.io/tools"
  ```

  No other changes to this file. The surrounding attributes (`target="_blank"`, `rel="noopener noreferrer"`) remain unchanged.

  **Verification:** `grep -n 'docs.adswire.io' resources/views/livewire/onboarding/explore.blade.php` outputs:
  ```
  34:            href="https://docs.adswire.io/tools"
  ```

---

- [ ] **Step 15:** Run app.adswire.io test suite.

  ```bash
  cd /home/ubuntu/code/adswire.io.d/app.adswire.io
  php artisan test --stop-on-failure -q
  ```

  Expected: all tests pass. (The Blade view change has no testable PHP logic — tests verify no regressions elsewhere.)

  **Verification:** Exit code 0.

---

- [ ] **Step 16:** Commit and push app.adswire.io change.

  ```bash
  cd /home/ubuntu/code/adswire.io.d/app.adswire.io
  git add resources/views/livewire/onboarding/explore.blade.php
  git commit -m "fix: update onboarding explore link to live docs URL (docs.adswire.io/tools)"
  ```

  Per app.adswire.io `AGENTS.md`, push requires user approval. Present the commit for review before pushing.

  **Verification:** `git log --oneline -1` shows the fix commit. `git status` is clean.

---

## Rollback Procedure

**docs.adswire.io (new repo — no prior state):**
- The repository did not exist before this mandate. Rolling back means deleting it: `gh repo delete AdsWireIO/docs --yes`. DNS CNAME can be deleted from Cloudflare. No production state is degraded — `docs.adswire.io` was already returning 404 before this mandate.

**app.adswire.io link change (explore.blade.php):**
- `git revert HEAD` in app.adswire.io restores the original `href="https://docs.adswire.io"`. The pre-change state (404 link) is the fallback — no data loss or service degradation.

**DNS CNAME:**
- Delete the `docs` CNAME record in Cloudflare. DNS propagation: typically minutes.

**Irreversible steps:** None. All changes are either file edits (reversible via git) or infrastructure additions (reversible via deletion). No schema migrations, no data mutations.

---

## Instrumentation

None — this mandate does not introduce observable events from AdsWire services.

- The docs site is served entirely by GitHub Pages (no AdsWire server-side code)
- The `explore.blade.php` change modifies an `href` attribute — no server-side logic, no metrics emitted

---

## Verification Checklists

### Functional Checks

- [ ] [REQUIRED] `gh repo view AdsWireIO/docs --json name,visibility` returns `{"name":"docs","visibility":"PUBLIC"}`
- [ ] [REQUIRED] `npm run build` in `docs.adswire.io/` exits 0 with no errors
- [ ] [REQUIRED] `build/CNAME` contains `docs.adswire.io`
- [ ] [REQUIRED] `.github/workflows/deploy.yml` exists and is valid YAML
- [ ] [REQUIRED] All 7 content files exist: `docs/index.md`, `docs/quickstart.md`, `docs/tools/index.md`, `docs/authentication.md`, `docs/governance.md`, `docs/pricing.md`, `docs/changelog.md`
- [ ] [REQUIRED] `README.md` contains `https://docs.adswire.io` and product links
- [ ] [REQUIRED] `curl -s -o /dev/null -w "%{http_code}" https://docs.adswire.io/` returns `200`
- [ ] [REQUIRED] `curl -s -o /dev/null -w "%{http_code}" https://docs.adswire.io/tools` returns `200`
- [ ] [REQUIRED] All 7 page paths return HTTP 200 (see Step 13 curl loop)
- [ ] [REQUIRED] `grep -n 'docs.adswire.io' resources/views/livewire/onboarding/explore.blade.php` (in app.adswire.io) shows `href="https://docs.adswire.io/tools"` at line 34

### Operational Checks

- [ ] [REQUIRED] GitHub Actions workflow `Deploy to GitHub Pages` completes successfully on `main` push
- [ ] [REQUIRED] `dig CNAME docs.adswire.io +short` returns `adswireio.github.io.`
- [ ] [REQUIRED] GitHub Pages custom domain shows `docs.adswire.io` with DNS check successful
- [ ] [OPTIONAL] HTTPS checkbox enabled in GitHub Pages settings (may take up to 24 h after DNS propagation)
- [ ] [REQUIRED] `php artisan test --stop-on-failure -q` in app.adswire.io exits 0

### QA-Specific Checks (from DMT)

- [ ] [REQUIRED] `github.com/AdsWireIO/docs` is publicly accessible to a non-authenticated browser
- [ ] [REQUIRED] Docusaurus site loads at `https://docs.adswire.io` with correct title "AdsWire Documentation"
- [ ] [REQUIRED] Navbar contains: Docs, Tools, Quickstart links (left) + "Start free trial" + GitHub links (right)
- [ ] [REQUIRED] Footer contains: Product, Documentation, Company columns with correct links
- [ ] [REQUIRED] No search box visible (algolia block is commented out per ADR-002)
- [ ] [REQUIRED] Clicking "See what AdsWire can do" card in app.adswire.io onboarding opens `https://docs.adswire.io/tools` in a new tab
- [ ] [REQUIRED] All 7 pages render without broken layout or missing content
- [ ] [OPTIONAL] TLS certificate is valid (`curl -v https://docs.adswire.io/ 2>&1 | grep "SSL certificate verify ok"`)

### Security / Compliance Checks

- [ ] [REQUIRED] No secrets, API keys, or credentials committed to the `AdsWireIO/docs` repository
- [ ] [REQUIRED] The `algolia.apiKey` placeholder is commented out (not present in shipped config)
- [ ] [REQUIRED] All external links use `https://` (no plain HTTP links in content)

### Containment Checks

| Step | Detect | Contain | Recover | Prevent recurrence |
|------|--------|---------|---------|-------------------|
| Step 1 (repo creation) | `gh repo view` fails | No blast radius — new repo only | Delete repo; retry | N/A — one-time op |
| Step 7 (Actions workflow) | Workflow run fails in GitHub Actions UI | Deployment blocked; existing 404 state maintained | Fix workflow YAML; push new commit | YAML lint in local verify |
| Step 10 (Pages source) | Deploy job fails with permissions error | No deployment; docs remain down | Change Pages source to "GitHub Actions" | Document Pages setting requirement (done in Step 10 note) |
| Step 11 (DNS CNAME) | `dig CNAME docs.adswire.io` returns empty | GitHub Pages serves on `adswireio.github.io` fallback | Delete and re-add CNAME; verify grey cloud | Verify proxy status immediately after creation |
| Step 12 (custom domain) | GitHub DNS check fails | Site loads on `adswireio.github.io`; custom domain not yet active | Delete and re-add custom domain after DNS propagates | Run `dig` before setting custom domain |
| Step 14 (explore.blade.php) | Visual inspection shows wrong URL | Only one card in onboarding affected; no data loss | `git revert HEAD` in app.adswire.io | PR review of Blade templates for external links |
| TLS provisioning (gap) | HTTPS returns TLS error | HTTP fallback not configured (GitHub Pages only serves HTTPS) | Wait up to 24 h; if > 48 h, disable and re-enable custom domain | No additional control — GitHub-managed process |

**Known gap — TLS provisioning:** The Detect/Contain/Recover path for TLS provisioning timeout is limited because GitHub manages the Let's Encrypt challenge. If provisioning stalls beyond 48 h, the recommended recovery is: disable the custom domain in GitHub Pages settings → wait 5 min → re-enable. This is a known GitHub Pages behaviour documented in their support docs.

---

## Field Discoveries

| # | Date | Role | Class | Description | Resolution |
|---|------|------|-------|-------------|------------|
| 1 | 2026-06-01 | Engineer | INFO | `peaceiris/actions-gh-pages@v3` specified in DMT is the legacy deployment method; Docusaurus live docs (fetched 2026-06-01) recommend native `actions/deploy-pages@v4` | Documented in ADR-001; DIP uses native method |
| 2 | 2026-06-01 | Engineer | INFO | DMT `sidebars.ts` references `tools/google-ads/*` and `tools/adswire/*` files that do not exist (Phase 2 scope); building with these sidebar entries would fail | Documented in Step 4; Coder must use simplified sidebar with empty `items: []` for Tools category |
| 3 | 2026-06-01 | Engineer | INFO | No test coverage exists for `explore.blade.php`; no existing Blade view tests for onboarding step | Documented in Pass 6; verification is manual inspection + curl check after deployment |
| 4 | 2026-06-01 | Engineer | INFO | Pre-existing staged file found in www.adswire.io at session start: `docs/mandates/marketing/marketing_copy_update_implementation_plan.md` (DIP for mandate 191529248, Board Status: IN_RECON). This file was staged but not committed by a prior session. Not related to this mandate; committed separately in its own `docs(dip):` commit to restore a clean tree. | Committed in standalone commit before this mandate's recon commit. |
| 5 | 2026-06-01 | Coder | DEVIATION | `docs/mandates/` directory untracked in docs repo at Coder entry — LEGITIMATE_RECON_ARTIFACT. Engineer created DIP during recon session but did not commit it. | Committed with `chore: commit Engineer recon artifact — docs/mandates/` before any implementation. |
| 6 | 2026-06-01 | Coder | DEVIATION | `docs/knowledge-graph.yaml` absent at Coder entry — bootstrap condition per Coder protocol (not a block). Engineer recon artifact missing. | Bootstrapped from `docs/harness/templates/knowledge-graph.yaml`; committed as `chore: bootstrap docs/knowledge-graph.yaml from template`. |

---

## Child Tasks

| Task URL | Title | Reason Created | Status |
|----------|-------|---------------|--------|
| — | — | — | — |

---

## Tracker Ops Log

| Timestamp | Operation | Target | Params | Executed? |
|-----------|-----------|--------|--------|-----------|
| 2026-06-01T00:00:00Z | Set Status | PVTI_lADOEJ9A9c4BXiPqzgtq8XE | Status → IN_RECON (option: 8c5cfb23) | Yes — GraphQL mutation succeeded |
| 2026-06-01T00:00:00Z | Set Status | PVTI_lADOEJ9A9c4BXiPqzgtq8XE | Status → PLANNED (option: c980c32c) | Yes — GraphQL mutation succeeded |
| 2026-06-01T00:00:00Z | Add comment | PVTI_lADOEJ9A9c4BXiPqzgtq8XE | "DIP authored at docs/mandates/docs/docs_adswire_io_implementation_plan.md. Ready for Coder." | NOT EXECUTED — board item is a DraftIssue; draft items have no comment thread via GitHub API. Comment intent recorded here. |
| 2026-06-01T00:00:00Z | Set Status | PVTI_lADOEJ9A9c4BXiPqzgtq8XE | Status → IN_PROGRESS (option: 47fc9ee4) | Yes — GraphQL mutation succeeded |

---

## Task Implementation Report

**Session:** Claude Sonnet 4.6 | 2026-06-01 | PVTI_lADOEJ9A9c4BXiPqzgtq8XE → IN_PROGRESS @ 2026-06-01

### Summary

*Filled at completion.*

### Evidence

*Filled at completion.*

### Blockers

*None.*

### Implementation Notes

#### Pre-implementation (Step 0)

- Git state check: `docs/mandates/` directory untracked in docs repo. Classified: LEGITIMATE_RECON_ARTIFACT. Engineer created DIP during recon but did not commit. Filed DEVIATION 005. Committing before implementation.
- `docs/knowledge-graph.yaml` absent at Coder entry. Bootstrap condition per coder protocol. Filed DEVIATION 006. Bootstrapping from template before implementation.
- Board set IN_PROGRESS 2026-06-01 via GraphQL mutation (option `47fc9ee4`). Confirmed response: `{"data":{"updateProjectV2ItemFieldValue":{"projectV2Item":{"id":"PVTI_lADOEJ9A9c4BXiPqzgtq8XE"}}}}`
- Tracker Ops Log entry added below.

### Verification Checklist — Coder Sign-Off

- [ ] Every `## Implementation Steps` item checked off
- [ ] Every `[REQUIRED]` item in `## Verification Checklists` checked off
- [ ] All DEVIATION entries filed with resolutions
- [ ] No open BLOCKER discoveries
- [ ] TIR Summary written (2–4 sentences)
- [ ] TIR Evidence has actual output (not placeholder)
- [ ] `git status` clean in every touched codebase

---

## SRE Implementation Report

*Not applicable — this is a code/infra mandate handled by Coder.*

---

## QA Verdict

*QA fills this section after reviewing TIR.*

---

## Post-Close Notes

| Date | Author | Note |
|------|--------|------|
| — | — | — |
