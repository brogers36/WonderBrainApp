# WonderBrain v3.1

A little universe of connected ideas. WonderBrain is a self-contained learning app: open `index.html`, choose a question, and see where it leads.

## Explore

- **39 discoveries** across science, linguistics, history, astronomy, astrophysics, biology, quantum physics, cell biology, immune biology, math, chemistry, Tolkien lore, and D&D lore.
- **117 rabbit-hole connections**, plus full-text search and subject filters.
- Original introductions, a thought experiment or activity, and further-reading sources for every discovery.
- A saved collection and exploration progress kept in the current browser.
- Four untimed games: **Curiosity quiz**, **Connection match**, **Time traveler**, and **Element lab**.
- Keyboard controls, light/dark/device appearance, three text sizes, higher contrast, roomier reading, and reduced motion controls.

Fictional worlds are identified in the app. D&D rules references specify the 2024 rules where relevant; details can differ by edition and setting. WonderBrain is an independent project and is not affiliated with Tolkien's estate or the publishers of Dungeons & Dragons.

## Run it

Open `index.html` in a current browser. Everything needed for the app is in that one file: no installation, account, API key, external font, or build step. A downloaded copy also works without internet; further-reading links need a connection. For a phone or a shareable URL, use GitHub Pages.

## Publish with GitHub Pages

1. Open [this repository's Pages settings](https://github.com/brogers36/WonderBrainApp/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then click **Save**.
4. Wait for the Pages deployment to finish. Check the repository's **Actions** tab if GitHub reports a deployment problem.
5. Open **https://brogers36.github.io/WonderBrainApp/**.

The URL becomes available after Pages has been enabled and deployed successfully. The `.nojekyll` file keeps this simple HTML app from needing Jekyll processing. Later commits to `main` will update the site when branch publishing is configured.

[GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Your data

WonderBrain sends no analytics and uses no external scripts. Bookmarks, explored discoveries, and display settings are stored under `wonderbrain-v3.1` in browser local storage. They do not sync across devices. Clearing site data removes them. If storage is blocked, the app still works for the current visit and reports that progress may not persist. Following a source link visits the external source's website.

## About this release

Version 3.1 was rebuilt as a self-contained app because the earlier chat's downloadable files were unavailable. The destination repository was inspected before publishing and was empty; no previous repository files were replaced. All factual entries include links for further study. Summaries are introductions, and the source material provides fuller context.

## Editing

The HTML includes its own styles and scripts. `KNOWLEDGE` holds the discovery entries. Each entry has an ID, subject, title, hook, explanatory paragraphs, activity, three related discovery IDs, and source links. Preserve IDs to keep existing bookmarks and shared discovery links working. Test search, article links, all four games, saved progress, display settings, and a narrow phone layout after changing the file.
