# Change Log

This page records the iterative development of the ITSD Documentation site.

## 2026-08-26

### Foundation

- Created the MkDocs project and verified strict builds.
- Moved the site to Material for MkDocs.
- Added GitHub repository publishing and GitHub Pages deployment.
- Added a project-local Python environment for consistent local previewing.

### Documentation Library

- Added a simple GitHub upload path for Markdown files, PDFs, images, and supporting files.
- Added a generated document catalog that discovers uploaded Markdown and PDF files.
- Replaced document cards with a searchable, filterable, sortable table and pagination for larger libraries.
- Added multi-file Markdown guidance and a ZIP batch-import workflow with file-count, size, path-traversal, and symlink safeguards.

### Search

- Enabled Material search suggestions, highlighting, and shareable queries.
- Built a dedicated global search-results page initiated from the header search field.
- Added title-weighted ranking, excerpts, best-match identification, and a reading pane for selected Markdown documents.
- Added dependency-free fuzzy title matching with punctuation normalization and typo tolerance for GitHub Pages-compatible search.
- Verified the PDF and Markdown result links return successfully on the deployed site.

### Navigation and Search Validation

- Moved page navigation into a horizontal top bar and positioned the Table of Contents on the right without a backend dependency.
- Verified that a misspelled query such as `deescalted` identifies **De-escalated Tickets** as the best match and loads it in the main reading pane.
- User acknowledgment: "You badass."

### Support and Suggestions

- Added a GitHub Pages-compatible Support page for shared feature suggestions backed by labeled GitHub Issues.
- Added a repository Issue template for new suggestions and a browser-local Upvote control with persistent counts.
- Verified the live page loads the shared issue list and displays a clear empty state when no suggestions are open.
- Added four browser-local example suggestions for testing, first-name attribution, immediate posting, and plain-text export; removed the voting controls.
- Added category-specific expandable dropdown sections and corrected rendering so examples remain visible alongside posted suggestions.
- Expanded the example set to 24 built-in suggestions and preserved that set while local browser suggestions were added.
- Removed the shared-suggestions link, reduced the export control to a quiet utility action, and renamed the submit action to **Into the Void it goes!**.
- Replaced the first-name field with a required category selector and corrected the GitHub Issue template front matter.
- Changed every category section to start collapsed when the Support page is opened.

## Detailed Recent Timeline

The following record covers every repository change from the Support-page implementation through the final collapsed-category and button-label updates. Times are local project timestamps in Mountain Daylight Time (`-0600`) on 2026-08-26 unless noted otherwise. Automatic documentation commits were produced by the saved-file publishing watcher; the GitHub Issue-template repair was committed manually because the watcher intentionally tracks `docs` and `mkdocs.yml` only.

