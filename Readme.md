# Lena Hoffmann — Portfolio Website
A single-page photography portfolio for a Berlin-based portrait and editorial photographer. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## Project Structure

```
├── index.html      # All markup and page sections
├── style.css       # All styles, animations, and responsive rules
├── script.js       # Gallery, lightbox, cursor, testimonials, and nav logic
└── favicon.svg     # Site icon
```

---

## Features

**Sections**
- Animated loader with staggered letter reveal
- Full-screen hero with parallax background and entrance animations
- Scrolling client ticker
- About section with offset image layout
- Featured full-bleed quote image
- Filterable masonry gallery with lightbox
- Editorial spread (philosophy + collaboration)
- Client showcase with hover interactions
- Process steps
- Testimonial slider
- Awards list
- Press strip
- Contact form
- Location strip
- Footer with navigation columns

**Interactions**
- Custom cursor with trailing ring (desktop only)
- Scroll-reveal animations (fade up, fade left, fade right)
- Lightbox with image preloading, loading spinner, keyboard navigation (←/→/Esc), and backdrop-click to close
- Gallery filter buttons (All / Portrait / Editorial / Campaign)
- Parallax hero on scroll
- Nav background transition on scroll
- Testimonial auto-advance with dot navigation
- Mobile full-screen overlay nav with hamburger toggle

---

## Responsive Breakpoints

| Breakpoint | Behaviour                                                                 |
| ---------- | ------------------------------------------------------------------------- |
| `> 1100px` | Full desktop layout                                                       |
| `≤ 1100px` | Single-column about/contact, 2-col footer, stacked spread sections        |
| `≤ 860px`  | Hamburger menu replaces desktop nav links, gallery header stacks          |
| `≤ 680px`  | Single-column everything, custom cursor hidden, mobile padding throughout |

---

## Fonts

Loaded via Google Fonts:

- **Cormorant Garamond** (300, 400, 500, 600 + italics) — primary serif display and body
- **Playfair Display** (italic 400, 500) — secondary display accent
- **Inter** (300, 400, 500) — UI, captions, labels

---

## Images

All images are sourced from [Unsplash](https://unsplash.com) via URL with width and quality parameters (e.g. `?w=800&q=85&fit=crop`). The lightbox upgrades to `w=1400` on open. To swap in real photography, replace the `src` URLs in the `photos` array in `script.js` and the hardcoded `src` attributes in `index.html`.

---

## Customisation

**Photographer name and bio** — Edit the text content directly in `index.html`. The name appears in the nav logo (`.nav-logo`), hero heading, footer, loader wordmark, and page `<title>`.

**Colour palette** — All colours are CSS custom properties on `:root` in `style.css`:

```css
--cream: #F7F3EC;
--ink: #19170F;
--accent: #C09B6E;   /* gold tone used for highlights */
--muted: #857E71;
```

**Gallery photos** — Edit the `photos` array at the top of `script.js`. Each entry takes:

```js
{ src: 'image-url', cat: 'portrait' | 'editorial' | 'campaign', cap: 'Caption text' }
```

**Contact form** — The form calls `handleForm()` on submit, which shows a success note. Wire up to a backend or service (e.g. Formspree, Netlify Forms) by replacing the handler in `script.js`.

**Availability status** — The green dot and "Available for 2025" text are in the `<nav>` and mobile nav in `index.html`, and in the contact section details.

---

## Browser Support

Works in all modern browsers. The custom cursor is hidden on touch/mobile devices. 

---

## License

All design and code is for the exclusive use. Photography credits belong to their respective Unsplash contributors. Replace with licensed imagery before any commercial use.
