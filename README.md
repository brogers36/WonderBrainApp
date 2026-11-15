# WonderBrain v3.1

A little universe of connected ideas. WonderBrain is an installable learning app hosted on GitHub Pages: choose a question and see where it leads. The core learning experience also works by opening the self-contained `index.html` file.

## Explore

- **39 discoveries** across science, linguistics, history, astronomy, astrophysics, biology, quantum physics, cell biology, immune biology, math, chemistry, Tolkien lore, and D&D lore.
- **117 rabbit-hole connections**, plus full-text search and subject filters.
- Original introductions, a thought experiment or activity, and further-reading sources for every discovery.
- A saved collection and exploration progress kept in the current browser.
- Four untimed games: **Curiosity quiz**, **Connection match**, **Time traveler**, and **Element lab**.
- Keyboard controls, light/dark/device appearance, three text sizes, higher contrast, roomier reading, and reduced motion controls.
- App installation support with WonderBrain icons, a separate app window, and offline access after a complete first online visit.

Fictional worlds are identified in the app. D&D rules references specify the 2024 rules where relevant; details can differ by edition and setting. WonderBrain is an independent project and is not affiliated with Tolkien's estate or the publishers of Dungeons & Dragons.

## Run it

Open `index.html` in a current browser. Everything needed for the app is in that one file: no installation, account, API key, external font, or build step. A downloaded copy also works without internet; further-reading links need a connection. For a phone or a shareable URL, use GitHub Pages.

## Install on your phone

Open [WonderBrain](https://brogers36.github.io/WonderBrainApp/) in your phone's browser after the GitHub Pages deployment completes. The download-arrow button beside the display settings opens installation help. When the browser offers an installation prompt, the dialog includes an **Install WonderBrain** button.

**Android:** Use Chrome, open the browser's **⋮** menu, and choose **Install app**. Depending on Chrome's version, that choice may be under **Add to Home screen** or **Install and create shortcut**. Select the **Install** option when available. A compatible Chrome/Android installation uses WonderBrain's own icon and opens a separate app window. After the installed app appears, remove any older website shortcut with the Chrome badge.

The final installation type depends on the phone and browser. Chrome on devices with Google Mobile Services can install a WebAPK; if that service is unavailable or a browser only supports shortcuts, an icon can still carry the browser badge. If **Install** has not appeared yet, keep the page open for a moment, explore a discovery, and check the menu again. The app cannot force the phone to remove its browser badge.

**iPhone/iPad:** In Safari use **Share → Add to Home Screen**, enable **Open as Web App** if shown, then **Add**.

**Offline:** After the installation-help dialog says **Ready for offline exploring**, the library and all four games can open without an internet connection. External sources require internet. The app saves its small set of local files in this browser's cache. Browsers can reclaim cached files; reconnect and open the app to restore them. Saved discoveries and settings remain in local storage and are separate from the offline cache. Storage is specific to a browser or installed-app context, so a new context may begin with an empty collection.

**Updates:** Requested changes made in this chat are tested and published to `main`; GitHub Pages deploys that branch automatically. Installed copies check for current content when opened online. They also check for newer offline files when the app resumes, the connection returns, and periodically while the app is visible. A complete newer offline copy activates without interrupting a game or an open discovery. Reopen or reload to display the newest content; no reinstall is needed for app-content updates. Offline devices keep the last complete saved copy. Hosting propagation and browser scheduling can affect when an update arrives.

The application manifest, `sw.js`, and `icons/` are needed for hosted installation/offline support. Keep them next to `index.html` when publishing. Relative URLs keep the app confined to the repository's own GitHub Pages path; it does not control other projects on the same account.

[Google's PWA installation guide](https://web.dev/learn/pwa/installation) · [Chrome installability criteria](https://web.dev/articles/install-criteria)

## Publish with GitHub Pages

1. Open [this repository's Pages settings](https://github.com/brogers36/WonderBrainApp/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then click **Save**.
4. Wait for the Pages deployment to finish. Check the repository's **Actions** tab if GitHub reports a deployment problem.
5. Open **https://brogers36.github.io/WonderBrainApp/**.

The URL becomes available after Pages has been enabled and deployed successfully. The `.nojekyll` file keeps this simple HTML app from needing Jekyll processing. Later commits to `main` will update the site when branch publishing is configured.

[GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Your data

WonderBrain sends no analytics and uses no external scripts. Bookmarks, explored discoveries, and display settings are stored under `wonderbrain-v3.1` in browser local storage. They do not sync across devices. Clearing site data removes them. If storage is blocked, the app still works for the current visit and reports that progress may not persist. The offline cache contains only this app's HTML, manifest, and icons; external reading sources are not cached. Following a source link visits the external source's website.

## About this release

Version 3.1 was rebuilt as a self-contained app because the earlier chat's downloadable files were unavailable. The destination repository was inspected before publishing and was empty; no previous repository files were replaced. All factual entries include links for further study. Summaries are introductions, and the source material provides fuller context.

## Editing

The HTML includes its own styles and scripts. `KNOWLEDGE` holds the discovery entries. Each entry has an ID, subject, title, hook, explanatory paragraphs, activity, three related discovery IDs, and source links. Preserve IDs to keep existing bookmarks and shared discovery links working. Test search, article links, all four games, saved progress, display settings, and a narrow phone layout after changing the file.

After editing hosted app files, run `node scripts/prepare-release.cjs` from the repository root and commit the generated `sw.js` with the changed files. The script derives the offline-cache revision from the actual app content, including its icons and service-worker code, so a release does not depend on someone remembering to change a version number. The same inputs produce the same revision. See `AGENTS.md` for the standing publishing preference and verification requirements.
