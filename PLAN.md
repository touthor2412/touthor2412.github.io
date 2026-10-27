# PLAN.md: Touthor's personal story website

**For:** Claude Code, working in the local clone of `touthor2412.github.io`
**Goal:** Build a personal website of life stories, memories, a journey timeline and a short research page. English only. Hosted free on GitHub Pages at `https://touthor2412.github.io`.
**Design reference:** the `design/` folder in this repo has the approved design for Home, Stories, One story, Journey and Research. Read `design/README.md` first, then match those pages as closely as you can.

Work through the phases in order. Stop at the end of each phase, show Touthor what changed, and wait for an OK before going on.

---

## Rules for the whole project

1. **Jekyll with no external theme.** Write our own small layouts so the site matches the design. GitHub Pages builds Jekyll automatically when we push, so there is no build step to set up.
2. **Only GitHub Pages–supported plugins:** `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`. Nothing else.
3. **No frameworks.** Plain HTML, one CSS file, and at most one small JavaScript file. The site must work with JavaScript turned off.
4. **Privacy first. This repo is public.**
   - Never commit: a home address, room number, phone number, student ID, private photos, other people's photos without permission, or research data and model files.
   - Remove GPS/location data (EXIF) from every photo before committing it. See Phase 5.
   - Never copy anything from the private `koi-ddpm` or `Research` repos into this repo.
5. **Do not invent personal facts.** Keep placeholder text in `[square brackets]` until Touthor writes the real words.
6. Commit after each phase with a clear message. Push only when Touthor says so.

---

## Phase 0: Setup (Touthor does this, Claude Code checks it)

- [ ] On GitHub, create a **public** repo named exactly `touthor2412.github.io` (no README, no license, so the first push is clean).
- [ ] Clone it to the PC, for example next to the other projects:
  `git clone https://github.com/touthor2412/touthor2412.github.io.git`
- [ ] Open the folder in Claude Code and give it this `PLAN.md`.

**Optional, for local preview on Windows** (you can skip it and preview by pushing instead):
- Install Ruby with the **RubyInstaller "Ruby+Devkit"** package, and run `ridk install` when it asks.
- Then, in the repo: `gem install bundler`, then `bundle install`, then `bundle exec jekyll serve`, and open `http://localhost:4000`.

---

## Phase 1: Project skeleton

Create this structure:

```
touthor2412.github.io/
├── _config.yml
├── Gemfile
├── .gitignore
├── README.md                 # how to add a story (Phase 6)
├── index.html                # Home
├── stories.html              # Stories list
├── journey.html              # Journey timeline
├── research.md               # Research page
├── 404.html
├── _layouts/
│   ├── default.html          # header, main slot, footer
│   ├── page.html             # simple pages
│   └── post.html             # one story
├── _includes/
│   ├── head.html             # meta, fonts, CSS, {% seo %}
│   ├── header.html           # logo + nav (marks the current page)
│   ├── footer.html           # contact links + copyright
│   ├── koi-logo.svg          # the small koi mark
│   └── story-card.html       # one card, used on Home and Stories
├── _data/
│   ├── journey.yml           # timeline steps
│   └── tags.yml              # the story topics, in display order
├── _posts/
│   └── 2026-10-24-leaving-laos-for-japan.md   # sample story with placeholders
└── assets/
    ├── css/site.css
    ├── js/stories-filter.js
    └── images/               # posts/, research/, profile/
```

**`_config.yml`:**
```yaml
title: Touthor
description: Stories and memories from Laos, Niigata and everywhere in between.
author: Touthor Hangsengsua
url: "https://touthor2412.github.io"
baseurl: ""
lang: en
timezone: Asia/Tokyo
markdown: kramdown
permalink: /stories/:year/:title/
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
defaults:
  - scope: { path: "", type: "posts" }
    values: { layout: post }
exclude: [PLAN.md, README.md, Gemfile, Gemfile.lock, vendor]
```

**`Gemfile`:**
```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick"   # needed for `jekyll serve` on Ruby 3+
```

**`.gitignore`:** `_site/`, `.jekyll-cache/`, `.sass-cache/`, `vendor/`, `Gemfile.lock`, `Thumbs.db`, `.DS_Store`

