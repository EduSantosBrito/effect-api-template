import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi";
import { Payment } from "./domain/payment/types.js";
declare const PaymentsApiGroup_base: HttpApiGroup.HttpApiGroup<"payments", HttpApiEndpoint.HttpApiEndpoint<"createPayment", "POST", "/payments/payments", HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.Json<Schema.Struct<{
    readonly amount: Schema.Struct<{
        readonly amount: Schema.Number;
        readonly currency: Schema.Literals<readonly ["USD", "EUR", "GBP"]>;
    }>;
    readonly description: Schema.optional<Schema.String>;
}>>, HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.Json<typeof Payment>, HttpApiEndpoint.Json<never>, never, never> | HttpApiEndpoint.HttpApiEndpoint<"getPayment", "GET", "/payments/payments/:id", HttpApiEndpoint.StringTree<Schema.Struct<{
    id: Schema.compose<Schema.brand<Schema.String, "PaymentId">, Schema.String>;
}>>, HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.StringTree<never>, HttpApiEndpoint.Json<typeof Payment>, HttpApiEndpoint.Json<never>, never, never>, false>;
/**
 * Payment API Definition
 *
 * Schema-first HTTP API. This is the contract.
 * Implementation is separate (in main.ts).
 */
export declare class PaymentsApiGroup extends PaymentsApiGroup_base {
}
declare const Api_base: HttpApi.HttpApi<"payment-api", typeof PaymentsApiGroup>;
export declare class Api extends Api_base {
}
export {};
//# sourceMappingURL=api.d.ts.map