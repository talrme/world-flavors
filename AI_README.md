# World Flavors - AI Notes

Live: https://talrme.github.io/world-flavors/
Repo: https://github.com/talrme/world-flavors.git
Local home: `/Users/talg/Desktop/Websites For Fun/world-flavors`

## Production

Field Notes (formerly staging 1) is promoted to root. The five staging folders, chooser, screenshots and generator were removed at the user's request. Do not reintroduce them. Root manifest, asset links and sharing must work under the GitHub Pages project path.

## Structure

`shared/app.js` handles filtering, lists, journal, settings and centered dialogs.
`shared/styles.css` is the Field Notes design with four themes.
`shared/wheel.js` draws the circular country explorer and animates its selection via requestAnimationFrame. Country wedges are equal size for readability, not geographic proportions. Each country is separately selectable; regional labels are culinary groupings.
`shared/wheel.css` styles the wheel across themes and sizes.
`assets/flavor-wheel.webp` preserves the original photo, available from the wheel modal.
`shared/dishes.mjs` stores 93 rows (three per 31 groups), with active minutes, total estimates, method, ingredients and preparation notes.
`shared/sources.json` has researched recipe URLs; never invent new URLs.
`shared/data.js` normalizes stable IDs and classifies explicitly linked appliance instructions.
`tools/export-csv.mjs` regenerates the download from current data. Always run after recipe edits.

## Food Constraint

Tal requested replacing dishes with pork. Keep the collection non-pork, including stocks, fats, garnishes and fillings. Recipe variants with explicit butter/vegetable-oil alternatives must state the required choice. Restaurant versions need confirmation; do not guarantee allergy-safe preparation. Avoid silently linking recipes that require pork even when the dish title sounds safe. Seventeen entries were replaced during promotion.

Do not alter unrelated dish IDs or overwrite saved user notes. Removed entries' stored data can remain inert; do not migrate favorites to different dishes.

## UX

The wheel center uses the existing `flags` mapping for a hovered/focused country (including dish-row hover). Broader regions or an idle wheel use the local food PNG. Keep the icon and flag in the same fixed space; do not invent flags for regional groupings or fetch third-party flag assets at runtime. Native emoji rendering supplies the country flag.

`shared/flavors.js` provides representative herbs, spices and blends for all 31 entries, based on the user's original wheel photo. Shared photographed sectors can share notes. Keep these framed as examples, not a definition of a country's entire cuisine. Inline headings show four notes by default; clicking the country name opens the full list. The locally persisted `prefs.flavors` boolean controls inline notes only. Wheel hover/focus always renders the full list in SVG text/tspans; use textContent to avoid injecting content. Preserve readable contrast, center-circle containment and reduced-motion behavior.

Do not reintroduce full-row hover backgrounds: when a wheel modal closes, the stationary pointer can land on a dish, leaving a large rectangular highlight that looks like a stuck box. Dish-title color changes are sufficient. Avoid native SVG title tooltips on wheel sectors; custom center details replace them. Pointer focus should not leave rectangular SVG outlines, but keyboard users must retain the custom wedge-shaped focus stroke.

Phone first; simple header, footer settings, immediate theme updates, modern toggle switches. Centered solid dialogs always dismiss on outside click, X or Escape. Close X rotates on hover. Use local Lucide icons. Wheel highlights animate by the shortest angular route and interrupt smoothly. Respect both the motion toggle and system reduced-motion preference.

Use `world-flavors-v1` localStorage for journal and preferences, shared with previous staging pages on the same origin. No account or cross-device sync. Do not rerender a focused note textarea while saving it.

## Want to Try and Future Backend

The visible bookmark action and collection are named **Want to try**. They reuse the existing journal's `saved` boolean under `world-flavors-v1` localStorage, so previously bookmarked dishes remain selected without migration. The list is independent of `tried`: marking a dish tried does not silently remove it. Users can toggle either action off. Notes, tried status and preferences must survive bookmark changes and reloads.

There is no backend yet. Data is browser/origin-local; it does not sync between devices, private sessions or localhost and GitHub Pages. Clearing site storage removes it. Keep the current storage key and stable dish IDs intact.

For a later simple backend, a Google Sheet + Apps Script could store one journal row per board/user and stable dish ID, with columns `boardId, dishId, wantToTry, tried, notes, updatedAt`. Map local `saved` to backend `wantToTry` at the storage boundary. Keep appearance preferences local. Agree on shared-board URLs and access/privacy before enabling public writes. Import existing local data explicitly and merge by ID; never overwrite populated remote records with an empty local journal. Retain optimistic local updates and a retryable pending-write queue, confirming server success before clearing it. No backend is configured or promised by this change.

## Verification

Country filtering uses a Set of selected names, initially all 31. Empty means zero results, not all. The modal uses individual checkboxes, group checkboxes with indeterminate state, and select-all/clear-all actions. Changes apply immediately and stay when the modal closes/reopens; filter selections are session-only. Keep the group mapping in exported `regions` in `shared/data.js` as the single source of truth for the picker and wheel. These are broad culinary groupings, not a claim of exact continent boundaries. Wheel/heading clicks still focus one country. Multi-selection highlights on the wheel are distinct from transient hover/focus animation. Country filtering must intersect with search/method/collection filters and must never alter the journal.

Run `tools/check.mjs` with a running HTTP preview (port 5178). Check 390x844, 320px and 1440px widths, no overflow, all themes, modal dismissal, search/filters, persistence, 31 clickable wheel sectors, round geometry, keyboard selection, animation and root install manifest. Inspect screenshots, including night mode and phone wheel. Maintain README alongside behavior changes.
