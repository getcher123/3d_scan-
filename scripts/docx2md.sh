#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: docx2md.sh INPUT.docx [OUTPUT.md]

Converts a DOCX file to Markdown via pandoc. If OUTPUT.md is omitted,
the Markdown file is written next to the input using the same basename.
EOF
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage
  exit 1
fi

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc is required but not found in PATH." >&2
  exit 1
fi

input=$1
if [[ ! -f "$input" ]]; then
  echo "Input file '$input' not found." >&2
  exit 1
fi

if [[ $# -eq 2 ]]; then
  output=$2
else
  base=${input%.*}
  output="${base}.md"
fi

mkdir -p "$(dirname "$output")"

pandoc "$input" \
  --from=docx \
  --to=gfm \
  --wrap=preserve \
  --markdown-headings=setext \
  --output="$output"

echo "Converted '$input' -> '$output'"
