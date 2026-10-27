# touthor2412.github.io

Touthor's personal story site: https://touthor2412.github.io

It is built with Jekyll, and GitHub Pages builds it for free every time you push.
You only edit text files. There is nothing to install unless you want to preview on your own PC.

## What is where

| What you want to change | File |
|---|---|
| A story | `_posts/` (one file per story) |
| Story topics (the filter buttons) | `_data/tags.yml` |
| Journey timeline | `_data/journey.yml` |
| Home page text | `index.html` |
| Research page text | `research.md` |
| Contact links in the footer | `contact:` in `_config.yml` |
| Photos | `assets/images/` (clean them first, see below) |
| Your profile photo (Home and under each story) | `assets/images/profile/portrait.jpg` |
| Banner photos on Stories | `_data/stories_banner.yml` and `assets/images/stories-banner/` |
| Colors and fonts | `assets/css/site.css` (light and dark values at the top) |

Text in `[square brackets]` is a placeholder. Replace it with your own words.

## Add a new story

1. Make a new file in `_posts/`. The name must be the date, then a short title,
   in lowercase with hyphens and no spaces:

   ```
   _posts/2026-11-15-my-first-winter-in-niigata.md
   ```

2. Copy this into the file and fill it in:

   ```markdown
   ---
   title: "My first winter in Niigata"
   subtitle: "One line that sums up the story"
   tag: "Student life"
   cover: /assets/images/posts/first-winter/cover.jpg
   cover_alt: "Snow on the road outside the university library"
   cover_caption: "Niigata, January 2027"
   ---
   The first two or three sentences. They show as the preview on the story cards.

   <!--more-->

   The rest of the story. Leave an empty line between paragraphs.

   ## A small heading

   More text.

   > A line you want people to remember.
   ```

   - `tag` must be exactly one of the names in `_data/tags.yml`.
   - `cover`, `cover_alt` and `cover_caption` are optional. If you use a cover,
     always write `cover_alt`: a short description of the photo for people who can't see it.
   - Everything above `<!--more-->` is the preview.
   - Reading time and the date are added for you.

3. To keep a story hidden while you are still writing it, add `published: false`
   under `tag:`. Remove that line when it is ready.

4. Publish it (see "Publish your changes" below). It appears at the top of Stories and on Home.

**Markdown basics:** `**bold**`, `*italic*`, `[link text](https://example.com)`,
`## Heading`, `> quote`, and a photo inside a story:
`![What the photo shows](/assets/images/posts/first-winter/snow.jpg)`

## Add a journey step

Open `_data/journey.yml` and add a block in time order (oldest at the top):

```yaml
- when: "April 2027"
  title: "Finishing my master's"
  text: "One or two sentences about this step."
  story: /stories/2027/finishing-my-masters/   # optional: link to a story
```

- `story` is the story's web address: `/stories/<year>/<file name without the date and .md>/`.
- Add `future: true` for a step that hasn't happened yet. It gets a hollow dot.
- Keep the two spaces before `title:`, `text:` and `story:`. YAML cares about spaces.

## Add photos

Every photo must be cleaned before it goes into the site. Cleaning makes it at most
1600px wide and under about 300 KB, and removes hidden data such as the GPS location.
Only use photos you took yourself, or that you have permission to use.

1. Install Pillow once: `python -m pip install Pillow`
2. Clean the photos into a folder for the story (your originals are not changed):

   ```
   python tools/clean_photos.py "C:/Users/me/Pictures/trip/IMG_2041.jpg" --out assets/images/posts/first-winter
   ```

   You can give several photos at once. The new file gets a web-safe name, for example
   `assets/images/posts/first-winter/img-2041.jpg`. Rename it to something clear,
   such as `cover.jpg`, if you like.
3. Before every commit, check that all photos in the site are clean:

   ```
   python tools/clean_photos.py --check assets/images
   ```

   It should say `0 need cleaning`.

iPhone `.heic` photos: export them as JPG first.

**Your profile photo:** clean it with `--out assets/images/profile`, then rename the result
to `portrait.jpg`. It shows at the top of Home and in the author box under each story.
Tall photos work best (4:5, for example 880×1100). Others are cropped to fit.

**Banner photos on Stories:** the photos behind the title at the top of the Stories page
are listed in `_data/stories_banner.yml`. A new one fades in every 5 seconds.

1. Clean the photos into the banner folder:

   ```
   python tools/clean_photos.py "C:/Users/me/Pictures/IMG_2041.jpg" --out assets/images/stories-banner
   ```

2. Rename each cleaned file to the name in `_data/stories_banner.yml` (`banner-1.jpg`,
   `banner-2.jpg`, `banner-3.jpg`), or change `file:` to the new name.

Wide photos work best (for example 1600×900). A dark layer keeps the white title readable,
so any photo works. The photos are only decoration, so they don't need alt text.
A photo listed in the file but missing from the folder is skipped, and with no photos
the banner is plain purple.

**Light and dark mode:** the sun/moon button in the header switches the whole site and
remembers the choice. On a first visit the site follows the visitor's system setting.

## Publish your changes

In the repo folder:

```
git add .
git commit -m "Add story: my first winter in Niigata"
git push
```

Wait a minute or two, then reload https://touthor2412.github.io.
If the site doesn't change, open the repo on GitHub and look at the **Actions** tab.
A red cross means the build failed; click it to see which file has the problem.
The usual cause is a typo in the `---` block at the top of a story or in a `.yml` file.

## Preview on your PC (optional)

1. Install Ruby with the **RubyInstaller "Ruby+Devkit"** package from rubyinstaller.org,
   and run `ridk install` when it asks.
2. In the repo folder, once: `gem install bundler`, then `bundle install`
3. Each time: `bundle exec jekyll serve`, then open http://localhost:4000

Add `--drafts` or `--unpublished` to also see hidden stories.

## Privacy rules

This repo is public: anyone can read every file in it.

- Never add a home address, room number, phone number, student ID or private photos.
- Only put an email in `_config.yml` if it is one you are happy to share publicly.
- Don't add photos of other people without their permission.
- Don't add research data, model files or code from the research repos.
- Always clean photos with `tools/clean_photos.py` before committing them.

## Keeping it safe

- Update Pillow every few months: `python -m pip install --upgrade Pillow`.
  Newer versions fix security bugs in how photos are read.
- Only install from the official places: python.org and PyPI for Python, rubyinstaller.org
  and rubygems.org for Ruby. Copy package names exactly. Fake packages often use
  look-alike names.
- The site only loads its own files and Google Fonts. This rule is the
  `Content-Security-Policy` line in `_includes/head.html`. If you ever add an outside
  script, video or widget, add its web address to that line too, or the browser will block it.
- On GitHub, keep **two-factor authentication** on for your account and keep
  **Enforce HTTPS** ticked under the repo's Settings → Pages.
