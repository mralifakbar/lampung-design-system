#!/bin/sh
# Rebuilds fonts/lds-icons.woff2 and fonts/lds-icons-fill.woff2 from icons/icons.json,
# plus TrueType copies in packages/flutter/fonts/ for the Flutter package.
# Needs python3 and npm. Tools and the Solar source set are cached in .cache/ (git-ignored).
set -e
cd "$(dirname "$0")/.."
mkdir -p .cache
if [ ! -x .cache/venv/bin/python ]; then
  python3 -m venv .cache/venv
  .cache/venv/bin/pip install -q fonttools skia-pathops brotli
fi
if [ ! -f .cache/solar/package/icons.json ]; then
  mkdir -p .cache/solar
  (cd .cache/solar && npm pack @iconify-json/solar --silent >/dev/null && tar xzf iconify-json-solar-*.tgz)
fi
mkdir -p packages/flutter/fonts
.cache/venv/bin/python -I scripts/build-icons.py .cache/solar/package/icons.json icons/icons.json fonts packages/flutter/fonts
