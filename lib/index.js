/**
 * @fileoverview A set of react eslint rules
 * @author Patrick Gillespie
 */
"use strict";

const {name, version} = require('../package.json');

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    name,
    version,
  },
  rules: requireIndex(__dirname + "/rules") // import all rules in lib/rules
}



