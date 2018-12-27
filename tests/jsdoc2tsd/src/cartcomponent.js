
// Data types:

/**
 * This is the representation of Promotion objects for methods liks {@link addPromotion}, {@link getPromotions} etc
 * @typedef {Object} Promotion
 * @property {String} [internalid]
 * @property {String} type
 * @property {String} name
 * @property {String} rate
 * @property {String} code
 * @property {String} errormsg
 * @property {Boolean} isvalid
 */

/**
 * Data type for adding new lines to the cart
 * @typedef {Object} AddLine
 * @property {Line} line
 */

/**
 * Data type for adding new lines to the cart
 * @typedef {Object} AddLines
 * @property {Array<Line>} lines
 */

/**
 * This is the representation of the cart's line objects with you call {@link addLine}, {@link getLine}, etc
 * @typedef {Object} Line
 * @property {String} [internalid]
 * @property {Number} [quantity]
 * @property {Number} [amount]
 * @property {Number} [rate]
 * @property {Number} [tax_amount]
 * @property {String} [tax_code]
 * @property {String} [itemtype]
 * @property {*} [item]
 *
 * @property {Number} item.internalid
 * @property {String} [item.itemid]
 * @property {String} [item.displayname]
 * @property {Boolean} [item.isinactive]
 * @property {String} [item.itemtype]
 * @property {Number} [item.minimumquantity]
 *
 * @property {Array<LineOption>} [options]
 *
 * @property {*} [extras]
 *
 * @property {String} [extras.shipaddress] SCA specific
 * @property {String} [extras.shipmethod] SCA specific
 * @property {Number} [extras.tax_rate] SCA specific
 * @property {String} [extras.rate_formatted] SCA specific
 * @property {Number} [extras.discount] SCA specific
 * @property {number} [extras.total] SCA specific
 * @property {String} [extras.amount_formatted] SCA specific
 * @property {String} [extras.tax_amount_formatted] SCA specific
 * @property {String} [extras.discount_formatted] SCA specific
 * @property {String} [extras.total_formatted] SCA specific
 * @property {String} [extras.description] SCIS specific
 * @property {String} [extras.giftcertfrom] SCIS specific
 * @property {String} [extras.giftcertmessage] SCIS specific
 * @property {Number} [extras.giftcertnumber] SCIS specific
 * @property {String} [extras.giftcertrecipientemail] SCIS specific
 * @property {String} [extras.giftcertrecipientname] SCIS specific
 * @property {String} [extras.taxrate1] SCIS specific
 * @property {String} [extras.taxrate2] SCIS specific
 * @property {String} [extras.grossamt] SCIS specific
 * @property {String} [extras.tax1amt] SCIS specific
 * @property {String} [extras.custreferralcode] SCIS specific
 * @property {Boolean} [extras.excludefromraterequest] SCIS specific
 * @property {String} [extras.custcol_ns_pos_voidqty] SCIS specific
 * @property {Number} [extras.voidPercentage] SCIS specific
 * @property {Number} [extras.returnedQuantity] SCIS specific
 * @property {Boolean} [extras.isUnvalidatedReturn] SCIS specific
 * @property {Boolean} [extras.order] SCIS specific
 * @property {String} [extras.note] SCIS specific

 */


/**
 * This is the representation of the line's option in the  {@link Line} type
 * @typedef {Object} LineOption
 * @property {String} cartOptionId
 * @property {{internalid:String}} value an object with a String property *internalid*
 */









