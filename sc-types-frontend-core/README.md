# Usage

Please use sc-types-frontend instead this one directly. 

Declares global variables defined or used by SuiteCommerce code - some are libraries and other just globals

Most of this types are just interfaces and types so they really dont add any payload to the application. 

 * SuiteCommerce core API
 * SuiteCommerce extensibility API and components
 * SuiteCommerce Advanced high level APIs like View, PluginContainer, Application, Layout
 * SuiteCommerce core libraries API like jQuery, underscore, backbone

TODO: which SC version supports ? 

# design notes

This library is mostly types - this means that it does't implement stuff just delivers types that **doesn't add any payload to the final application**

Note: in so there are some special cases when there are also class declarations which are needed since users might extend them:

 * BackboneView
 * BackboneModel
 * BackboneRouter
 * BackboneCollection
 * TODO the rest

When you require these, they will be replaced with SC native objects, for example "BackboneView" will bring "Backbone.View" SCA module
