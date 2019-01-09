# TypeScript for SuiteCommerce. 

Write your SuiteCommerce Advanced modules and SuiteCommerce extensions using TypeScript.

 * Supports SCA: `gulp deploy`, `gulp local`, `gulp unit-test`
 * Supports SC Extensions: `gulp extension:deploy`, `gulp extension:local`
 * Write latest TypeScript JavaScript language version code, use classes, interfaces, async/await for promises, arrow functions, string templates, etc 
 * TypeChecking for views, routers, models, collections, extension components, and high level SCA APIs. 
 * Using TSX you can type check your templates too! See [sample project](https://github.com/cancerberoSgx/suitecommerce-types/blob/master/sample-projects/jsx-view-tests)
 * Output JS code is clean, no performance impact, and ES5 support

Note: Right now this is only for front end code. For SuiteScript you can use (TODO: link to SuiteScript-2.0-typings external project), eventually we could include that in devtools to be able to write both frontend and back Wend using same technology, but right now this is only front-end.

This repository is mostly divided in two parts, projects implementing SuiteCommerce API type descriptions (Typings) and Developer tools to transform TypeScript projects, into SuiteCommerce AMD JavaScript projects (see below). 

## Typings projects

TypeScript to SuiteCommerce code transformation and developer tools:  https://github.com/cancerberoSgx/suitecommerce-types/tree/master/ts-devtools

SuiteCommerce types, globals, SCA, components: 

 * https://github.com/cancerberoSgx/suitecommerce-types/tree/master/sc-types-frontend
 * https://github.com/cancerberoSgx/suitecommerce-types/tree/master/sc-types-frontend-core
 * https://github.com/cancerberoSgx/suitecommerce-types/tree/master/sc-types-frontend-globals


## Developer tools projects

Special developer tools convert a TS project into a SC / SCA module. See docs in:

 * https://github.com/cancerberoSgx/suitecommerce-types/tree/master/st-devtools


## Code examples: 

### Backbone module

With views, router, models, collections. Using SC standard technologies like Handlebars, Sass. Supports SCA gulp `gulp local` and `gulp unit-test` command: 

https://github.com/cancerberoSgx/suitecommerce-types/blob/master/sample-projects/backbone-simple

### Using TSX / JSX (react like syntax but no framework) to write view's templates

 * Project: https://github.com/cancerberoSgx/suitecommerce-types/blob/master/sample-projects/jsx-view-tests
