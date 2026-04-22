import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup, OpenApi } from "effect/unstable/httpapi";
import { Payment, CreatePaymentRequest, PaymentId } from "./domain/payment/types.js";

/**
 * Payment API Definition
 *
 * Schema-first HTTP API. This is the contract.
 * Implementation is separate (in main.ts).
 */
export class PaymentsApiGroup extends HttpApiGroup.make("payments")
  .add(
    HttpApiEndpoint.post("createPayment", "/payments", {
      payload: CreatePaymentRequest,
      success: Payment,
    }),
    HttpApiEndpoint.get("getPayment", "/payments/:id", {
      params: {
        id: Schema.String.pipe(Schema.decodeTo(PaymentId)),
      },
      success: Payment,
    }),
  )
  .prefix("/payments")
  .annotateMerge(
    OpenApi.annotations({
      title: "Payments",
      description: "Payment processing endpoints",
    }),
  ) {}

export class Api extends HttpApi.make("payment-api")
  .add(PaymentsApiGroup)
  .annotateMerge(
    OpenApi.annotations({
      title: "Payment API",
      version: "1.0.0",
    }),
  ) {}
