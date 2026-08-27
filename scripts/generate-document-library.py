from pathlib import Path
import json
import re


ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT / "docs"
EXCLUDED_FILES = {
    "about.md",
    "contact.md",
    "index.md",
    "upload-documents.md",
    "uploaded-documents.md",
}
EXCLUDED_DIRECTORIES = {"assets", "incoming", "javascripts", "stylesheets"}
SUPPORTED_SUFFIXES = {".md": "Markdown", ".pdf": "PDF"}


def document_title(path: Path) -> str:
    if path.suffix.lower() != ".md":
        return path.stem

    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = re.match(r"^#\s+(.+)$", line)
        if match:
            return match.group(1).strip()
    return path.stem


def main() -> None:
    documents = []
    for path in DOCS_DIR.rglob("*"):
        relative_path = path.relative_to(DOCS_DIR)
        if not path.is_file() or relative_path.name in EXCLUDED_FILES:
            continue
        if set(relative_path.parts) & EXCLUDED_DIRECTORIES:
            continue

        document_type = SUPPORTED_SUFFIXES.get(path.suffix.lower())
        if not document_type:
            continue

        url_path = relative_path.with_suffix(".html") if path.suffix.lower() == ".md" else relative_path
        documents.append(
            {
                "name": document_title(path),
                "path": relative_path.as_posix(),
                "url": url_path.as_posix(),
                "type": document_type,
                "typeKey": path.suffix.lower().lstrip("."),
            }
        )

    documents.sort(key=lambda document: document["name"].casefold())
    manifest_path = DOCS_DIR / "assets" / "document-library.json"
    manifest_path.write_text(json.dumps(documents, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()