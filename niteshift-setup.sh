#!/bin/bash
set -e

cd /root/fretboard

# Install dependencies
pnpm install

# Start dev server in background
pnpm dev --host &

echo "Dev server starting on http://localhost:3000"
