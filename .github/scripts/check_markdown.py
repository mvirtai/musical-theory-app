import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]
IGNORED_DIRECTORIES = {
    ".git",
    ".venv",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "target",
    "venv",
}
LINK_PATTERN = re.compile(
    r"!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)"
)
FENCE_PATTERN = re.compile(r"^ {0,3}(`{3,}|~{3,})")


def markdown_files():
    for directory, child_directories, file_names in os.walk(ROOT):
        child_directories[:] = sorted(
            name for name in child_directories if name not in IGNORED_DIRECTORIES
        )
        for file_name in sorted(file_names):
            if file_name.lower().endswith(".md"):
                yield Path(directory, file_name)


def front_matter_error(lines):
    if not lines or lines[0].strip() != "---":
        return None

    closing_line = next(
        (index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---"),
        None,
    )
    if closing_line is None:
        return "front matter starts with '---' but has no closing delimiter"
    if closing_line == 1:
        return "front matter is empty"
    return None


def markdown_without_fences(text):
    fence_character = None
    fence_length = 0

    for line in text.splitlines():
        if fence_character is not None:
            closing_fence = re.match(
                rf"^ {{0,3}}{re.escape(fence_character)}{{{fence_length},}}\s*$",
                line,
            )
            if closing_fence:
                fence_character = None
            continue

        opening_fence = FENCE_PATTERN.match(line)
        if opening_fence:
            marker = opening_fence.group(1)
            fence_character = marker[0]
            fence_length = len(marker)
            continue

        yield line


def link_errors(path, text):
    errors = []
    for line_number, line in enumerate(markdown_without_fences(text), start=1):
        for match in LINK_PATTERN.finditer(line):
            target = (match.group(1) or match.group(2)).strip()
            parsed_target = urlsplit(target)
            if parsed_target.scheme or parsed_target.netloc or not parsed_target.path:
                continue

            link_path = Path(unquote(parsed_target.path))
            if link_path.is_absolute():
                resolved_path = (ROOT / link_path.relative_to("/")).resolve()
            else:
                resolved_path = (path.parent / link_path).resolve()

            try:
                resolved_path.relative_to(ROOT)
            except ValueError:
                errors.append(
                    f"{path.relative_to(ROOT)}:{line_number}: "
                    f"link escapes repository: {target}"
                )
                continue

            if not resolved_path.exists():
                errors.append(
                    f"{path.relative_to(ROOT)}:{line_number}: "
                    f"broken local link: {target}"
                )

    return errors


def main():
    files = list(markdown_files())
    errors = []
    for path in files:
        text = path.read_text(encoding="utf-8")
        lines = text.splitlines()
        front_matter_problem = front_matter_error(lines)
        if front_matter_problem:
            errors.append(f"{path.relative_to(ROOT)}: {front_matter_problem}")
        errors.extend(link_errors(path, text))

    if errors:
        print("\n".join(errors), file=sys.stderr)
        print(f"Markdown validation failed with {len(errors)} error(s).", file=sys.stderr)
        return 1

    print(f"Markdown validation passed for {len(files)} file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