**Check:** `bundle exec jekyll build` runs with no errors (or, if you skipped local preview, the GitHub Pages build passes after the first push).

---

## Phase 2: Design system in `assets/css/site.css`

The site has two themes: a **lavender light mode** and a **purple dark mode**. Put every color in CSS custom properties. Light values go on `:root`, and dark values go on `:root[data-theme="dark"]`. Never hard-code a color anywhere else.

**Colors** (every text pair passes the WCAG AA 4.5:1 contrast check in both themes):

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F6F3FC` | `#130E24` | page background |
| `--surface` | `#FFFFFF` | `#1E1738` | cards, buttons |
| `--ink` | `#1D1533` | `#F4F0FF` | main text |
| `--muted` | `#5B5374` | `#B8ADDC` | secondary text |
| `--line` | `#E3DCF4` | `#352B5E` | borders |
| `--line-strong` | `#CFC4EE` | `#4A3D80` | button borders, timeline line |
| `--soft` | `#ECE6FB` | `#1B1432` | soft bands, tag pills, current nav item |
| `--ph`, `--ph2`, `--ph3` | `#DCD1F6`, `#E6DDF8`, `#D4CBF2` | `#2C2354`, `#33285F`, `#271F4C` | photo placeholders |
| `--accent` | `#6A4BD6` | `#B19CFF` | purple: big headline words, links, buttons |
| `--on-accent` | `#FFFFFF` | `#130E24` | text on accent buttons |
| `--accent-hover` | `#5236B8` | `#CDBEFF` | link hover |
| `--panel` | `#6A4BD6` | `#3B2A82` | big purple panels |
| `--panel-text` / `--panel-muted` | `#FFFFFF` / `#E7E0FF` | `#FFFFFF` / `#D9CFFF` | text on panels |
| `--koi` | `#C8432C` | `#FF8068` | the red patches on the koi logo only |
| `--footer` | `#1D1533` | `#0C0918` | footer background |
| `--footer-text` / `--footer-muted` | `#F4F0FF` / `#B9B0D6` | `#F4F0FF` / `#B8ADDC` | footer text |
| `--ring` | `#C9BCF2` | `#4A3D80` | decorative ring around the slideshow |
| `--shadow` | `0 14px 36px rgba(60,40,140,0.10)` | `0 14px 36px rgba(0,0,0,0.35)` | card shadow |

Also set `color-scheme: light` on `:root` and `color-scheme: dark` on the dark theme, so scrollbars and form controls match.

**Fonts** (Google Fonts, one `<link>` in `head.html`):
- Headings, logo, big display words: **Outfit** (500, 600, 700, 800)
- Body text, buttons, labels and stories: **DM Sans** (400, 400 italic, 500, 700)
- Fallback: `system-ui, sans-serif`

**Display style** (inspired by a bold fashion-site look):
- Page titles use two lines: a smaller line in `--ink` (Outfit 700), then a huge UPPERCASE word in `--accent` (Outfit 800, letter-spacing −0.03em, line-height 0.95). Examples: "Hi, I'm" / "TOUTHOR", "Moments worth keeping" / "STORIES", "Step by step" / "MY JOURNEY", "Teaching a computer to" / "JUDGE KOI".
- Small 4-point sparkle icons (✦) as accents next to labels. They are decorative, so use `aria-hidden="true"`.
- Small "pill" labels with an outline, like "✦ Niigata, Japan · originally from Laos".

**Reading rules** (from common readability guidance):
- Story body text: 19px DM Sans, line-height 1.75, column at most **680px** wide (about 65–70 characters per line).
- Other body text: at least 17–18px, line-height 1.6.
- Headings: line-height 0.95–1.25, slight negative letter-spacing on big ones.

**Shape and spacing:**
- Card radius 24–28px, big panels 36px, the footer has 36px rounded top corners, and buttons are pills (`border-radius: 999px`).
- The main filled button is dark (`--ink` background, `--bg` text) with a round accent circle holding an arrow at the right end. Secondary buttons have an accent outline.
- Section padding about 72–96px top/bottom on desktop and 48px on mobile. Side gutter 40px on desktop and **16px on phones**.
- Content max-width 1120px (Home), 1000px (Research), 880px (Journey), 680px (story text).

