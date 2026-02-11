#!/bin/bash
# Run E2E tests against a production URL (KanGo).
# Usage: PROD_BASE_URL=https://your-app.vercel.app ./scripts/test-prod.sh

set -e

if [ -z "$PROD_BASE_URL" ]; then
  echo "Error: set PROD_BASE_URL"
  echo "Example: PROD_BASE_URL=https://your-app.vercel.app ./scripts/test-prod.sh"
  exit 1
fi

export PLAYWRIGHT_BASE_URL="$PROD_BASE_URL"
echo "Target: $PROD_BASE_URL"
npx playwright test
echo "Done. Report: npx playwright show-report"
