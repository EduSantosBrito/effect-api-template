import { Context, Effect } from "effect";
import { Payment, PaymentError, PaymentId } from "../domain/payment/types.js";
declare const PaymentRepository_base: Context.ServiceClass<PaymentRepository, "api-scaffold/ports/payment-repository/PaymentRepository", {
    readonly findById: (id: PaymentId) => Effect.Effect<Payment | null, never>;
    readonly save: (payment: Payment) => Effect.Effect<void, PaymentError>;
    readonly list: () => Effect.Effect<ReadonlyArray<Payment>, never>;
}>;
/**
 * Port: PaymentRepository
 *
 * What the domain needs from persistence.
 * The domain knows nothing about PostgreSQL, files, or memory.
 */
export declare class PaymentRepository extends PaymentRepository_base {
}
export {};
//# sourceMappingURL=payment-repository.d.ts.map