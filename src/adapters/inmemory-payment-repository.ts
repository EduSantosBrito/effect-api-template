import { Effect, Layer, Ref } from "effect"
import { Payment, PaymentId } from "../domain/payment/types.js"
import { PaymentRepository } from "../ports/payment-repository.js"

/**
 * Adapter: In-Memory Payment Repository
 *
 * For development and testing.
 * Production would use PostgreSQL via @effect/sql.
 */
export const InMemoryPaymentRepositoryLive = Layer.effect(
  PaymentRepository,
  Effect.gen(function*() {
    const store = yield* Ref.make(new Map<string, Payment>())

    const findById = Effect.fn("InMemoryRepo.findById")(function*(id: PaymentId) {
      const payments = yield* Ref.get(store)
      return payments.get(id) ?? null
    })

    const save = Effect.fn("InMemoryRepo.save")(function*(payment: Payment) {
      yield* Ref.update(store, (map) => new Map(map).set(payment.id, payment))
    })

    const list = Effect.fn("InMemoryRepo.list")(function*() {
      const payments = yield* Ref.get(store)
      return Array.from(payments.values())
    })

    return PaymentRepository.of({ findById, save, list })
  })
)
