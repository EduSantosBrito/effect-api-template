# Spec: Payment Processing

## Ports
- `PaymentService`: Process payments, refund payments
- `PaymentRepository`: Save and retrieve payments

## Error Types
- `PaymentNotFound`: { id: PaymentId } — payment doesn't exist
- `InvalidPaymentAmount`: { reason: string } — amount violates business rules
- `PaymentProcessingError`: { cause: Defect } — unexpected failure

## Schemas
- `PaymentRequest`: { amount: positiveNumber, currency: enum["USD", "EUR"] }
- `Payment`: { id: PaymentId, amount: Money, status: enum["pending", "succeeded"] }

## Contracts
- Pre: amount > 0
- Post: payment.status ∈ ["pending", "succeeded"]

## Test Strategy
- Property: Payment processing is idempotent
- Mutation: Fail on second process call
- Chaos: Repository timeout

## Concurrency
- Sequential — payment processing is atomic

## Resources
- In-memory repository (dev/test)
- PostgreSQL repository (production)