/**
 * This is the representation of the cart's summary returned by  {@link getSummary},  etc
 * @typedef {Object} Summary
 * @property {Number} [total]
 * @property {Number} [taxtotal]
 * @property {Number} [tax2total]
 * @property {Number} [discounttotal]
 * @property {Number} [subtotal]
 * @property {Number} [shippingcost]
 * @property {Number} [handlingcost]
 * @property {Number} [giftcertapplied]

 * @property {String} [discounttotal_formatted] SCA specific
 * @property {String} [taxonshipping_formatted] SCA specific
 * @property {String} [taxondiscount_formatted] SCA specific
 * @property {Number} [itemcount] SCA specific
 * @property {String} [taxonhandling_formatted] SCA specific
 * @property {Number} [discountedsubtotal] SCA specific
 * @property {String} [discountedsubtotal_formatted] SCA specific
 * @property {Number} [taxondiscount] SCA specific
 * @property {String} [handlingcost_formatted] SCA specific
 * @property {Number} [taxonshipping] SCA specific
 * @property {String} [taxtotal_formatted] SCA specific
 * @property {String} [totalcombinedtaxes_formatted] SCA specific
 * @property {Number} [totalcombinedtaxes] SCA specific
 * @property {String} [giftcertapplied_formatted] SCA specific
 * @property {String} [shippingcost_formatted] SCA specific
 * @property {Number} [discountrate] SCA specific
 * @property {Number} [taxonhandling] SCA specific
 * @property {String} [tax2total_formatted] SCA specific
 * @property {String} [discountrate_formatted] SCA specific
 * @property {Number} [estimatedshipping] SCA specific
 * @property {String} [estimatedshipping_formatted] SCA specific
 * @property {String} [total_formatted] SCA specific
 * @property {String} [subtotal_formatted] SCA specific

 * @property {String} shippingtax1rate SCIS specific
 * @property {Boolean} shippingcostoverridden SCIS specific
 * @property {Number} amountdue SCIS specific
 * @property {String} tranid SCIS specific
 * @property {Date} createddate SCIS specific
 * @property {String} couponcode SCIS specific
 * @property {Date} createdfrom SCIS specific
 * @property {Number} changedue SCIS specific
 */



/**
 * in SCA the object returned by getShoppingSession().getOrder().submit()
 * @typedef {Object} ConfirmationSubmit
 */



/**
 * This is the representation an address
 * @typedef {Object} Address
 * @property {String} internalid
 * @property {String} zip
 * @property {String} country
 * @property {String} addr1
 * @property {String} addr2
 * @property {String} addr3
 * @property {String} city
 * @property {String} company
 * @property {Boolean} defaultbilling
 * @property {Boolean} defaultshipping
 * @property {String} fullname
 * @property {Boolean} isresidential
 * @property {Boolean} isvalid
 * @property {String} phone
 * @property {String} state
 */

/**
 * This is the representation of a shipping method
 * @typedef {Object} ShipMethod
 * @property {String} internalid
 * @property {String} name
 * @property {Number} rate
 * @property {String} rate_formatted
 * @property {String} shipcarrier
 */

/**
 * This is the representation of a shipping method
 * @typedef {Object} PaymentMethod
 * @property {String} internalid
 * @property {String} type valid options: [creditcard, invoice, paypal, giftcertificate, external_checkout]
 * @property {CreditCard} creditcard Required only if it is a creditcard

 * @property {String} creditcard.ccnumber Required only if it is a creditcard
 * @property {String} creditcard.ccname Required only if it is a creditcard
 * @property {String} creditcard.ccexpiredate Required only if it is a creditcard
 * @property {String} creditcard.expmonth Required only if it is a creditcard
 * @property {String} creditcard.expyear Required only if it is a creditcard
 * @property {String} creditcard.ccsecuritycode Required only if it is a creditcard

 * @property {String} creditcard.paymentmethod.internalid
 * @property {String} creditcard.paymentmethod.name
 * @property {Boolean} creditcard.paymentmethod.creditcard
 * @property {Boolean} creditcard.paymentmethod.ispaypal
 * @property {String} creditcard.paymentmethod.key

 * @property {String} key
 * @property {String} thankyouurl
 * @property {String} errorurl
 * @property {String} giftcertificate.code Required only if it is a giftcertificate

 */