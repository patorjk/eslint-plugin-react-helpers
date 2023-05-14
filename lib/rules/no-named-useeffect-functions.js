/**
 * @fileoverview Disallows named function in useEffect hooks
 * @author Patrick Gillespie
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Disallows named function in useEffect hooks",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      namedUseEffect: 'Please do not name useEffect input functions.'
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (node.callee && node.callee.name === 'useEffect') {
          if (node.arguments.length > 0) {
            const inputFunction = node.arguments[0];
            if (inputFunction.id && inputFunction.id.name) {
              context.report({node, messageId: 'namedUseEffect' })
            }
          }
        }
      }
    };
  },
};
