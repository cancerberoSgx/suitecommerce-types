declares global variables defined or used by SuiteCommerce code - some are libraries and other just globals

HEADS UP 

his library is mostly types - this means that it does't implement stuff just delivers types that **doesn't add any payload to the final application**

Most of this types are just interfaces and types so they really dont add any payload to the application. 

Also there are some special cases when there are also class declarations which are needed since users might extend them:

 * BackboneView
 * BackboneModel
 * BackboneRouter
 * BackboneCollection

 Also in this case these add no payload since ts-devtools will replace the objects with native SC ones when required. 

 This package shouldn't implement any helper since when required ts-devtools will replace objecst with SC native's

 Related to this, it has libraries like backbone, jqauery, underscore in devdependencies but these are only used for testing