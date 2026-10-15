# SUNSEAT

SUNSEAT is a prototype toilet-seat concept: a drop-in replacement for a standard seat, offered in round and elongated sizes, eight fixture-matching colors and five styles from builder's grade to Comfort Plus (including Delta-, Kohler- and Glacier Bay-style profiles). The site includes a live color/style configurator and a step-by-step, evidence-graded rationale for the light-therapy idea.

> **Status:** prototype concept, not for sale, not a medical device and not FDA-authorized. The rationale is a design argument, not proof of benefit. Brand names are used only to describe comparable styles and are not affiliations.

## View the site

Deployed to GitHub Pages at <https://mikebooksmsft.github.io/SunsetSeat/> on every push to `main` (or by manually running the **Deploy to GitHub Pages** workflow).

## Run locally

No build step. From the repository root: `python3 -m http.server 8000`, then open <http://localhost:8000>.

## Repository contents

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page site: configurator, styles, engineering, rationale, status, FAQ. |
| `styles.css` | Layout and styling. |
| `script.js` | Generates the realistic seat renderings (SVG) and drives the configurator. |
| `assets/sunburst.svg` | Brand mark and favicon. |
| `.github/workflows/pages.yml` | Deploys the repository root to GitHub Pages. |
