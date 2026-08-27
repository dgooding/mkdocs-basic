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