from pathlib import Path, PurePosixPath
import re
import shutil
from typing import Optional
import zipfile


ROOT = Path(__file__).resolve().parents[1]
INCOMING = ROOT / "docs" / "incoming"
IMPORTED = ROOT / "docs" / "imported"
MAX_FILES = 100
MAX_UNCOMPRESSED_SIZE = 25 * 1024 * 1024


def safe_name(name: str) -> str:
    return re.sub(r"[^a-z0-9-]+", "-", name.lower()).strip("-") or "documents"


def safe_member(member: zipfile.ZipInfo) -> Optional[PurePosixPath]:
    path = PurePosixPath(member.filename)
    if member.is_dir() or path.is_absolute() or ".." in path.parts:
        return None
    if path.suffix.lower() != ".md":
        return None
    if member.external_attr >> 16 & 0o170000 == 0o120000:
        return None
    return path


def import_archive(archive: Path) -> None:
    destination = IMPORTED / safe_name(archive.stem)
    with zipfile.ZipFile(archive) as zip_file:
        members = [member for member in zip_file.infolist() if safe_member(member)]
        total_size = sum(member.file_size for member in members)
        if not members:
            raise ValueError(f"{archive.name} does not contain Markdown files")
        if len(members) > MAX_FILES or total_size > MAX_UNCOMPRESSED_SIZE:
            raise ValueError(f"{archive.name} exceeds the Markdown import limits")

        if destination.exists():
            shutil.rmtree(destination)
        for member in members:
            member_path = safe_member(member)
            target = destination / Path(*member_path.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            with zip_file.open(member) as source, target.open("wb") as output:
                shutil.copyfileobj(source, output)
    archive.unlink()


def main() -> None:
    for archive in sorted(INCOMING.glob("*.zip")):
        import_archive(archive)


if __name__ == "__main__":
    main()