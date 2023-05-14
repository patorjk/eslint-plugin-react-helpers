/**
 * @fileoverview Disallows named function in useEffect hooks
 * @author Patrick Gillespie
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-named-useeffect-functions"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-named-useeffect-functions", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: `
        useEffect(
          function() {
            console.log(value);
          }, 
          [value]
        ); 
      `
    }
  ],

  invalid: [
    {
      code: "useEffect(function myUseEffect() {})",
      errors: [{ message: "Please do not name useEffect input functions.", type: "CallExpression" }],
    },
    {
      code: `
        useEffect(
          function test() {
            console.log(value);
          }, 
          [value]
        ); 
      `,
      errors: [{ message: "Please do not name useEffect input functions.", type: "CallExpression" }],
    },
  ],
});
