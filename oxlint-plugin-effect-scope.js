// Oxlint plugin for Effect scope management
// Warns on redundant Effect.scoped inside Layer constructors
// Warns on unscoped resource acquisition

const redundantScopedRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect redundant Effect.scoped inside Layer constructors",
    },
    messages: {
      redundantScoped:
        "Effect.scoped is redundant here — {{parent}} already provides a scope. Remove the wrapper.",
    },
  },
  create(context) {
    // Track if we're inside a Layer constructor
    let layerDepth = 0;

    return {
      // Entering a Layer constructor call
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Layer" &&
          callee.property.type === "Identifier" &&
          (callee.property.name === "effect" ||
            callee.property.name === "effectContext" ||
            callee.property.name === "effectDiscard")
        ) {
          layerDepth++;
        }

        // Check for Effect.scoped inside Layer
        if (
          layerDepth > 0 &&
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Effect" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "scoped"
        ) {
          context.report({
            node,
            messageId: "redundantScoped",
            data: { parent: "Layer.effect" },
          });
        }
      },

      // Exiting a Layer constructor call
      "CallExpression:exit"(node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Layer" &&
          callee.property.type === "Identifier" &&
          (callee.property.name === "effect" ||
            callee.property.name === "effectContext" ||
            callee.property.name === "effectDiscard")
        ) {
          layerDepth--;
        }
      },
    };
  },
};

const missingScopeRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Detect resource acquisition without scope management",
    },
    messages: {
      missingScope:
        "Resource acquisition ({{resource}}) should be wrapped in Effect.scoped or used inside Layer.effect to ensure cleanup. Consider: Effect.scoped(Effect.acquireRelease(...))",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        // Detect acquireRelease
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Effect" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "acquireRelease"
        ) {
          // Check if we're inside an Effect.scoped call
          let parent = node.parent;
          let isScoped = false;
          while (parent) {
            if (
              parent.type === "CallExpression" &&
              parent.callee.type === "MemberExpression" &&
              parent.callee.object.type === "Identifier" &&
              parent.callee.object.name === "Effect" &&
              parent.callee.property.type === "Identifier" &&
              parent.callee.property.name === "scoped"
            ) {
              isScoped = true;
              break;
            }
            if (
              parent.type === "CallExpression" &&
              parent.callee.type === "MemberExpression" &&
              parent.callee.object.type === "Identifier" &&
              parent.callee.object.name === "Layer" &&
              parent.callee.property.type === "Identifier" &&
              (parent.callee.property.name === "effect" ||
                parent.callee.property.name === "effectContext" ||
                parent.callee.property.name === "effectDiscard")
            ) {
              isScoped = true;
              break;
            }
            parent = parent.parent;
          }

          if (!isScoped) {
            context.report({
              node,
              messageId: "missingScope",
              data: { resource: "acquireRelease" },
            });
          }
        }

        // Detect addFinalizer
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Scope" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "addFinalizer"
        ) {
          let parent = node.parent;
          let isScoped = false;
          while (parent) {
            if (
              parent.type === "CallExpression" &&
              parent.callee.type === "MemberExpression" &&
              parent.callee.object.type === "Identifier" &&
              parent.callee.object.name === "Effect" &&
              parent.callee.property.type === "Identifier" &&
              parent.callee.property.name === "scoped"
            ) {
              isScoped = true;
              break;
            }
            if (
              parent.type === "CallExpression" &&
              parent.callee.type === "MemberExpression" &&
              parent.callee.object.type === "Identifier" &&
              parent.callee.object.name === "Layer" &&
              parent.callee.property.type === "Identifier" &&
              (parent.callee.property.name === "effect" ||
                parent.callee.property.name === "effectContext" ||
                parent.callee.property.name === "effectDiscard")
            ) {
              isScoped = true;
              break;
            }
            parent = parent.parent;
          }

          if (!isScoped) {
            context.report({
              node,
              messageId: "missingScope",
              data: { resource: "addFinalizer" },
            });
          }
        }
      },
    };
  },
};

const plugin = {
  meta: {
    name: "effect-scope",
  },
  rules: {
    "no-overscoped": redundantScopedRule,
    "missing-scope": missingScopeRule,
  },
};

export default plugin;
