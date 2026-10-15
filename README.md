# SUNSEAT

SUNSEAT is a fictional premium toilet-seat brand and a parody of wellness marketing. This repository contains a polished, responsive, static landing page for the concept.

> **Important:** SUNSEAT is not a real product, is not for sale or use, and is not a medical device. The proposed features, illustrations, product tiers, prices, testimonials, and runtime figures are fictional. Nothing on the site is medical or safety advice.

## View the site

After the GitHub Pages deployment succeeds, visit **[https://mikebooksmsft.github.io/SunsetSeat/](https://mikebooksmsft.github.io/SunsetSeat/)**. The first deployment runs when the site is merged to `main`; subsequent updates deploy automatically after a push to `main`. You can also run the **Deploy to GitHub Pages** workflow manually from the Actions tab.

If the link is not live yet, check the repository's **Actions** tab for the latest Pages deployment. The repository's Pages settings should use GitHub Actions as the build and deployment source.

## Run locally

The site has no build step or package dependencies. From the repository root, start a local static server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Repository contents

| Path | Purpose |
| --- | --- |
| `index.html` | Complete single-page site, page copy, product dialogs, disclosures, and metadata. |
| `styles.css` | Brand colors, responsive layouts, typography, interactions, and reduced-motion styling. |
| `script.js` | Product dialog behavior, focus handling, and optional scroll-reveal effects. |
| `assets/hero.svg` | Main product concept illustration and callouts. |
| `assets/sunseat-one.svg` | SUNSEAT One concept illustration. |
| `assets/sunseat-plus.svg` | SUNSEAT Plus illustration and engineering callouts. |
| `assets/sunseat-atelier.svg` | SUNSEAT Atelier concept illustration. |
| `assets/sunburst.svg` | Brand mark and browser favicon. |
| `.nojekyll` | Tells GitHub Pages not to process the site with Jekyll. |
| `.github/workflows/pages.yml` | Builds and deploys the repository root to GitHub Pages. |

## What's on the page

The landing page includes:

- A prominent fictional-product notice and navigation to the ritual, collection, and science sections.
- An illustrated hero, brand campaign, and three-step description of the proposed concept.
- Engineering callouts and three fictional product tiers with illustrative US dollar prices.
- A science and disclosure section, article context, fictional testimonials, FAQ, and closing call to action.
- Native product detail dialogs, FAQ disclosure controls, keyboard-visible focus, a skip link, and scroll-reveal effects that are disabled when reduced motion is requested.

The design uses local SVG artwork, system fonts, and relative asset paths. It does not use a framework, third-party runtime libraries, external images, trackers, forms, a checkout, or a backend. The site is designed to work at the repository's GitHub Pages project URL.

## GitHub Pages deployment

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages on every push to `main` and supports manual runs through `workflow_dispatch`. The workflow uses the GitHub Pages artifact/deployment actions and requests the Pages configuration needed for deployment.

For a deployment to succeed, GitHub Pages must be available for the repository and the workflow must have the required Actions permissions. Review the **Deploy to GitHub Pages** workflow run in the **Actions** tab for its status and deployment URL.

## Content and health-information disclosures

The premise is a fictional UVB toilet-seat concept, not a functioning device or set of device instructions. Proposed sensors, lamps, batteries, charging, indicators, and product details are presented as untested concepts. The suggested “3–6 months or 600 operating hours” is an unverified, aspirational figure—not measured performance or a guarantee. No claims are made that the concept is safe, effective, waterproof, compatible, certified, or tested.

The amber illustration is decorative and does not represent invisible UVB. The site does not recommend UV exposure as therapy. Its health and regulatory copy is deliberately conservative. Any SOLIUS/Forbes details are attributed as article-reported and have not been independently verified; SUNSEAT is not affiliated with or endorsed by SOLIUS, Forbes, or the FDA.

The fictional prices and testimonials are illustrative, not offers or customer statements. There is no purchasing or data-collection functionality. The site includes a tasteful “Built with GitHub Copilot” credit.
