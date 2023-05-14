/**
 * @fileoverview Detects function calls in useState and suggests using lazy initialization instead.
 * @author Patrick Gillespie
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Detects function calls in useState and suggests using lazy initialization instead.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      useLazyInitialization: 'To prevent re-computation, consider using lazy initial state for useState. Ex: useState(() => whatever()) instead of useState(whatever()).',
      useLazyInitializationForConditionalExpressions: 'To prevent re-computation, consider using lazy initial state for useState. Ex: useState(() => test ? 1 : 0) instead of useState(test ? 1 : 0)',
      useLazyInitializationForLogicalExpressions: 'To prevent re-computation, consider using lazy initial state for useState. Ex: useState(() => a && b) instead of useState(a && b)',
      useLazyInitializationForBinaryExpressions: 'To prevent re-computation, consider using lazy initial state for useState. Ex: useState(() => a > b) instead of useState(a > b)',
    }
  },

  // rule takes inspiration from https://github.com/facebook/react/issues/26520
  create(context) {
    // variables should be defined here
    const ALLOW_LIST = Object.freeze(['Boolean', 'String']);

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (node.callee && node.callee.name === 'useState') {
          if (node.arguments.length > 0) {
            const useStateInput = node.arguments[0];
            if (useStateInput.type === 'CallExpression' && ALLOW_LIST.indexOf(useStateInput.callee.name) === -1) {
              context.report({node, messageId: 'useLazyInitialization' })
            } else if (useStateInput.type === 'ConditionalExpression') {
              context.report({node, messageId: 'useLazyInitializationForConditionalExpressions' })
            } else if (useStateInput.type === 'LogicalExpression') {
              context.report({node, messageId: 'useLazyInitializationForLogicalExpressions' })
            } else if (useStateInput.type === 'BinaryExpression') {
              context.report({node, messageId: 'useLazyInitializationForBinaryExpressions' })
            }
          }
        }
      },
    };
  },
};
