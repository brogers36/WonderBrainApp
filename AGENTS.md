# WonderBrain maintenance and publishing

## Standing user preference

After implementing and testing requested WonderBrain updates, commit and publish them directly to `brogers36/WonderBrainApp` on `main`. The user has authorized this workflow and does not need another publishing confirmation. Later user instructions, such as local-only work, override this preference. This instruction applies to WonderBrain; it does not authorize unrelated repository changes or messages to other people.

## Preserve existing work

Inspect the current remote `main` and affected files before editing. Preserve unrelated changes, the stable discovery IDs, existing bookmarks, local-storage key `wonderbrain-v3.1`, app manifest identity, start URL, and project scope unless the user requests a change. Publish with a fast-forward update and an expected-head check. If the head has changed, inspect and integrate it; do not force-push or bypass repository rules.

## Prepare and verify every release

- Keep the app functional as a self-contained `index.html`; hosted installation additionally uses `manifest.webmanifest`, `sw.js`, and `icons/`.
- After changing deployable app files, run `node scripts/prepare-release.cjs` from the repository root. This generates a deterministic service-worker cache revision from the app files. Commit the generated `sw.js` with the update. Never reuse a cache revision for different app content.
- Run checks appropriate to the change. Changes to installation, caching, or updating need an upgrade test: an existing installed copy must receive the new offline files, preserve bookmarks/settings, and keep working if a download fails.
- Do not force-reload an active game or open discovery. Online launches load current content; background update checks refresh the saved copy for the next launch. Offline use retains the last complete release.
- Publish all required files together. Confirm the intended files and commit reached `main`, then check the corresponding GitHub Pages deployment succeeds.

## Scope and delivery

GitHub Pages deploys `main` automatically. Users receive the new app content on an online launch without reinstalling; a running app can continue its current session until reopened. Browser scheduling, offline connections, and hosting propagation affect timing. Do not promise instantaneous updates on closed or offline phones. No background monitoring, scheduled automation, app-store submission, push notifications, or additional user permissions are needed for this workflow.
