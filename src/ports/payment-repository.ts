import { Context, Effect } from "effect";
import { Payment, PaymentError, PaymentId } from "../domain/payment/types.js";

/**
 * Port: PaymentRepository
 *
 * What the domain needs from persistence.
 * The domain knows nothing about PostgreSQL, files, or memory.
 */
export class PaymentRepository extends Context.Service<
  PaymentRepository,
  {
    readonly findById: (id: PaymentId) => Effect.Effect<Payment | null, never>;
    readonly save: (payment: Payment) => Effect.Effect<void, PaymentError>;
    readonly list: () => Effect.Effect<ReadonlyArray<Payment>, never>;
  }
>()("api-scaffold/ports/payment-repository/PaymentRepository") {}