| Time | Commit | Detailed technical change | Files |
| --- | --- | --- | --- |
| 21:04:58 | `d905bd1` | Added the first Support-page client script. It loaded open GitHub Issues labeled `feature-request`, rendered suggestion titles and metadata, and handled the empty/error states in the browser. | `docs/javascripts/support-suggestions.js` |
| 21:05:09 | `ca9fb59` | Added the initial Support page to the top navigation and introduced the first suggestion-list styling, including the shared list container, row layout, and vote presentation. | `mkdocs.yml`, `docs/stylesheets/extra.css` |
| 21:05:34 | `d0a4599` | Documented the initial Support page, GitHub Issue integration, and shared suggestion workflow in this Change Log. | `docs/change-log.md` |
| 21:06:58 | `77bc412` | Added the GitHub feature-request Issue template so new submissions use the `feature-request` label and a consistent suggestion structure. | `.github/ISSUE_TEMPLATE/feature_request.md` |
| 21:11:19 | `7746a73` | Added no-login browser posting with first-name and suggestion fields, local persistence through `localStorage`, an export-to-text action, and four initial example suggestions. | `docs/support.md`, `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css` |
| 21:11:56 | `c33d2eb` | Corrected the Support script’s page-level bindings so the form and export control could be found outside the results section. | `docs/javascripts/support-suggestions.js` |
| 21:15:47 | `53232f1` | Removed the first-name requirement from the Support form and introduced the category field in the page structure. | `docs/support.md`, `docs/javascripts/support-suggestions.js` |
| 21:15:54 | `0d41f1c` | Added category metadata to stored local suggestions and shared Issue results so category labels could be displayed consistently. | `docs/javascripts/support-suggestions.js` |
| 21:16:17 | `94d8fc2` | Updated Support-page wording and Change Log content to describe category-based posting and the current local-storage behavior. | `docs/support.md`, `docs/change-log.md` |
| 21:17:16 | `c373133` | Added ten more example suggestion records, bringing the built-in test set to 14. | `docs/javascripts/support-suggestions.js` |
| 21:19:22 | `60db0cc` | Added persistent Upvote controls with stable suggestion IDs and browser-local vote storage. Upvotes increment immediately and are restored after refresh. | `docs/support.md`, `docs/javascripts/support-suggestions.js` |
| 21:19:28 | `9a0167e` | Added stable IDs to the earlier example records so every example could maintain an independent stored vote count. | `docs/javascripts/support-suggestions.js` |
| 21:20:33 | `7db6756` | Added the missing tenth example record after live testing identified that the prior expansion contained only nine new entries. | `docs/javascripts/support-suggestions.js` |
| 21:31:02 | `e1119ad` | Added nine additional examples, distributed categories across the sample data, and changed the list renderer to group suggestions into native expandable category sections. | `docs/support.md`, `docs/javascripts/support-suggestions.js` |
| 21:32:11 | `e390888` | Applied styling to category dropdown summaries, open-state borders, hover treatment, and grouped suggestion sections. | `docs/stylesheets/extra.css` |
| 21:32:36 | `bf0b902` | Repaired the GitHub Issue template’s malformed `title` front-matter key and published the fix manually after the watcher skipped `.github` files. | `.github/ISSUE_TEMPLATE/feature_request.md` |
| 21:35:38 | `2265cf8` | Added the final ten examples for the current 24-item test set, added local upvote rendering, and preserved export behavior for example data. | `docs/javascripts/support-suggestions.js` |
| 21:35:44 | `6537098` | Refined the categorized Support-page layout and form presentation after live browser review. | `docs/stylesheets/extra.css` |
| 21:37:50 | `e6fe1fe` | Corrected the example count and related Support-page status text after physical browser testing. | `docs/javascripts/support-suggestions.js` |
| 21:38:13 | `f61d202` | Recorded the categorized dropdown and example-retention correction in the Change Log. | `docs/change-log.md` |
| 21:41:30 | `a65bd85` | Removed the visible GitHub shared-suggestions link from the Support page and introduced the quieter export utility class. | `docs/support.md`, `docs/stylesheets/extra.css` |
| 21:42:49 | `bc4fa46` | Reduced export prominence further by removing filled styling, borders, shadows, and strong typography while retaining its download behavior. | `docs/stylesheets/extra.css` |
| 21:46:01 | `65d9fe8` | Renamed the export control to `Into the Void it goes!` during the first label adjustment. | `docs/support.md` |
| 21:47:30 | `a850d7b` | Corrected the label placement: restored `Export suggestions` to the quiet export control. | `docs/support.md` |
| 21:48:47 | `1654f28` | Removed the first category section’s default-open behavior so all category dropdowns start collapsed on every visit. | `docs/javascripts/support-suggestions.js` |

## Conversation Iteration Timeline

This section records the work completed after the initial Support-page timeline, including the later requests and the corrections made during browser review. These are technical changes only; local test suggestions created during browser validation are not part of the repository history.

