# Trust Architecture Decision Records

## Overview

This index tracks all Trust Architecture Decision Records (TADRs) in the codebase.

**Status meanings:**
- ✅ Verified — All trust checks pass, human review approved
- ⚠️ Pending review — Code generated, awaiting human review of TADR

## Index

| ID | Feature | Trust Level | Status | Path |
|----|---------|-------------|--------|------|
| TADR-001 | Payment API | High | ✅ Verified | `src/TADR.md` |

## Adding a New TADR

1. Generate: `trust-cli generate-tadr src/feature/name.ts --out src/feature/TADR.md`
2. Update index: `trust-cli tadr-status TADR-XXX --status "pending review"`
3. Human reviews TADR
4. Update status: `trust-cli tadr-status TADR-XXX --status verified`
