# DMS Developer Network — UI prototype

Static HTML/CSS/JS prototype for the DMS Community Portal (developer and partner portal for DMS Industrial ERP and HMS). Three UI options over the same ten screens and mock data.

Open `index.html` in a browser and pick an option. No build step.

| Option | Layout | Look |
|---|---|---|
| 1 — Pillar Bar | Top bar with four colour-coded pillars and a sub-menu | Dark by default, hairlines, blue accent |
| 2 — Spectrum | Top bar with dropdown menus, bento home, page tabs | Dark by default, black and white with a four-colour gradient |
| 3 — Open Studio | Floating pill navigation, centred search-first home | Light by default, rounded, pillar-tinted tiles |

Every option has a dark/light toggle and an Arabic (RTL) / English switch.

## Structure

- `assets/data.js` — mock content (all names, prices, percentages and API paths are placeholders)
- `assets/app.js` — router, views and mock interactions, shared by all options
- `assets/styles.css` — base tokens and components (option 1's look)
- `option-N/index.html` — shell markup per option
- `option-2/option-2.css`, `option-3/option-3.css` — token and component overrides

Nothing is saved or sent anywhere; state lives in memory and resets on reload.
