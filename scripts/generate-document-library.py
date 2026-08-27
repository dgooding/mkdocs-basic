from pathlib import Path
import json
import re


ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT / "docs"
EXCLUDED_FILES = {
    "about.md",
    "change-log.md",
    "contact.md",
    "index.md",
    "search.md",
    "support.md",
    "upload-documents.md",
    "uploaded-documents.md",
}
EXCLUDED_DIRECTORIES = {"assets", "incoming", "javascripts", "stylesheets"}
SUPPORTED_SUFFIXES = {".md": "Markdown", ".pdf": "PDF"}
CATEGORY_RULES = {
    "SOP": ("sop", "standard operating", "procedure", "runbook", "playbook"),
    "Technical Documentation": ("technical", "api", "configuration", "config", "architecture", "troubleshooting", "de-escalat"),
    "Training": ("training", "course", "lesson", "workshop", "onboarding", "learning"),
    "Reference": ("reference", "guide", "quick start", "cheat sheet", "handbook", "glossary"),
}


def document_text(path: Path) -> str:
    if path.suffix.lower() != ".md":
        return path.stem
    return path.read_text(encoding="utf-8", errors="replace")


def document_title(path: Path, text: str) -> str:
    if path.suffix.lower() != ".md":
        return path.stem

    for line in text.splitlines():
        match = re.match(r"^#\s+(.+)$", line)
        if match:
            return match.group(1).strip()
    return path.stem


def document_category(path: Path, title: str, text: str) -> str:
    searchable_text = " ".join((path.stem, title, text)).casefold()
    scores = {
        category: sum(searchable_text.count(keyword) for keyword in keywords)
        for category, keywords in CATEGORY_RULES.items()
    }
    best_category, best_score = max(scores.items(), key=lambda entry: entry[1])
    return best_category if best_score else "Other"


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

        text = document_text(path)
        title = document_title(path, text)
        url_path = relative_path.with_suffix(".html") if path.suffix.lower() == ".md" else relative_path
        documents.append(
            {
                "name": title,
                "path": relative_path.as_posix(),
                "url": url_path.as_posix(),
                "type": document_type,
                "typeKey": path.suffix.lower().lstrip("."),
                "category": document_category(path, title, text),
            }
        )

    documents.sort(key=lambda document: document["name"].casefold())
    manifest_path = DOCS_DIR / "assets" / "document-library.json"
    manifest_path.write_text(json.dumps(documents, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()