/**
 * @fileoverview Detects function calls in useState and suggests using lazy initialization instead.
 * @author Patrick Gillespie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-use-state-lazy-initialization"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("prefer-use-state-lazy-initialization", rule, {
  valid: [
    // give me some code that won't trigger a warning
    'useState(1)',
    'useState("test")',
    'useState(value)',
  ],

  invalid: [
    {
      code: "useState(getValue())",
      errors: [{ message: rule.meta.messages.useLazyInitialization, type: "CallExpression" }],
    },
    {
      code: "useState(a ? b : c)",
      errors: [{ message: rule.meta.messages.useLazyInitializationForConditionalExpressions, type: "CallExpression" }],
    },
    {
      code: "useState(a && b)",
      errors: [{ message: rule.meta.messages.useLazyInitializationForLogicalExpressions, type: "CallExpression" }],
    },
  ],
});
