#!/bin/sh
# Druckt handbuch.html als A4-PDF. Nutzt den ersten gefundenen Chromium-Browser.
set -e
cd "$(dirname "$0")"
for B in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
         "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
         "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  [ -x "$B" ] && BROWSER="$B" && break
done
[ -n "$BROWSER" ] || { echo "Kein Chromium-Browser gefunden."; exit 1; }
"$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/handbuch.pdf" "file://$PWD/handbuch.html" 2>/dev/null
echo "handbuch.pdf erzeugt"
