import { Clock, DateTime, Effect, Random, Schema } from "effect";
import {
  CreatePaymentRequest,
  InvalidPaymentAmount,
  Money,
  Payment,
  PaymentId,
  PaymentProcessingError,
} from "./types.js";

/**
 * Pure business logic for payment processing.
 *
 * No side effects, no external dependencies.
 * All functions return Effect for consistency.
 */

/**
 * Scope: Payment amount validation must ensure business rules
 *        (minimum amount, currency support) before processing.
 */
export const validateAmount = Effect.fn("validateAmount")(function* (money: Money) {
  if (money.amount < 0.01) {
    return yield* new InvalidPaymentAmount({
      reason: "Amount must be at least 0.01",
    });
  }
  return money;
});

/**
 * Scope: Creating a payment must generate a valid ID, set initial status,
 *        and record the creation time for audit purposes.
 */
export const createPayment = Effect.fnUntraced(function* (request: CreatePaymentRequest) {
  const validAmount = yield* validateAmount(request.amount);
  const now = yield* Clock.currentTimeMillis;
  const random = yield* Random.nextInt;

  const id = yield* Schema.decodeUnknownEffect(PaymentId)(`pay_${now}_${random}`).pipe(
    Effect.mapError(
      (error) =>
        new PaymentProcessingError({
          cause: new Error(`Generated invalid PaymentId: ${error}`),
        }),
    ),
  );

  const createdAt = yield* DateTime.now;

  return new Payment({
    id,
    amount: validAmount,
    status: "pending",
    createdAt,
  });
});

/**
 * Scope: Processing a payment transitions it from pending to succeeded.
 *        This is the core business operation.
 */
export const processPayment = Effect.fn("processPayment")(function* (payment: Payment) {
  if (payment.status !== "pending") {
    return yield* new PaymentProcessingError({
      cause: new Error(`Cannot process payment with status: ${payment.status}`),
    });
  }

  return new Payment({
    ...payment,
    status: "succeeded",
  });
});
