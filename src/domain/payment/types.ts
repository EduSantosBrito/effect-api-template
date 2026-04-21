import { Schema } from "effect"

/**
 * Payment domain schemas and error types.
 *
 * All external input must pass through Schema.decodeUnknownEffect.
 * All errors use Schema.TaggedErrorClass for exhaustiveness.
 */

export const PaymentId = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^[a-zA-Z0-9_-]+$/)),
  Schema.brand("PaymentId")
)
export type PaymentId = typeof PaymentId.Type

export const Currency = Schema.Literals(["USD", "EUR", "GBP"])
export type Currency = typeof Currency.Type

export const Money = Schema.Struct({
  amount: Schema.Number.pipe(Schema.check(Schema.isGreaterThan(0))),
  currency: Currency
})
export type Money = typeof Money.Type

export const PaymentStatus = Schema.Literals([
  "pending",
  "processing",
  "succeeded",
  "failed"
])
export type PaymentStatus = typeof PaymentStatus.Type

export class Payment extends Schema.Class<Payment>("Payment")({
  id: PaymentId,
  amount: Money,
  status: PaymentStatus,
  createdAt: Schema.DateTimeUtc
}) {}

export const CreatePaymentRequest = Schema.Struct({
  amount: Money,
  description: Schema.optional(Schema.String)
})
export type CreatePaymentRequest = typeof CreatePaymentRequest.Type

// Errors

export class PaymentNotFound extends Schema.TaggedErrorClass<PaymentNotFound>()(
  "PaymentNotFound",
  { id: PaymentId }
) {}

export class InvalidPaymentAmount extends Schema.TaggedErrorClass<InvalidPaymentAmount>()(
  "InvalidPaymentAmount",
  { reason: Schema.String }
) {}

export class PaymentProcessingError extends Schema.TaggedErrorClass<PaymentProcessingError>()(
  "PaymentProcessingError",
  { cause: Schema.Defect }
) {}

export type PaymentError =
  | PaymentNotFound
  | InvalidPaymentAmount
  | PaymentProcessingError
