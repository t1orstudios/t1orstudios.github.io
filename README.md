# Skyfortress Archive

This repository publishes the whole wiki at [t1orstudios.github.io](https://t1orstudios.github.io/). The site and the political map are served as static files through GitHub Pages; no external API supplies their data. The site is in English only.

## Editing articles

Use the [admin panel](https://t1orstudios.github.io/edit.html) to edit articles and images. It needs a GitHub account with write access to this repository and a fine-grained access token that has `Contents: Read and write` permission for this repository only. The token stays in the memory of the tab and is never written to the site files. The panel updates `en.json`, `pages.js` and the cache version in a single commit.

To edit by hand:

- Articles are in [`pages.js`](pages.js) under `const dataEN=`, mirrored in [`en.json`](en.json).
- Keep the existing fields (`title`, `category`, `desc`, `lead`, `facts`, `sections`, `related`, `imageKey`, `draft`). Link to another article with `[[article-id]]`.
- To add a photo, upload a `.png`, `.jpg`, `.jpeg` or `.webp` file to the root of this repository and set the article's `imageKey` to, for example, `file:unit-photo.png`. You can also use catalog keys such as `patch-demir-iz`.
- Changes appear after they are saved to GitHub and the Pages deployment finishes. Only accounts with write access can change the site.

## Layout

The interface is in `index.html`, `pages.js` and `style.css`; the political map is in `harita-en.html`, `map.js` and `map.css`. Images and article data live in the same repository. The old e-mail and password admin does not work on GitHub Pages; admin rights come from GitHub repository access. The game itself is developed in the separate `t1orstudios/skyfortress` repository; a commit there does not update this site by itself.

## Game content

Articles in the *Game systems* category and the vehicle, unit and facility entries that mention the game describe the Skyfortress Military Facility game as of 13 November 2026. The *Skyfortress update log* article lists the updates in order.