| Time | Commit | Detailed technical change | Files |
| --- | --- | --- | --- |
| 21:51-21:58 | `d117dd0`, `1c891d0`, `4681e40` | Tightened the Support-page visual hierarchy: quieted the export utility, gave the form a white surface with a teal accent and subtle depth, and reduced the submit action from a full-width button to a content-sized control. | `docs/stylesheets/extra.css` |
| 22:02 | `4aa3ec3`, `8661893`, `f023135`, `7772a25`, `89164c0` | Made suggestion status visible, persisted pending/complete state independently, added a date picker, then expanded the filter row with status, category, date, keyword search, and Clear filters. | `docs/support.md`, `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css` |
| 22:05-22:06 | `7d15bcc` | Displayed the posting date and time for local suggestions and the creation date for GitHub Issue records when available. | `docs/javascripts/support-suggestions.js` |
| 22:08 | `f9b8916` | Temporarily added a prefilled GitHub Issue submission path to work with GitHub Pages hosting without exposing a token. | `docs/support.md`, `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css` |
| 22:09 | `1305d9d` | Removed the GitHub submission experiment at the request of the project owner, returning the Support page to a fully static browser-local workflow. | `docs/support.md`, `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css` |
| 22:12 | `d2daf0c` | Added a short self-contained shredder sound to the Into the Void it goes! submit action using the Web Audio API, with no external sound asset or network dependency. | `docs/javascripts/support-suggestions.js` |
| 22:15 | `1e3a05e` | Preserved open category dropdowns while rerendering after an upvote, preventing the user’s current section from closing. | `docs/javascripts/support-suggestions.js` |
| 22:18-22:19 | `d570717`, `c099fe0` | Split suggestions by age: dated items from the last four days stay in a Recent suggestions list, while older items and undated examples remain in category dropdowns. Added a discreet explanation below the list. | `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css`, `docs/support.md` |
| 22:21-22:26 | `94dd0b1`, `c061aa2`, `a2feb4a`, `c61def5`, `b894f32`, `171eaa6` | Prototyped expandable per-suggestion summaries, fixed the resulting Material disclosure styling and state-preservation issues during browser review, then reverted the feature completely when it did not fit the desired page behavior. | `docs/javascripts/support-suggestions.js`, `docs/stylesheets/extra.css` |
| 22:31 | `b6f1cdb`, `eb1258b` | Reworked the About page into an ITSD operating brief with a specific mission, usage routes, content boundaries, documentation standards, and maintenance guidance. Fixed nested Markdown parsing in the two-column brief. | `docs/about.md`, `docs/stylesheets/extra.css` |
| 22:34-22:35 | `0c4d5df`, `1f47a3d` | Added per-document Delete actions that open the authenticated GitHub file editor, plus a confirmed Delete all documents action that opens the repository docs folder for review and batch commits. | `docs/uploaded-documents.md`, `docs/javascripts/document-library.js`, `docs/stylesheets/extra.css` |
| 22:38-22:39 | `a9e3e99`, `4a5c8e9` | Rebuilt the home page as a functional launchpad with a real search form, document/upload/support actions, escalation and Change Log routes, and practical ITSD guidance. Corrected card indentation so Markdown links render normally. | `docs/index.md`, `docs/stylesheets/extra.css` |
| 22:42 | `f31acfc`, `11c0b5c` | Added the global search panel to the top of every non-search content page, kept the home search from duplicating it, and added responsive layout rules. | `docs/javascripts/global-search.js`, `docs/stylesheets/extra.css` |
| 22:45 | `1c329ee` | Expanded the dedicated search results workspace across the available page width so the selected document reader uses the remaining viewport instead of stopping at the old content-grid limit. | `docs/stylesheets/extra.css` |
| 22:46 | `8b89050` | Restricted search results to documents present in `document-library.json`, preventing Home, About, and other non-library pages from appearing in uploaded-document searches. | `docs/javascripts/document-search.js` |

### Later Validation Evidence

- Repeated `mkdocs build --strict` checks passed through the full iteration sequence.
- `node --check` passed for the Support, document-library, global-search, and document-search scripts after their respective changes.
- Browser testing confirmed pending/complete filtering, date filtering, Clear filters, local timestamp display, shredder submission behavior, and open-category preservation after upvoting.
- Browser testing confirmed the four-day split: recent local suggestions appeared at the top and older/undated records remained categorized.
- Browser testing confirmed the expandable-row experiment was fully removed and ordinary suggestion rows were restored.
- Browser testing confirmed all document Delete links point to the matching GitHub editor paths and that the bulk action points to the repository docs folder.
- Browser testing confirmed home-page search routes to `search.html?q=...` and the global content-page search uses the same results workflow.
- Browser testing confirmed the selected search document fills the available reader width and that searches return only document-library entries.

### Recent Validation Evidence

- `node --check docs/javascripts/support-suggestions.js` passed after the Support script changes.
- `mkdocs build --strict` passed after each functional and styling change in the timeline.
- The live Support page was opened repeatedly through local static preview servers and returned successfully.
- The browser accepted a no-login suggestion, displayed it under its selected category, and preserved the existing examples alongside it.
- The browser incremented an Upvote count from `0` to `1` and preserved the count after refresh.
- A clean browser origin displayed all 24 built-in examples in category sections; later local posting produced 25 total entries without removing the examples.
- The browser confirmed the final primary submit label is `Into the Void it goes!` and the quiet utility label is `Export suggestions`.
- The browser confirmed all category dropdowns are collapsed on initial page load.
- GitHub Issues and the raw Issue-template URL returned HTTP 200 during integration checks.

### User Experience

- Established the ITSD navy and teal visual theme, logo, typography, and desktop-first navigation.
- Improved the left navigation with consistent type, active-state treatment, and simplified Documents access.
- Refined the home page, upload flow, document list, About, and Contact pages through iterative browser review.
- Removed changes that did not support the final navigation direction, including the temporary Workflow page and profile-link experiment.

### Validation and Delivery

- Used `mkdocs build --strict` after configuration and content changes.
- Tested live GitHub Pages deployments, including cache-busted verification when CDN caching delayed visible updates.
- Tested global search routing, ranked results, in-pane Markdown loading, PDF open behavior, filtering, and generated document links.
- Preserved concurrent GitHub uploads by rebasing local work before publishing.

## Current Status

