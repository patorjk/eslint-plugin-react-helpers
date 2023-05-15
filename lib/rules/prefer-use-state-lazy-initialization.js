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
      useLazyInitialization: 'To prevent re-computation, consider using lazy initial state for useState calls that involve function calls. Ex: useState(() => getValue())',
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

    const hasFunctionCall = (node) => {
      if (node.type === 'CallExpression' && ALLOW_LIST.indexOf(node.callee.name) === -1) {
        return true;
      } else if (node.type === 'ConditionalExpression') {
        return hasFunctionCall(node.test) || hasFunctionCall(node.consequent) || hasFunctionCall(node.alternate);
      } else if (node.type === 'LogicalExpression' || node.type === 'BinaryExpression') {
        return hasFunctionCall(node.left) || hasFunctionCall(node.right);
      }
      return false;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (node.callee && node.callee.name === 'useState') {
          if (node.arguments.length > 0) {
            const useStateInput = node.arguments[0];
            if (hasFunctionCall(useStateInput)) {
              context.report({node, messageId: 'useLazyInitialization' })
            }
          }
        }
      },
    };
  },
};
