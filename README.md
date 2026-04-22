# API Scaffold

Perfect stack for Effect v4 beta API projects with trust-first methodology.

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Framework | Effect v4 beta + HttpApi (schema-first) |
| Type Checker | @effect/tsgo (TypeScript-Go + Effect LSP) |
| Testing | @effect/vitest |
| Linting | oxlint + oxfmt |
| Trust | trust-core CLI + trust-architect skill |

## Structure

```
src/
  api.ts              # HttpApi definition (schema-first contract)
  main.ts             # Entry point with NodeRuntime
  domain/
    payment/
      types.ts        # Schemas, errors (Schema.TaggedErrorClass)
      service.ts      # Pure business logic (Effect.fn)
  ports/
    payment-repository.ts   # Context.Service interfaces
  adapters/
    inmemory-payment-repository.ts  # Layer implementations
  layers/
    app.ts            # Layer composition
test/
  payment.test.ts     # it.effect tests with TSDoc Scope/Assertion
specs/
  payment.md          # Spec for AI generation
```

## Quick Start

```bash
# Install dependencies
bun install

# Setup Effect LSP (tsgo)
npx @effect/tsgo setup

# Run type checker
tsgo

# Run tests
bun test

# Run server
bun run dev

# Verify trust properties
trust-cli check --layer=all src/
```

## Trust-First Workflow

1. **Write spec** in `specs/<feature>.md`
2. **Generate code** with `@trust-architect generate specs/<feature>.md`
3. **Verify** with `trust-cli check --layer=all`
4. **Review TADR** (not code)
5. **Ship**

## Key Patterns

- `Effect.fn("name")` for traced functions
- `Effect.fnUntraced` for hot paths
- `return yield*` for terminal effects
- `Schema.decodeUnknownEffect` at all boundaries
- `Context.Service` class syntax
- `it.effect` + `assert` for tests
- TSDoc with `Scope:` and `Assertion:`

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Development server with watch |
| `bun run build` | Build with tsgo |
| `bun run typecheck` | Type check |
| `bun run test` | Run tests |
| `bun run check` | Full check (types + lint + format) |
| `bun run trust:verify` | Run trust-core verification |
