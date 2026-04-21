import { Layer } from "effect";
import { PaymentRepository } from "../ports/payment-repository.js";
/**
 * Adapter: In-Memory Payment Repository
 *
 * For development and testing.
 * Production would use PostgreSQL via @effect/sql.
 */
export declare const InMemoryPaymentRepositoryLive: Layer.Layer<PaymentRepository, never, never>;
//# sourceMappingURL=inmemory-payment-repository.d.ts.map