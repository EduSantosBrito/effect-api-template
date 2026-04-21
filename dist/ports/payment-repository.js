import { Context } from "effect";
/**
 * Port: PaymentRepository
 *
 * What the domain needs from persistence.
 * The domain knows nothing about PostgreSQL, files, or memory.
 */
export class PaymentRepository extends Context.Service()("api-scaffold/ports/payment-repository/PaymentRepository") {
}
//# sourceMappingURL=payment-repository.js.map