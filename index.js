const plugin = {
  meta: {
    name: "eslint-plugin-no-specific-type-assertion",
    version: "1.0.1",
  },
  configs: {},
  rules: {
    "no-specific-type-assertion": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow specific type assertions (e.g., 'as FormatIntlKeys').",
        },
        schema: [
          {
            type: "object",
            properties: {
              disallowedTypes: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
        messages: {
          avoidSpecificTypeAssertion:
            "Avoid using type assertion to '{{type}}'.",
        },
      },
      create(context) {
        const options = context.options[0] || {};
        const disallowedTypes = options.disallowedTypes || [];

        return {
          TSAsExpression(node) {
            if (
              disallowedTypes?.includes(node?.typeAnnotation?.typeName?.name)
            ) {
              context.report({
                node,
                messageId: "avoidSpecificTypeAssertion",
                data: { type: node.typeAnnotation.typeName.name },
              });
            }
          },
          TSTypeAssertion(node) {
            if (
              disallowedTypes?.includes(node?.typeAnnotation?.typeName?.name)
            ) {
              context.report({
                node,
                messageId: "avoidSpecificTypeAssertion",
                data: { type: node.typeAnnotation.typeName.name },
              });
            }
          },
        };
      },
    },
  },

  processors: {},
};

module.exports = plugin;
