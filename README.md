# World Flavors

**Live site: [talrme.github.io/world-flavors](https://talrme.github.io/world-flavors/)**

A food explorer inspired by Tal's World of Flavor photo. The selected Field Notes design is now the main site; all staging options and the chooser have been removed.

## Explore

93 dishes across 31 countries and regional entries, with 64 home-cooking suggestions and 29 restaurant-first picks. Search by ingredient, dish or country; filter cooking method; save favorites; mark dishes tried; and keep personal notes.

The circular flavor wheel has separate country sectors, continent bands, keyboard/touch selection, and a smoothly moving highlight. Hovering a dish highlights its country. Tap a country to filter the list. On phones the wheel opens from the Flavor wheel button; on desktop it is also beside the list. Your original photographed wheel is available through Original photo in the wheel dialog.

## Food preferences and sources

The recommendations avoid pork. Seventeen entries were replaced, including the original pork dishes and recipes with less obvious cured-meat ingredients. Examples: beef barbacoa replaces carnitas, galinhada replaces feijoada, and vegetarian miso ramen replaces tonkotsu.

Where a linked recipe offers alternatives, preparation notes specify the non-pork choice (for example butter in empanadas or vegetable oil in mole). For takeout, confirm stocks, fats, fillings and toppings with the restaurant. This is a browsing guide, not an allergy or cross-contact guarantee.

Every dish links to a real recipe. Instant Pot (13) and slow cooker (4) filters include specifically linked appliance instructions; one recipe supports both. General adaptation ideas are separate, not tested conversions. Timings are approximate and may exclude soaking or marinating as noted. Follow the source recipe for pressure build-up/release and appliance timing.

Download the current [food table CSV](assets/world-of-flavor.csv). Regional examples are representative, not exhaustive.

## Settings and saving

Original, Night, Garden and Cherry themes apply immediately. Compact rows, wheel visibility and animations are saved on this device. Reduced-motion system preferences are respected.

Saved/tried dishes, notes and settings use browser localStorage (`world-flavors-v1`). Existing staging preferences and unchanged-dish journals are preserved on the same origin. No login or backend; nothing syncs across phones.

Centered solid dialogs close with the rotating X, Escape or a tap outside. Notes save as you type. Save / Share includes iPhone and Android home-screen instructions and the main website URL.

## Files and testing

- `shared/app.js`: filters, list, journal, settings and dialogs.
- `shared/wheel.js` / `shared/wheel.css`: circular explorer and interruptible selection animation.
- `shared/dishes.mjs` / `shared/data.js`: dish content and appliance classifications.
- `shared/sources.json`: recipe links.
- `tools/export-csv.mjs`: regenerate the CSV after editing dish data.
- `tools/check.mjs`: Playwright regression checks at desktop, phone and narrow-phone widths.
- `manifest.webmanifest`: root install scope and PNG phone icons.

No build step. Serve through HTTP (Cursor Live Server works); double-clicking HTML is not supported because the site uses JavaScript modules. If serving Websites For Fun, use `/world-flavors/`. The optional `node tools/serve.cjs` preview runs on port 5178.

## Publishing

Repository: https://github.com/talrme/world-flavors

GitHub Pages: Settings > Pages > Deploy from a branch > main > /(root). No backend configuration required.

## Credits

Original flavor-wheel photograph supplied by Tal, compressed to WebP. The new wheel is a code-native interactive visualization inspired by that photo, not a transcription of all its spice labels.

Noodle bowl PNGs are adapted from [Twemoji](https://github.com/jdecked/twemoji), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); source SVG retained. Bundled [Lucide](https://lucide.dev) icons use ISC/MIT licenses in `shared/LUCIDE-LICENSE`. Recipe creators are credited through each dish's source link.
