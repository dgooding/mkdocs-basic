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
- Verified the PDF and Markdown result links return successfully on the deployed site.

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