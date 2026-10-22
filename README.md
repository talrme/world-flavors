# World Flavors

**Live site: [talrme.github.io/world-flavors](https://talrme.github.io/world-flavors/)**

A food explorer built around Tal's World of Flavor photo and a researched table of 93 dishes across 31 countries and regional entries. Easy home cooking, Instant Pot and slow-cooker recipes, and more involved dishes to try as takeout.

## Five staging options

The root page is the chooser. No option has been promoted yet.

1. [Field Notes](https://talrme.github.io/world-flavors/staging-1/): country notebook, editorial lists, green and white.
2. [Supper Club](https://talrme.github.io/world-flavors/staging-2/): bold cherry menu and dish cards.
3. [Flavor Passport](https://talrme.github.io/world-flavors/staging-3/): blue country pages and a tasted count.
4. [The Flavor Wheel](https://talrme.github.io/world-flavors/staging-4/): the original photo at the center of exploration.
5. [Kitchen Counter](https://talrme.github.io/world-flavors/staging-5/): a compact table on desktop and readable entries on phones.

All five use the same real 93-dish dataset, recipe links, search, country and cooking-method filters, sort order, surprise pick, bookmarks, tried list, personal notes, original wheel, and settings. Country sectors on the photo highlight when you hover/select a dish. The photo has perspective, so sector outlines are approximate and follow its groupings: for example Argentina/Uruguay share one sector. Tap a sector to filter that country; use the selector for separately listed countries in a shared sector.

## Settings and data

- Original, Night, Garden and Cherry themes apply immediately.
- Compact rows, motion, and wheel visibility save on this device.
- Saved/tried dishes and notes save to browser localStorage, shared across the five options on the same origin. There is no account or server; these do not sync across phones.
- Centered dialogs close with the rotating X, Escape, or a tap outside. Notes save as you type.
- Save / Share includes iPhone and Android home-screen instructions and copies the current option's link. Each option has its own install manifest so installed shortcuts reopen that option.
- App and favicon PNGs are included locally; no CDN is needed for the site.

## Food table

`shared/dishes.mjs` stores the dish information and cooking judgments. `shared/sources.json` contains recipe URLs. `shared/data.js` supplies app IDs, country sectors, and explicit appliance-recipe classifications. The filters for Instant Pot and slow cooker include specifically linked recipes for those methods, not every dish that could be adapted. Some links may be paywalled or become unavailable; the site does not copy or host recipes.

Times are approximate for the base method shown. Use actual appliance recipe instructions rather than converting times directly. Region entries are examples, not a complete survey. The source table is downloadable at `assets/world-of-flavor.csv`.

## Local preview

No build is required. Open this folder with a static server (e.g. Cursor Live Server). JavaScript modules and the recipe JSON require HTTP; double-clicking HTML with a file URL is not supported. If serving the parent Websites For Fun folder, open `/world-flavors/`.

## GitHub Pages

Repository: https://github.com/talrme/world-flavors

In GitHub, go to **Settings > Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then Save. The link above becomes available after GitHub finishes publishing. No Google Sheet or backend setup is required.

## Assets and credits

- Flavor wheel: user's original supplied photograph, compressed locally to WebP.
- Noodle bowl icon: [Twemoji](https://github.com/jdecked/twemoji), graphics [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source SVG converted to PNG icons (32, 180, 192 and 512 px). The SVG is retained in assets.
- Interface icons: [Lucide](https://lucide.dev), ISC license. Bundled locally.
- Dish and recipe research: recipe creators linked from every dish, including Maangchi, Just One Cookbook, Piping Pot Curry, Ministry of Curry, RecipeTin Eats, The Woks of Life and others.

`prepare.mjs` is a one-time local asset/page preparation script tied to this machine's source image and bundled runtime; the deployed site needs no Node dependencies.
