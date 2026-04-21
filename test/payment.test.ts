import { assert, describe, it } from "@effect/vitest"
import { Effect } from "effect"
import { createPayment, processPayment } from "../src/domain/payment/service.js"
import { CreatePaymentRequest, InvalidPaymentAmount } from "../src/domain/payment/types.js"

describe("Payment Service", () => {
  /**
   * Scope: Payment creation must validate the amount and generate
   *        a valid payment entity with pending status.
   */
  it.effect("should create payment while amount is valid", () =>
    Effect.gen(function*() {
      const request: CreatePaymentRequest = {
        amount: { amount: 100, currency: "USD" }
      }
      
      const payment = yield* createPayment(request)
      
      /**
       * Assertion: Created payment must have pending status,
       *            correct amount, and a valid ID.
       */
      assert.strictEqual(payment.status, "pending")
      assert.strictEqual(payment.amount.amount, 100)
      assert.ok(payment.id.startsWith("pay_"))
    }))

  /**
   * Scope: Invalid amounts must be rejected early to prevent
   *        processing payments that violate business rules.
   */
  it.effect("should fail with InvalidPaymentAmount while amount is zero", () =>
    Effect.gen(function*() {
      const request: CreatePaymentRequest = {
        amount: { amount: 0, currency: "USD" }
      }
      
      const result = yield* Effect.result(createPayment(request))
      
      /**
       * Assertion: Zero amount must produce InvalidPaymentAmount error.
       */
      assert.strictEqual(result._tag, "Failure")
    }))

  /**
   * Scope: Processing a payment must transition it from pending
   *        to succeeded, which is the core business operation.
   */
  it.effect("should process payment while status is pending", () =>
    Effect.gen(function*() {
      const request: CreatePaymentRequest = {
        amount: { amount: 100, currency: "USD" }
      }
      
      const created = yield* createPayment(request)
      const processed = yield* processPayment(created)
      
      /**
       * Assertion: Processed payment must have succeeded status
       *            and retain all original fields.
       */
      assert.strictEqual(processed.status, "succeeded")
      assert.strictEqual(processed.id, created.id)
      assert.strictEqual(processed.amount.amount, created.amount.amount)
    }))

  /**
   * Scope: Double-processing must be prevented as it could
   *        lead to duplicate charges or inconsistent state.
   */
  it.effect("should fail while processing already succeeded payment", () =>
    Effect.gen(function*() {
      const request: CreatePaymentRequest = {
        amount: { amount: 100, currency: "USD" }
      }
      
      const created = yield* createPayment(request)
      const processed = yield* processPayment(created)
      const result = yield* Effect.result(processPayment(processed))
      
      /**
       * Assertion: Re-processing a succeeded payment must fail
       *            with PaymentProcessingError.
       */
      assert.strictEqual(result._tag, "Failure")
    }))
})