The site is published through GitHub Pages, backed by a version-controlled repository, and supports document uploads, large-library browsing, and ranked global search without external credentials or a backend service.

## Code Change History

The following is the implementation record from Git history. Times are local project timestamps on 2026-08-26 unless noted otherwise.

| Time | Commit | Technical change | Primary files |
| --- | --- | --- | --- |
| 18:23 | `eb1cfa2` | Created the Material for MkDocs baseline and initial content. | `mkdocs.yml`, `docs/index.md`, `docs/about.md`, `docs/contact.md` |
| 18:26 | `b21bd33` | Added the saved-file watcher that commits and pushes documentation updates. | `scripts/auto-push.ps1`, `.vscode/tasks.json`, `.vscode/settings.json` |
| 18:29 | `e7c0ceb` | Enabled search suggestions, highlights, and query sharing. | `mkdocs.yml` |
| 18:36 | `4cb6a3c` | Established ITSD branding, Material configuration, GitHub Pages workflow, documentation structure, and custom styles. | `.github/workflows/publish.yml`, `mkdocs.yml`, `docs/assets/itsd-mark.svg`, `docs/stylesheets/extra.css` |
| 18:40-18:43 | `0f061d7`, `6310745` | Added and simplified the document upload guide. | `docs/how-to/upload-documents.md` |
| 18:45 | `c1c6c49` | Added the first uploaded Markdown document. | `docs/De-escalated Tickets_converted.md` |
| 18:51-18:54 | `d77ec38`, `9439fcb`, `c497c1a` | Removed unused starter sections, restored the upload path, and repaired a missing-image build failure. | `mkdocs.yml`, `docs/upload-documents.md`, `docs/De-escalated Tickets_converted.md` |
| 18:56 | `cc2b8a4`, `b0d27ec` | Added a PDF through GitHub and merged the upload branch. | `docs/Guide - HCL Notes.pdf` |
| 18:59 | `868f722`, `ecba627` | Added the initial Uploaded Documents index and included the PDF. | `docs/uploaded-documents.md`, `mkdocs.yml` |
| 19:03-19:10 | `c7e0120`, `0968184` | Refined the ITSD visual system, homepage, sidebar, upload page, library cards, About, and Contact. | `docs/stylesheets/extra.css`, `docs/index.md`, `docs/about.md`, `docs/contact.md`, `docs/uploaded-documents.md` |
| 19:15-19:27 | `1e7ecfa` through `b0d060a` | Iterated on desktop sidebar hierarchy, link typography, home-page purpose, and Documents navigation behavior. | `docs/stylesheets/extra.css`, `docs/index.md`, `docs/uploaded-documents.md`, `mkdocs.yml` |
| 19:31-19:32 | `ebff681`, `24188c4` | Added multi-file Markdown guidance and ZIP batch-import automation with archive safety limits. | `docs/upload-documents.md`, `scripts/import-archives.py`, `.github/workflows/publish.yml` |
| 19:37-19:45 | `e49630a`, `d92b44d`, `545ffef`, `146a5b3`, `c3603a6`, `b5c2a0a` | Replaced library cards with a generated catalog, type filters, sorting, pagination, and explicit loading state. | `docs/javascripts/document-library.js`, `docs/assets/document-library.json`, `scripts/generate-document-library.py`, `docs/uploaded-documents.md` |
| 19:59-20:05 | `462fe20`, `8819166`, `bedacd4`, `b1f897c`, `2d3f265`, `0af2e63` | Built ranked search, then moved it from Documents to the global header Enter flow and dedicated results page. | `docs/search.md`, `docs/javascripts/document-search.js`, `docs/javascripts/global-search.js`, `mkdocs.yml` |
| 20:14-20:16 | `cb7a244`, `df33724`, `c1b5345`, `50a4905` | Prototyped a Workflow page/profile link, evaluated it, and removed it with explicit revert commits. | `docs/workflow.md`, `docs/javascripts/global-search.js`, `docs/stylesheets/extra.css`, `mkdocs.yml` |
| 20:21 | `a51fa09` | Added this Change Log and a header access icon. | `docs/change-log.md`, `docs/javascripts/change-log-link.js`, `docs/stylesheets/extra.css`, `mkdocs.yml` |
| 20:23 | `6157862` | Moved the compact theme and Change Log controls to follow the repository link. | `docs/javascripts/change-log-link.js`, `docs/stylesheets/extra.css` |

### Controls and Evidence

- Every site/configuration change was validated with `mkdocs build --strict` before publication.
- GitHub Pages deployments were checked after major workflow, search, and document-library changes.
- Concurrent GitHub uploads were retained by rebasing before local commits were pushed.
- The current implementation is fully traceable through the commit IDs listed above.