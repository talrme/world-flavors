# World Flavors - AI notes

Live: https://talrme.github.io/world-flavors/
Repo: https://github.com/talrme/world-flavors.git
Local home: `/Users/talg/Desktop/Websites For Fun/world-flavors`

## Current stage

There are five fully functioning design options in `staging-1` through `staging-5`. Root `index.html` is a chooser. Wait for the user's selection before promoting any option or removing staging files.

## Structure

- `shared/app.js`: common filtering, renderers, favorites/tried/notes, settings, install/share, accessible centered dialogs and interactive wheel.
- `shared/styles.css`: common behavior, five distinct directions by body `data-variant`, four global theme choices, responsive and reduced-motion behavior.
- `shared/dishes.mjs`: 93 authored rows from the food research. Row fields: name, description, choice, difficulty, active minutes, total estimate, appliance fit, ingredients, reason, original recipe search.
- `shared/sources.json`: per-original-dish recipe URLs. Never generate arbitrary new recipe URLs.
- `shared/data.js`: normalized objects, stable IDs, explicit linked Instant Pot/slow-cooker recipes, and approximate polar sectors of the provided photo.
- `assets/flavor-wheel.webp`: compressed original image. Its overlay coordinate system is 1824 by 1368 with center approximately 916,687. Photo sectors use the original combined countries when necessary. No invented precise geography.
- `assets/food*.png`: favicon/app icons, based on attributed Twemoji noodle bowl.
- Each option has a matching `manifest.webmanifest` with relative start URL and scope. Keep root/option relative paths safe on GitHub Pages subpaths.

## Preferences

Use `world-flavors-v1` localStorage for device-local journal and preferences. All staging options share the journal. No cloud writes and no promise of cross-device sync. Saving notes should never rerender the focused textarea. A background settings storage event may update lists but should not destroy a modal draft.

Preserve user preferences: phone first, restrained main heading, settings near bottom, immediate theme updates, modern slider switches, centered solid dialogs, outside-click dismissal, Escape and rotating close button. Use bundled Lucide for icons. Keep useful hit areas, readable inputs, and reduced-motion support.

Instant Pot / slow-cooker filters are explicit recipe methods. General adaptation suggestions are separate text. Do not imply a stovetop recipe contains tested pressure or slow-cooker instructions. Preserve real data and 31-group coverage; no demo dishes.

## Verification and publishing

Run static HTTP preview and Playwright on all five variants at 390x844 (phone) and 1440x1000 (desktop), plus narrow 320px checks. Verify no horizontal page overflow, settings/themes, modal outside/X/Escape dismissal, search and filter combinations, saved/tried/notes after reload, native recipe URLs, interactive wheel, and per-option install manifests. Do not make network requests that modify real user data in tests.

When promoted later, update root navigation, asset/module base paths and install scope, preserve the shared journal IDs, and remove options only at the user's request. Update README and All Websites then.
