import { Schema } from "effect";
/**
 * Payment domain schemas and error types.
 *
 * All external input must pass through Schema.decodeUnknownEffect.
 * All errors use Schema.TaggedErrorClass for exhaustiveness.
 */
export declare const PaymentId: Schema.brand<Schema.String, "PaymentId">;
export type PaymentId = typeof PaymentId.Type;
export declare const Currency: Schema.Literals<readonly ["USD", "EUR", "GBP"]>;
export type Currency = typeof Currency.Type;
export declare const Money: Schema.Struct<{
    readonly amount: Schema.Number;
    readonly currency: Schema.Literals<readonly ["USD", "EUR", "GBP"]>;
}>;
export type Money = typeof Money.Type;
export declare const PaymentStatus: Schema.Literals<readonly ["pending", "processing", "succeeded", "failed"]>;
export type PaymentStatus = typeof PaymentStatus.Type;
declare const Payment_base: Schema.Class<Payment, Schema.Struct<{
    readonly id: Schema.brand<Schema.String, "PaymentId">;
    readonly amount: Schema.Struct<{
        readonly amount: Schema.Number;
        readonly currency: Schema.Literals<readonly ["USD", "EUR", "GBP"]>;
    }>;
    readonly status: Schema.Literals<readonly ["pending", "processing", "succeeded", "failed"]>;
    readonly createdAt: Schema.DateTimeUtc;
}>, {}>;
export declare class Payment extends Payment_base {
}
export declare const CreatePaymentRequest: Schema.Struct<{
    readonly amount: Schema.Struct<{
        readonly amount: Schema.Number;
        readonly currency: Schema.Literals<readonly ["USD", "EUR", "GBP"]>;
    }>;
    readonly description: Schema.optional<Schema.String>;
}>;
export type CreatePaymentRequest = typeof CreatePaymentRequest.Type;
declare const PaymentNotFound_base: Schema.Class<PaymentNotFound, Schema.TaggedStruct<"PaymentNotFound", {
    readonly id: Schema.brand<Schema.String, "PaymentId">;
}>, import("effect/Cause").YieldableError>;
export declare class PaymentNotFound extends PaymentNotFound_base {
}
declare const InvalidPaymentAmount_base: Schema.Class<InvalidPaymentAmount, Schema.TaggedStruct<"InvalidPaymentAmount", {
    readonly reason: Schema.String;
}>, import("effect/Cause").YieldableError>;
export declare class InvalidPaymentAmount extends InvalidPaymentAmount_base {
}
declare const PaymentProcessingError_base: Schema.Class<PaymentProcessingError, Schema.TaggedStruct<"PaymentProcessingError", {
    readonly cause: Schema.Defect;
}>, import("effect/Cause").YieldableError>;
export declare class PaymentProcessingError extends PaymentProcessingError_base {
}
export type PaymentError = PaymentNotFound | InvalidPaymentAmount | PaymentProcessingError;
export {};
//# sourceMappingURL=types.d.ts.map