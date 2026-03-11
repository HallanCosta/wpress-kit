#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$SCRIPT_DIR/wp-cli.phar"

if [ -f "$DEST" ]; then
  echo "wp-cli.phar already exists at $DEST"
  exit 0
fi

echo "Downloading wp-cli.phar..."
curl -so "$DEST" https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x "$DEST"

echo "Done! wp-cli.phar saved at $DEST"