**Accessibility:**
- Every link and button is at least 44px tall.
- Visible `:focus-visible` outline (`3px solid var(--accent)`, offset 3px).
- A "Skip to content" link at the top of `default.html`.
- The current nav item gets `aria-current="page"` and a 2px accent underline.
- Decorative SVGs get `aria-hidden="true"`. Every real image needs meaningful `alt` text.
- Respect `prefers-reduced-motion` and keep motion to small hover effects only.

**Responsive:** no horizontal scroll at 360px wide. Nav wraps under the logo on small screens. Card rows become one column.

---

## Phase 3: Layouts and includes

- **`header.html`**: koi logo + "TOUTHOR" (Outfit 800, letter-spacing 0.06em) on the left. Nav on the right: Home, Stories, Journey, Research, Contact (Contact links to `/#contact`). Nav items are pills, and the current page gets a `--soft` background with `--accent` text. Highlight the current page by comparing `page.url`. After the nav, add the **theme toggle button** (see Phase 3b).
- **`footer.html`** (`id="contact"`, dark `--ink` background): short tagline, a "Say hello" list of links pulled from `_config.yml` (`contact.email`, `contact.github`, `contact.linkedin`; leave the email empty until Touthor gives a **public** address), and the line "© {{ year }} Touthor Hangsengsua · Hosted on GitHub Pages".
- **`koi-logo.svg`**: a simple koi side view: white body with a dark outline, two red patches, and a small eye. Copy the SVG path from the design. Its red uses `currentColor` or the accent.
- **`story-card.html`**: tag pill, title linked to the post, a two-line excerpt (`post.excerpt | strip_html | truncate: 160`), and "Read the story →".
- **`post.html`**: "← All stories" link; tag, date and reading time (words ÷ 200, rounded up); title; italic subtitle from `subtitle:`; a large cover image with caption (only if `cover:` is set); the body in the 680px serif column; an author box; older/newer story links (`page.previous` / `page.next`).

---

## Phase 3b: Light / dark mode toggle

- **The button:** a 44×44px round button in the header with a `--line-strong` border and a `--surface` background. It shows a **moon** icon in light mode and a **sun** icon in dark mode. Use `aria-label="Dark mode"` and `aria-pressed="true|false"`.
- **How it works:** clicking it sets `data-theme="dark"` or `data-theme="light"` on `<html>` and saves the choice in `localStorage` under the key `theme`. Wrap storage in `try/catch`, because it can fail in private windows.
- **First visit:** if nothing is saved, follow the visitor's system setting (`prefers-color-scheme: dark`).
- **No white flash:** put a tiny inline `<script>` at the very top of `<head>` (before the CSS loads) that reads the saved choice or the system setting and sets `data-theme` right away.
- **Smooth change:** `transition: background-color .3s, color .3s` on `body`, turned off for `prefers-reduced-motion: reduce`.
- **Without JavaScript,** the site uses the system setting through a `@media (prefers-color-scheme: dark)` block, and the toggle button is hidden.
- Put the code in `assets/js/theme.js` (except the small inline script in the head).

---

## Phase 4: Pages (match each artboard)

1. **Home (`index.html`)**
   - Hero, left side: an outlined pill "✦ Niigata, Japan · originally from Laos"; a two-line title, "Hi, I'm" then a huge purple "TOUTHOR"; a one-sentence intro; two buttons, "Read my stories" (dark pill with an accent arrow circle) and "See my journey" (accent outline).
   - Hero, right side: **one profile photo** (`assets/images/profile/portrait.jpg`) in a 4:5 box with 32px corners, at most 440px wide, with a thin rotated decorative ring (`--ring`) behind it and a sparkle at the top right. No slideshow here.
   - A big purple **panel** (`--panel`, 36px corners): "What you'll find here" / "Where memories meet the things I learn", plus 3 round-icon links: Stories, Journey, Research.
   - "Latest stories": the 3 newest posts as cards with a photo at the top, and "All stories →".
   - "A little about me" band on `--soft`, with the words "about me" in accent.
   - "A little science, too" card that links to Research.
   - Footer with contact.
