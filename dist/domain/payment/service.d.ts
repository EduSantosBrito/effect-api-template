import { Effect } from "effect";
import { InvalidPaymentAmount, Payment, PaymentProcessingError } from "./types.js";
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
export declare const validateAmount: (money: {
    readonly amount: number;
    readonly currency: "EUR" | "GBP" | "USD";
}) => Effect.Effect<{
    readonly amount: number;
    readonly currency: "EUR" | "GBP" | "USD";
}, InvalidPaymentAmount, never>;
/**
 * Scope: Creating a payment must generate a valid ID, set initial status,
 *        and record the creation time for audit purposes.
 */
export declare const createPayment: (request: {
    readonly amount: {
        readonly amount: number;
        readonly currency: "EUR" | "GBP" | "USD";
    };
    readonly description?: string | undefined;
}) => Effect.Effect<Payment, InvalidPaymentAmount, never>;
/**
 * Scope: Processing a payment transitions it from pending to succeeded.
 *        This is the core business operation.
 */
export declare const processPayment: (payment: Payment) => Effect.Effect<Payment, PaymentProcessingError, never>;
//# sourceMappingURL=service.d.ts.map