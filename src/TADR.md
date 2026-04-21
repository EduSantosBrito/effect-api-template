# TADR-001: Payment API

## Trust Properties
- **Type signature**: `Effect<Payment, PaymentError, PaymentRepository>`
- **Error types**: `PaymentNotFound | InvalidPaymentAmount | PaymentProcessingError`
- **Schema boundaries**: `CreatePaymentRequest` validated via `Schema.decodeUnknownEffect`
- **Resource safety**: Repository managed via Layer.effect
- **Concurrency**: Sequential
- **Test coverage**: 100% branch on error paths, property test for idempotency

## Verification
- [x] Type check passes (tsgo)
- [x] Tests pass (8 tests, 0 failures)
- [x] No N+1 query patterns detected
- [x] All errors handled exhaustively
- [x] Mutation testing: all mutants killed
- [x] Property-based tests: idempotency verified

## Human Review Focus
- Is `InvalidPaymentAmount` the right granularity?
- Should we support partial payments?
- Is the idempotency window long enough?

## References
- specs/payment.md
