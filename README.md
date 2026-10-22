# World Flavors

**Live site: [talrme.github.io/world-flavors](https://talrme.github.io/world-flavors/)**

A food explorer inspired by Tal's World of Flavor photo. The selected Field Notes design is now the main site; all staging options and the chooser have been removed.

## Explore

Sort by Country, Continent, Dish name, Active prep time (shortest first), Difficulty (easiest first), or Cook / order (home cooking first), with an optional Then by tie-breaker. Defaults remain Country then Dish name. Both controls are available on phones. Continent sorting adds continent headings; non-country sorts preserve the actual dish order instead of regrouping it by country. Sorting applies for the current visit and combines with every filter.

The page opens directly into the compact header, filters and country lists, without an introductory title, subtitle or dish tally.

93 dishes across 31 countries and regional entries, with 64 home-cooking suggestions and 29 restaurant-first picks. Search by ingredient, dish or country; filter cooking method; bookmark dishes you **Want to try**; mark dishes tried; and keep personal notes. Use the Want to try tab to see your shortlist. Existing bookmarks are preserved.

The circular flavor wheel has separate country sectors, continent bands, keyboard/touch selection, and a smoothly moving highlight. Hovering a dish highlights its country. Tap a country to filter the list. On phones the wheel opens from the Flavor wheel button; on desktop it is also beside the list. Your original photographed wheel is available through Original photo in the wheel dialog.

The Countries / regions picker supports any combination of countries, Select all and Clear all. Toggle whole Europe, Asia, Africa, North America or South America groups, or adjust individual entries; a mixed-state checkbox indicates a partly selected group. Results update immediately, and Done, Escape or outside-click closes the picker. Clear all intentionally shows no dishes. These filters combine with search, cooking method and Want to try / Tried, and apply for the current visit. Clicking a wheel sector or a country heading focuses that one country; Everywhere restores all countries. The wheel also marks the currently selected subset.

## Food preferences and sources

Both the small inline wheel and enlarged wheel include a synchronized Multi-select switch (off initially). With it on, mouse/touch clicks or Enter/Space toggle individual countries and leave the wheel open; Done closes it. Select all includes all 31 entries, while Clear all selects none. The picker and wheel share the same selection. With Multi-select off, a sector focuses one country and closes the wheel as before. The mode is remembered for the current visit only.

Multi-select uses stable selected colors and a gentle fade when removing a country. Hover still previews flag and spices without making a deselected slice look selected; the moving outline is reserved for single-select mode.

The wheel center shows the country's flag on hover or keyboard focus, with the food icon as a fallback for broader regions and the idle wheel.

Country headings show subtle flavor notes from the original photographed wheel. Click a country name for the fuller list of herbs, spices and blends. Settings > Show country flavor notes hides the inline notes and saves that preference locally. Wheel hover and keyboard focus always show the country's spices, regardless of the inline setting. These are representative cues, not exhaustive cuisine definitions.

The recommendations avoid pork. Seventeen entries were replaced, including the original pork dishes and recipes with less obvious cured-meat ingredients. Examples: beef barbacoa replaces carnitas, galinhada replaces feijoada, and vegetarian miso ramen replaces tonkotsu.

Where a linked recipe offers alternatives, preparation notes specify the non-pork choice (for example butter in empanadas or vegetable oil in mole). For takeout, confirm stocks, fats, fillings and toppings with the restaurant. This is a browsing guide, not an allergy or cross-contact guarantee.

Every dish links to a real recipe. Instant Pot (13) and slow cooker (4) filters include specifically linked appliance instructions; one recipe supports both. General adaptation ideas are separate, not tested conversions. Timings are approximate and may exclude soaking or marinating as noted. Follow the source recipe for pressure build-up/release and appliance timing.

Download the current [food table CSV](assets/world-of-flavor.csv). Regional examples are representative, not exhaustive.

## Settings and saving

Original, Night, Garden and Cherry themes apply immediately. Compact rows, wheel visibility and animations are saved on this device. Reduced-motion system preferences are respected.

The Want to try list, tried dishes, notes and settings use browser localStorage (`world-flavors-v1`). Existing staging preferences and unchanged-dish journals are preserved on the same origin. No login or backend; nothing syncs across phones. Clearing browser site data removes the local list. Marking something tried does not automatically remove it from Want to try.

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
