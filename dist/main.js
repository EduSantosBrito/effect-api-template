import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { HttpRouter } from "effect/unstable/http";
import { HttpApiBuilder, HttpApiScalar } from "effect/unstable/httpapi";
import { createServer } from "node:http";
import { Api } from "./api.js";
import { createPayment, processPayment } from "./domain/payment/service.js";
import { PaymentRepository } from "./ports/payment-repository.js";
import { AppLayer } from "./layers/app.js";
/**
 * API Handlers
 */
const PaymentHandlers = HttpApiBuilder.group(Api, "payments", Effect.fn(function* (handlers) {
    const repo = yield* PaymentRepository;
    return handlers
        .handle("createPayment", ({ payload }) => Effect.gen(function* () {
        const payment = yield* createPayment(payload);
        const processed = yield* processPayment(payment);
        yield* repo.save(processed);
        return processed;
    }).pipe(Effect.orDie))
        .handle("getPayment", ({ params }) => Effect.gen(function* () {
        const payment = yield* repo.findById(params.id);
        if (payment === null) {
            return yield* Effect.die(new Error("Payment not found"));
        }
        return payment;
    }).pipe(Effect.orDie));
})).pipe(Layer.provide(AppLayer));
const ApiRoutes = HttpApiBuilder.layer(Api, {
    openapiPath: "/openapi.json"
}).pipe(Layer.provide(PaymentHandlers));
const DocsRoute = HttpApiScalar.layer(Api, {
    path: "/docs"
});
const AllRoutes = Layer.mergeAll(ApiRoutes, DocsRoute);
export const HttpServerLayer = HttpRouter.serve(AllRoutes).pipe(Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 })));
/**
 * Scope: The main function must bootstrap the application with all layers
 *        and run the HTTP server. If any layer fails to initialize,
 *        the process should exit with an error.
 */
const program = Layer.launch(HttpServerLayer);
/**
 * Assertion: The NodeRuntime should run the program and handle
 *            any defects by logging them and exiting the process.
 */
NodeRuntime.runMain(program);
//# sourceMappingURL=main.js.map