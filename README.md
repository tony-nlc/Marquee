# Marquee — React + TypeScript + Vite

Small demo app that displays an animated marquee. Built with React, TypeScript and Vite.

## Features

- Configurable marquee text, font, color, direction (horizontal / vertical), speed and size
- Responsive: desktop horizontal marquee, mobile-friendly vertical rendering
- Optional rainbow text and animated background modes
- Minimal UI for live customization (`Settings` panel)

## Quick start

Prerequisites: Node.js (v16+ recommended) and npm or yarn.

Install and run in development mode:

```bash
npm install
npm run dev
```

Build and preview production output:

```bash
npm run build
npm run preview
```

## Project structure (important files)

- `src/App.tsx` — main app and marquee rendering
- `src/components/SettingPanel.tsx` — UI to change marquee settings
- `src/index.css` — animations, responsive and mobile-specific styles

## Mobile behavior notes

This project intentionally forces a vertical layout on small screens for better readability. On viewports narrower than 768px the marquee switches to vertical text via `writing-mode`, and an additional targeted tweak exists for the common 428×926 (portrait) viewport to ensure the text is centered and sized to avoid cropping.

If you need the original horizontal behavior on a particular phone, you can:

- Toggle the `direction` setting in the Settings panel (desktop preference applies when width >= 768px).
- Remove or customize the media query in `src/index.css` if you want a different breakpoint or sizing.

## Development notes

- The app includes a small responsive font sizing algorithm in `src/App.tsx` that adapts font size to viewport and text length.
- If you see rendering differences across browsers, try disabling hardware acceleration or tweaking `min-height` in `.marquee-strip` within `src/index.css`.

## Contributing

Feel free to open issues or PRs for UI tweaks, accessibility improvements, or additional features.

---
Generated from a Vite React TypeScript template. See the original template docs for advanced ESLint and plugin configuration if needed.
