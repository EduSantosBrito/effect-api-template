import { Context, Effect } from "effect";
import { Payment, PaymentId } from "../domain/payment/types.js";

/**
 * Port: PaymentRepository
 *
 * What the domain needs from persistence.
 * The domain knows nothing about PostgreSQL, files, or memory.
 * Runtime implementations own Effect.fn(, return yield*, Schema.decodeUnknownEffect,
 * Effect.<A, E, R>, and Effect.scoped details.
 */
export class PaymentRepository extends Context.Service<
  PaymentRepository,
  {
    readonly findById: (id: PaymentId) => Effect.Effect<Payment | null, never, never>;
    readonly save: (payment: Payment) => Effect.Effect<void, never, never>;
    readonly list: () => Effect.Effect<ReadonlyArray<Payment>, never, never>;
  }
>()("api-scaffold/ports/payment-repository/PaymentRepository") {}
