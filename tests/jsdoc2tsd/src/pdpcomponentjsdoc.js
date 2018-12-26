
/**
 * Representation of the data objects used to send a transaction line representation to the back-end without sending all the heavy weight JSON that is not totally needed by the back-end
 * @typedef {Object} ItemInfo
 *
 * @property {String} internalid
 * @property {Number} [quantity]
 * @property {Array<Object>} [options]
 * @property {Number} [splitquantity]
 * @property {Number} [shipaddress]
 * @property {Number} [shipmethod]
 * @property {Number} [location]
 * @property {String} [fulfillmentChoice]
 * @property {*} [item]
 * @property {String} [item.internalid]
 * @property {String} [item.type]
 * @property {String} [item.onlinecustomerprice_detail]
 */


 
/**
 *  @typedef {Object} MatrixOptionSelection
 *
 * @property {String} custom_item_option
 * @property {String|Number} custom_item_option_value
 */


/**
 *  @typedef {Object} MatrixChild_ItemInfo
 *
 * @property {String} internalid
 * @property {String} custom_item_option??
 * @property {boolean} isbackorderable
 * @property {boolean} isinstock
 * @property {boolean} ispurchasable
 * @property {boolean} isstorepickupallowed
 * @property {String} itemid
 * @property {String} itemtype
 * @property {String} itemtype
 * @property {Array} options
 * @property {String} outofstockbehavior
 * @property {String} outofstockmessage
 * @property {Number} quantityavailable
 * @property {Location} quantityavailableforstorepickup_detail
 * @property {boolean} showoutofstockmessage
 * @property {String} stockdescription

 * @property {object} keyMapping_attributesRating
 * @property {array} keyMapping_attributesToRateOn
 * @property {Breadcrumb} [keyMapping_breadcrumb]
 * @property {Number} keyMapping_comparePriceAgainst
 * @property {String} keyMapping_comparePriceAgainstFormated
 * @property {String} keyMapping_correlatedItemsDetail
 * @property {String} keyMapping_id
 * @property {Image} [keyMapping_images]
 * @property {String} keyMapping_inStockMessage
 * @property {String} keyMapping_isBackorderable
 * @property {String} keyMapping_isInStock
 * @property {String} keyMapping_isPurchasable
 * @property {boolean} keyMapping_isReturnable
 * @property {boolean} keyMapping_isfulfillable
 * @property {boolean} keyMapping_isstorepickupallowed
 * @property {String} keyMapping_itemType
 * @property {String} keyMapping_keywords
 * @property {String} keyMapping_matrixChilds
 * @property {String} keyMapping_matrixParent
 * @property {String} keyMapping_metaTags
 * @property {Number} keyMapping_minimumQuantity
 * @property {String} keyMapping_name
 * @property {String} keyMapping_optionsDetails
 * @property {String} keyMapping_outOfStockMessage
 * @property {String} [keyMapping_pageHeader]
 * @property {String} [keyMapping_pageTitle]
 * @property {Number} keyMapping_price
 * @property {String} keyMapping_priceDetails
 * @property {String} keyMapping_price_formatted
 * @property {StorePickUpDetail} [keyMapping_quantityavailableforstorepickup_detail]
 * @property {Number} keyMapping_rating
 * @property {Number} keyMapping_ratingsCount
 * @property {object} keyMapping_ratingsCountsByRate
 * @property {String} keyMapping_relatedItems
 * @property {String} keyMapping_relatedItemsDetail
 * @property {boolean} keyMapping_showInStockMessage
 * @property {String} keyMapping_showOutOfStockMessage
 * @property {boolean} keyMapping_showQuantityAvailable
 * @property {boolean} keyMapping_showStockDescription
 * @property {String} keyMapping_sku
 * @property {String} keyMapping_stock
 * @property {String} keyMapping_stockDescription
 * @property {String} keyMapping_stockDescriptionClass
 * @property {*} keyMapping_thumbnail

 * @property {String} [keyMapping_thumbnail.url]
 * @property {String} [keyMapping_thumbnail.altimagetext]

 * @property {String} keyMapping_url
 * @property {*} onlinecustomerprice_detail

 * @property {String} [onlinecustomerprice_detail.onlinecustomerprice_formatted]
 * @property {Number} [onlinecustomerprice_detail.onlinecustomerprice]
 */

/**
 *  @typedef {Object} Breadcrumb
 *
 * @property {String} href
 * @property {String} text
 */

/**
 *  @typedef {Object} Image
 *
 * @property {String} altimagetext
 * @property {String} url
 */

/**
 *  @typedef {Object} StorePickUpDetail
 *
 * @property {Number} internalid
 * @property {Number} qtyavailableforstorepickup
 */


/**
 *  @typedef {Object} ItemStockInfo
 *
 * @property {Number} stock
 * @property {String} inStockMessage
 * @property {boolean} isAvailableForPickup
 * @property {boolean} isInStock
 * @property {boolean} isNotAvailableInStore
 * @property {String} outOfStockMessage
 * @property {boolean} showInStockMessage
 * @property {boolean} showQuantityAvailable
 * @property {boolean} showStockDescription
 * @property {String} stockDescription
 * @property {String} stockDescriptionClass
 * @property {StorePickUpDetail} [stockPerLocation]
 */
