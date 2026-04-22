// Oxlint plugin to ban `as unknown as Type` patterns
// Use `Schema.decodeSync` or `Schema.decodeUnknownSync` instead

const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Ban `as unknown as` casts — use Schema.decodeSync instead",
    },
    messages: {
      noUnsafeCast:
        "Unsafe `as unknown as` cast detected. Use Schema.decodeSync(Schema) or Schema.decodeUnknownSync(Schema) to construct branded types safely.",
    },
  },
  create(context) {
    return {
      TSAsExpression(node) {
        // Check if the expression being cast is itself a TSAsExpression
        if (
          node.expression.type === "TSAsExpression" &&
          node.expression.typeAnnotation.type === "TSUnknownKeyword"
        ) {
          context.report({
            node,
            messageId: "noUnsafeCast",
          });
        }
      },
    };
  },
};

const plugin = {
  meta: {
    name: "ban-unsafe-casts",
  },
  rules: {
    "no-unsafe-cast": rule,
  },
};

export default plugin;
