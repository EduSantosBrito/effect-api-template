// Oxlint plugin to flag Effect.orDie usage
// orDie converts recoverable errors into unrecoverable defects — avoid in business logic

const rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Flag Effect.orDie usage — converts typed errors into fiber-terminating defects",
    },
    messages: {
      noOrDie:
        "Effect.orDie turns recoverable errors into unrecoverable defects (fiber termination). Prefer explicit error handling: Effect.catchTag, Effect.catchAll, Effect.orElse, or Effect.mapError. Only use orDie for truly unrecoverable infrastructure failures (e.g., missing config at startup).",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        // Match: Effect.orDie(...)
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Effect" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "orDie"
        ) {
          context.report({
            node,
            messageId: "noOrDie",
          });
        }

        // Match: .pipe(Effect.orDie)  —  callee is .pipe, first arg is Effect.orDie
        if (
          callee.type === "MemberExpression" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "pipe" &&
          node.arguments.length > 0
        ) {
          const firstArg = node.arguments[0];
          if (
            firstArg.type === "MemberExpression" &&
            firstArg.object.type === "Identifier" &&
            firstArg.object.name === "Effect" &&
            firstArg.property.type === "Identifier" &&
            firstArg.property.name === "orDie"
          ) {
            context.report({
              node,
              messageId: "noOrDie",
            });
          }
        }
      },

      // Match: Layer.orDie(...)
      MemberExpression(node) {
        if (
          node.object.type === "Identifier" &&
          node.object.name === "Layer" &&
          node.property.type === "Identifier" &&
          node.property.name === "orDie"
        ) {
          // Only report if this is a call expression's callee (not inside a pipe)
          const parent = node.parent;
          if (parent && parent.type === "CallExpression" && parent.callee === node) {
            context.report({
              node: parent,
              messageId: "noOrDie",
            });
          }
        }
      },
    };
  },
};

const plugin = {
  meta: {
    name: "ban-ordie",
  },
  rules: {
    "no-ordie": rule,
  },
};

export default plugin;
