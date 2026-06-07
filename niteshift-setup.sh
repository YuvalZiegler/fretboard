#!/bin/bash
set -e

cd /root/fretboard

pnpm install

pnpm dev --host 0.0.0.0
