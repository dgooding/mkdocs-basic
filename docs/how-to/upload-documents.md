---
tags:
  - documentation
  - onboarding
---

# Upload Documents

[Upload a document to GitHub](https://github.com/dgooding/mkdocs-basic/upload/main/docs){ .md-button .md-button--primary }

## Add a Markdown page

1. Select **Upload a document to GitHub**.
2. Drag in a `.md` file or choose it from your computer.
3. Enter a lowercase, hyphen-separated filename such as `service-handover.md`.
4. Commit the upload to `main`.
5. Add the file to `nav` in `mkdocs.yml` so it appears in the site navigation.

## Add a supporting file

Upload PDFs, images, or other supporting files into an appropriate subfolder under `docs`, such as `docs/files` or `docs/assets`.

Link to a PDF from a Markdown page:

``` markdown
[Download the service guide](files/service-guide.pdf)
```

!!! note "Publishing"

    A GitHub commit starts the GitHub Pages build automatically. New Markdown files are searchable after the deployment completes.