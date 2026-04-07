#!/bin/bash
# Updating src/index.css variables based on guidelines
sed -i '' 's/oklch(0.2 0 0)/#000000/g' src/index.css
sed -i '' 's/--color-background: #1a1a1a;/--color-background: #000000;/g' src/index.css
