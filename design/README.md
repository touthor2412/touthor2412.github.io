# Design reference

These files are the **approved design** for the site, exported from the design canvas. They are a reference for building the real Jekyll pages, **not** pages of the site. `_config.yml` excludes this folder, so GitHub Pages never publishes it.

| File | Page | Becomes |
|---|---|---|
| `Main.dc.html` | Home | `index.html` |
| `Stories.dc.html` | Stories list | `stories.html` |
| `Story.dc.html` | One story | `_layouts/post.html` |
| `Journey.dc.html` | Journey timeline | `journey.html` |
| `Research.dc.html` | Research | `research.md` |

## How to read them

- They use a design-tool format (`<x-dc>`, `{{holes}}`, `<sc-for>` loops, `<sc-if>` conditions). They won't open correctly in a browser on their own.
- **Copy the look, not the code.** Take the layout, spacing, font sizes, corner radii and colors from the inline `style="…"` attributes. Then rebuild them with the site's own CSS classes and the CSS custom properties in `assets/css/style.css`.
- `var(--name)` refers to the color tokens in PLAN.md, Phase 2. Each file's script holds the full light and dark values in a `THEMES` object.
- Anything in `[square brackets]` is placeholder text for Touthor to replace. Don't invent content.
- In the design, the sun/moon button switches the theme only for that one page. On the real site it works for the whole site and remembers the choice (PLAN.md, Phase 3b).

## Latest design decisions

- **Theme:** lavender light mode plus purple dark mode, toggled with a sun/moon button in the header.
- **Home:** one profile image in the hero, with no slideshow.
- **Stories:** a hero banner whose background photo changes every 5 seconds, with no buttons (PLAN.md, Phase 4).