2. **Stories (`stories.html`)**
   - A **hero banner** with a background photo slideshow: a full-width box (36px corners, at least 400px tall) whose background cycles through 3 photos listed in `_data/stories_banner.yml` (`assets/images/stories-banner/`). The photo changes every 5 seconds and loops, with a 1.2s crossfade and a slow, gentle zoom. There are **no buttons**. Only small non-clickable bars show which photo is on screen. A dark overlay (`rgba(19,14,36,0.45)`) keeps the white title text readable on any photo. The text on top reads "Moments worth keeping" (white), a huge "STORIES" (`#D9CFFF`) and the intro line. With reduced motion turned on, show the first photo still. Without JavaScript, show the first photo. The photos are decorative (`aria-hidden`), so the title is what screen readers read. Code: `assets/js/banner.js`.
   - Topic filter buttons from `_data/tags.yml`: All, Moving to Japan, Student life, Food and places, Work, Research. Each is a real `<button>` with `aria-pressed`.
   - `stories-filter.js` hides cards whose `data-tag` doesn't match. With JavaScript off, every story shows and the buttons are hidden.
   - A list of wide cards: photo on the left (4:3), with tag, date, reading time, title and excerpt. Newest first.
3. **One story (`_layouts/post.html`)**: as described in Phase 3.
4. **Journey (`journey.html`)**
   - A vertical timeline built from `_data/journey.yml` (fields: `when`, `title`, `text`, optional `story` URL, optional `future: true`).
   - Use an `<ol>` with a left line. Past steps get a filled accent dot, and future steps get a hollow dot.
   - Show "Read the story →" only when `story` is set.
   - Seed it with the six steps from the design and keep the bracketed placeholders.
5. **Research (`research.md`, layout `page`)**
   - Copy the text from the Research artboard: the hero, "The idea in three steps" (numbered cards), the three-image strip (original → noise → rebuilt, as placeholders for now), "Why it matters" and "For the curious", and "Talks and papers".
   - **Don't add numbers, results, dataset images or code** until Touthor says they are public. Award koi photos may belong to other people, so leave the image strip as placeholders.
6. **404.html**: a friendly "This page swam away" message, the koi mark, and a link home.

---

## Phase 5: Content workflow and photos

- **A story is one file** in `_posts/` named `YYYY-MM-DD-short-title.md` (lowercase, hyphens, no spaces):
  ```markdown
  ---
  title: "Leaving Laos for Japan"
  subtitle: "[One line that sums up the story]"
  tag: "Moving to Japan"        # must match a name in _data/tags.yml
  cover: /assets/images/posts/leaving-laos/cover.jpg   # optional
  cover_alt: "[What the photo shows]"
  cover_caption: "[Where and when]"
  ---
  [Story text in plain Markdown. Short paragraphs.]
  ```
- To hide an unfinished story, add `published: false`.
- **Photos:** keep each photo under about 300 KB and 1600px wide, saved as `.jpg` or `.webp`.
- **Remove location data** before committing. Add a small script, `tools/clean_photos.py` (Python + Pillow), that resizes images and saves them without EXIF, then run it on every new photo. Document it in the README.

---

## Phase 6: README, go live and checks

1. Write `README.md` for Touthor in simple English:
   - how to add a new story, step by step, with the template above;
   - how to add a journey step;
   - how to add and clean photos;
   - how to preview locally (optional) and how to publish (`git add`, `git commit`, `git push`).
2. Before the first push, check:
   - [ ] No bracketed placeholder appears on a page Touthor wants live, or he has agreed to leave it for now.
   - [ ] Search the repo for private information: address, room, phone, and any email except a public one.
   - [ ] Every image has `alt` text and no GPS data.
   - [ ] Pages look right at 360px, 768px and 1280px wide, in **both** light and dark mode.
   - [ ] Reloading the page keeps the chosen theme, and there is no white flash in dark mode.
   - [ ] Keyboard only: Tab reaches every link and button, and focus is visible.
   - [ ] The Lighthouse accessibility score is 95 or higher.
3. Push to `main`. On GitHub, go to **Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)` → Save**.
4. Wait a minute or two, then open `https://touthor2412.github.io`. If the build fails, GitHub shows the error under the repo's **Actions** tab.

---

## Later ideas (not now)

- A "Photos" gallery page
- A "Now" page that says what Touthor is doing this month
- Thai or Japanese versions of selected stories
- A custom domain such as `touthor.com` (costs about 10–20 USD a year; GitHub Pages supports it under Settings → Pages)
