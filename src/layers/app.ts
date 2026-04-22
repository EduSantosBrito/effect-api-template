import { InMemoryPaymentRepositoryLive } from "../adapters/inmemory-payment-repository.js";

/**
 * Application Layer Composition
 *
 * Wires all adapters together.
 * The domain (ports) depends on abstractions.
 * This file provides the concrete implementations.
 */
export const AppLayer = InMemoryPaymentRepositoryLive;
