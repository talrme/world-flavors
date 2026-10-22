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

Phone first; simple header, footer settings, immediate theme updates, modern toggle switches. Centered solid dialogs always dismiss on outside click, X or Escape. Close X rotates on hover. Use local Lucide icons. Wheel highlights animate by the shortest angular route and interrupt smoothly. Respect both the motion toggle and system reduced-motion preference.

Use `world-flavors-v1` localStorage for journal and preferences, shared with previous staging pages on the same origin. No account or cross-device sync. Do not rerender a focused note textarea while saving it.

## Verification

Run `tools/check.mjs` with a running HTTP preview (port 5178). Check 390x844, 320px and 1440px widths, no overflow, all themes, modal dismissal, search/filters, persistence, 31 clickable wheel sectors, round geometry, keyboard selection, animation and root install manifest. Inspect screenshots, including night mode and phone wheel. Maintain README alongside behavior changes.
