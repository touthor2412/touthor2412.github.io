# PLAN.md: Touthor's personal story website

**For:** Claude Code, working in the local clone of `touthor2412.github.io`
**Goal:** Build a personal website of life stories, memories, a journey timeline and a short research page. English only. Hosted free on GitHub Pages at `https://touthor2412.github.io`.
**Design reference:** the "Touthor Personal Site Design" canvas (5 artboards: Home, Stories, One story, Journey, Research). Match it as closely as you can.

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
    ├── css/style.css
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

## Phase 2: Design system in `assets/css/style.css`

Put these exact values at the top as CSS custom properties.

**Colors** (all text pairs pass the WCAG AA 4.5:1 contrast check):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FBFAF8` | page background (warm off-white) |
| `--surface` | `#FFFFFF` | cards |
| `--ink` | `#17222B` | main text, dark footer (15.5:1 on bg) |
| `--muted` | `#4F5B65` | secondary text (6.7:1 on bg) |
| `--line` | `#E1DFD9` | borders |
| `--water` | `#E6EEF1` | soft bands, tag pills |
| `--water-2` | `#DCE7EB` | photo placeholders |
| `--accent` | `#B8341F` | koi red: buttons, links, dates (5.7:1 on bg; white text on it 5.9:1) |
| `--accent-hover` | `#8E2614` | link hover |
| `--footer-muted` | `#AEBBC3` | small text on the dark footer (8.2:1) |

**Fonts** (Google Fonts, one `<link>` in `head.html`):
- Headings, navigation, buttons, labels: **Bricolage Grotesque** (500, 700)
- Story text and long paragraphs: **Source Serif 4** (400, 400 italic, 600)
- Fallbacks: `system-ui, sans-serif` and `Georgia, serif`

**Reading rules** (from common readability guidance):
- Story body text: 20px, line-height 1.7, column at most **680px** wide (about 65–70 characters per line).
- Other body text: at least 17–18px, line-height 1.6.
- Headings: line-height 1.05–1.25, slight negative letter-spacing on big ones.
- Page title size: `clamp(40px, 6vw, 56px)`; Home hero: `clamp(44px, 7vw, 68px)`.

**Shape and spacing:**
- Card radius 18px, big panels 24px, buttons are pills (`border-radius: 999px`).
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

- **`header.html`**: koi logo + "Touthor" on the left. Nav on the right: Home, Stories, Journey, Research, Contact (Contact links to `/#contact`). Highlight the current page by comparing `page.url`.
- **`footer.html`** (`id="contact"`, dark `--ink` background): short tagline, a "Say hello" list of links pulled from `_config.yml` (`contact.email`, `contact.github`, `contact.linkedin`; leave the email empty until Touthor gives a **public** address), and the line "© {{ year }} Touthor Hangsengsua · Hosted on GitHub Pages".
- **`koi-logo.svg`**: a simple koi side view: white body with a dark outline, two red patches, and a small eye. Copy the SVG path from the design. Its red uses `currentColor` or the accent.
- **`story-card.html`**: tag pill, title linked to the post, a two-line excerpt (`post.excerpt | strip_html | truncate: 160`), and "Read the story →".
- **`post.html`**: "← All stories" link; tag, date and reading time (words ÷ 200, rounded up); title; italic subtitle from `subtitle:`; a large cover image with caption (only if `cover:` is set); the body in the 680px serif column; an author box; older/newer story links (`page.previous` / `page.next`).

---

## Phase 4: Pages (match each artboard)

1. **Home (`index.html`)**
   - Hero: small line "Niigata, Japan · originally from Laos"; big "Hi, I'm Touthor."; a one-sentence intro; two buttons, "Read my stories" (filled accent) and "See my journey" (outline). On the right, a portrait at 4:5 with rounded corners (`assets/images/profile/portrait.jpg`). Until it exists, show the soft blue placeholder with the koi mark.
   - "Latest stories": the 3 newest posts as cards, with "All stories →".
   - "A little about me" band on `--water`.
   - "A little science, too" card that links to Research.
   - Footer with contact.
2. **Stories (`stories.html`)**
   - Title and intro line.
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
   - [ ] Pages look right at 360px, 768px and 1280px wide.
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
