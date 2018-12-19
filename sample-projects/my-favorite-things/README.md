# Objectives: 

 * build a real cool and useful front-end SCA extension
 * use sc-types-frontend-extras and my favorite technologies to see how nice SC code could look like and see if it's really practical / viable:

    * unit-test in other folder (restriction: jasmine)
    * CSS typed using js-css or similar
    * no handlebars - use tsx to write typed templates
    * assets (images) 
      * embed images ? (NOT SUPPORTED YET)

 * Write the TypeScript project as a "normal" (as you were creating any other node.js/react/ project). Things to overcome: 
    * 'npm install some-lib' and maintain its dependency in package.json. (NOT SUPPORTED YET)
    * SC forces to have unique module names so file names are long a tedious - name files and classes with short local names let the tools worry about that. (NOT SUPPORTED YET)
 * 

 * targeting es6 for a better output code

# About the app 

Will let the user discover interests in the site and manage them locally.

Future: be more productive managing configurations for cart, partially filled forms (address, reviews, quotes), checkout configurations, etc.

## Interests

An interest is something representable at the site, like an item, an item option configuratoin, a faceted search configuration, a landing / category page, a particular widget like a merch-zone, a content/banner, a cart configuration, etc. The idea is that, if customer likes something, or has builded something they can store it locally (no need to login) so they can share/visit later

### Interest examples

 * an item
 * an item's options 
 * a landing page
 * a faceted/category search results (including order, page, result-size)
 * a cart (for loading it we need to empty current cart and re-add the items again)
 * an existing product review (comment we liked want to share)
 * a product review Im writing but didn't finish to submit
 * a product comparison we want to share (if that feature would exists)
 * an existing address 
 * an address we are creating (but not submitted)
 * a form we are filling but dont have time to end

### Interest scope

An interest is in relationship with some scope: Example:
 * A faceted search configuration interest 's scope is the catalog (we need to navigate to a page or even set the page-number/order, query, page-size)
 * a certain landing page interest scope is at the page level (we need to navigate)
 * a certain item options configuration's scope is at a particular item . We need to select matrix options and fill other options to load() it
 * a certain cart configuration's scope is the order. We need to buils an order to load() it
 * a certain form/banner scope is the A page, we need to navigate to the page and then scroll / remark / input fill in order to show it.
 * item in the catalog (catalog scope)
 * carts (order scope)
 * item options
 * product review (item scope)
 * landing page (page scope)
 * content like banners, merchs, rel-i (page?)
 * category / facet search (catalog scope)

## UX

 * user dont need to be logged in.
 * Discoverer: 'permanent' control (hidable/configurable) that, shows current page/item/site interests
   * notifies of interests in current page
   * let user run interests search across the catalog/site
 * Interests: 'permanent' control that let user administer list of interests:
   * create new
   * add interests from Discoverer
   * let user create lists of interests manage
   * let users share list of interests
   * let users save() and load() list of interests from string / urls / local storage / custom-records (public ones or user needs to be logged in)

 * extension developers have a HTML and JavaScript API to declare interests. 
  * Example: a new extension is product-compare - I declare a new interest "product-compare", scope===catalog. When user is in a product compare, the Discoverer will notify for this. I can declare interest name, description, icon. Need to implement save(), load().
  * Example: a blog extension, declare "blog entry" interest (scope==='site)
  * example: there is a complex super item option, like a visual 3d arragement for item parts. The extension declares this as an interest so users can save/load this hard to make item configuration.


# Ideas/Future:

 * addresses, payment methods, shipping methods
 * Checkout options
  * Example: for B2B If I always use one of 5 different address/payments/shopping configs, would be awesome to be able to select these in the first checkout step. Now not only cart configuration I can load quickly, but also checkout options 
  * this is tricky because checkout configuration are not URL-representable, however, if we first represent Addresses, payments, shoppings as interests, then is possible to represent a composite checkout config
 * things user is creating but didnt submitted or exist yet, like a item review comment, a form partially filled, an address partially entered, quote, payment, etc etc
  

# Setup and build:

sh build.sh will generate a SCA module to OUTPUT_FOLDER path (see build.sh - supports SCA and extensions)

## run tests in SCA:

cd som/sca/folder
npx gulp unit-test --modules SCTypesFrontEndCoreSCAUnitTest --dont-exit
firefox http://localhost:7777/test1.html