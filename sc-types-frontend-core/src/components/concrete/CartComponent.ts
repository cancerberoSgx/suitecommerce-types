import { VisualComponent } from './VisualComponent'
import { Deferred } from '../../thirdParty'
import { TODO } from '../../types'

/**
 * Provides methods for manipulating cart's lines, summary, estimates, promotions, submit. 
 * 
 * It also expose cancelable events that will be triggered before and after lines, estimates, promotions, etc change. 
 * 
 * An instance of this component can obtained by calling `container.getComponent('cart')`.
 */
export interface CartComponent extends VisualComponent {

	/**
   * Name of the cart main view. Please use this name to reference views in methods like {@link addChildView}, {@link addToViewContextDefinition}, etc
   */
  CART_VIEW: string

  /**
   * Name of the mini-cart main. Please use this name to reference views in methods like {@link addChildView}, {@link addToViewContextDefinition}, etc
   */
  CART_MINI_VIEW: string

  /**
   */
  WIZARD_VIEW: string

  /**
   * Adds a new line into the cart. Returns a Deferred that is resolved into the added line id {@link String}, in the case the operation was done successfully, or rejected with an error message. Example: 
   * 
   * ```javascript
   * 	container.getComponent('Cart').addLine({
   * 		line: {
   * 			quantity: 1, 
   * 			item: {
   * 				internalid: 8058
   * 			}
   * 		}
   * 	}).then(()=>{alert(Utils.translate('Item added'))})
   * ```
   */
  addLine(data: AddLine): Deferred<string>

  /**
   * Adds new lines into the cart. Returns a Deferred that is resolved with the an array of line ids (Array of strings) into the added line id in the case the operation or rejected with an error message. See {@link CartComponent#addLine}
   */
  addLines(lines: AddLines): Deferred<string[]>

  /**
   * returns the lines of the cart as a  Deferred that is resolved in the case the operation was done successfully or the promise is rejected with an error message. The promise resolves with an array of {@link Line}
   */
  getLines(): Deferred<Line[]>

  /**
   * Removes a line from the cart. Returns a Deferred that is resolved in the case the operation was done successfully or rejected with an error message.
   * @param internalid id of the line to remove
   */
  removeLine(internalid: string): Deferred

  /**
   * Updates a cart's line. Returns a Deferred that is resolved with {@link Line} in the case the operation was done successfully, or rejected with an error message.
   */
  updateLine(line: Line): Deferred<Line>

  /**
   * Returns the summary of the cart as a Deferred that is resolved with a {@link Summary} in the case the operation was done successfully or rejected with an error message.
   */
  getSummary(): Deferred<Summary>

  /**
   * Submits the order. Returns a Deferred that is resolved with a {@link ConfirmationSubmit} object in the case the operation was done successfully, or rejected with an error message.
   */
  submit(): Deferred<ConfirmationSubmit>

  /**
   * Adds a payment method
   * //TODO: returns? - Deferred resolved with ?
   * //TODO: data parameter ? what's the structure?
   */
  addPayment(data: TODO): TODO

  /**
   * Returns the payment methods added to the order
   * @return Return a jQuery Deferred that is resolved with an array of {@link PaymentMethod} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getPaymentMethods(): Deferred<PaymentMethod[]>

  /**
   * Adds a promotion
   * @param data the promocode to add
   */
  addPromotion(data: { promocode: string }): void

  /**
   * Removes a promotion
   * TODO: check param and deferred resolve with
   */
  removePromotion(data: { promocode_internalid: string }): Deferred<TODO>


  /**
   * Returns the promotions' codes added to the cart
   * @return Returns a Deferred that is resolved with an array of {@link Promotion} in the case the operation was done successfully or rejected with an error message.
   */
  getPromotions(): Deferred<Promotion[]>

  /**
  Returns the estimated shipping costs
  @param {{zip: string, country: string}} locationData
  TODO: returns ?
  */
  estimateShipping(locationData: { zip: string, country: string }): TODO

  /**
   * Removes the shipping method
   * 	// TODO: returns ?
   * TODO @params?
   */
  removeShipping(...args: TODO[]): TODO

  /**
   * Clears the shopping estimations in the cart
   * TODO: returns ?
   * TODO: params?
   */
  clearEstimateShipping(...args: TODO[]): TODO

  /**
   * Returns the addresses of the order
   * @return Return a jQuery Deferred that is resolved with an array of {@link Address} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getAddresses(): Deferred<Address[]>

  /**
   * Returns the shipping address of the order
   * @return Return a jQuery Deferred that is resolved with an {@link Address} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getShipAddress(): Deferred<Address>
  /**
   * Returns the billing address of the order
   * @return Return a jQuery Deferred that is resolved with an {@link Address} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getBillAddress(): Deferred<Address>
  /**
   * Returns the ship methods of the order
   * @return Return a jQuery Deferred that is resolved with an array of {@link ShipMethod} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getShipMethods(): Deferred<ShipMethod[]>
  /**
   * Returns the selected shipping method of the order
   * @return Return a jQuery Deferred that is resolved with an array of {@link ShipMethod} in the case the operation was done successfully or the promise is rejected with an error message.
   */
  getShipMethod(): Deferred<ShipMethod[]>



  /**
   * Voids a line. Implemented only for SCIS
   * //TODO: params ?
   * // TODO return ?
   */
  voidLine(...args: TODO[]): TODO

  /**
   * Un-voids a line. Implemented only for SCIS
   *
   * //TODO: params ?
   * // TODO return ?
   */
  unvoidLine(...args: TODO[]): TODO
  /**
   * Updates a customer data. Implemented only for SCIS
   * //TODO: params ?
   * // TODO return ?
   */
  updateCustomer(...args: TODO[]): TODO

}


//Events:

// TODO


/**
 * Cancelable event triggered before a cart's line is updated. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeUpdateLine
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after a cart's line is updated See
 * TODO: type
 * @event CartComponent#afterUpdateLine
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Cancelable event triggered before a cart's line is removed. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeRemoveLine
 * @type {object}
 * @property {boolean} TODO TODO
 */


/**
 * Triggered after a cart's line is removed
 * TODO: type
 * @event CartComponent#afterRemoveLine
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Cancelable event triggered before doing an estimate shipping in the cart. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeEstimateShipping
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after an estimate shipping is done in the cart
 * TODO: type
 * @event CartComponent#afterEstimateShipping
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Cancelable event triggered before clearing an estimate shipping in the cart. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeClearEstimateShipping
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after an estimate shipping is cleared in the cart
 * TODO: type
 * @event CartComponent#afterClearEstimateShipping
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered before a promotion is added to the cart. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeAddPromotion
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered before a promotion is added to the cart
 * TODO: type
 * @event CartComponent#afterAddPromotion
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered before a promocode is removed from the cart. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeRemovePromotion
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after a promocode is removed from the cart
 * TODO: type
 * @event CartComponent#afterRemovePromotion
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered before a payment method is added to the order. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeAddPayment
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after a payment method is added to the order
 * TODO: type
 * @event CartComponent#afterAddPayment
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 *  Triggered before the order is submitted. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeSubmit
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after the order is submitted
 * TODO: type
 * @event CartComponent#afterSubmit
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Cancelable event triggered before adding a new cart's line. See {@link CancelableEvents}
 * TODO: type
 * @event CartComponent#beforeAddLine
 * @type {object}
 * @property {boolean} TODO TODO
 */

/**
 * Triggered after a new line is added in the cart
 * TODO: type
 * @event CartComponent#afterAddLine
 * @type {object}
 * @property {boolean} TODO TODO
 */


// Data types:
/**
 * This is the representation of Promotion objects for methods {@link addPromotion}, {@link getPromotions} etc
 */
declare type Promotion = {
  internalid?: string
  type?: string
  name?: string
  rate?: string
  code?: string
  errormsg?: string
  isvalid?: boolean
}

/**
* Data type for adding new lines to the cart
*/
declare type AddLine = {
  line?: Line
}

/**
* Data type for adding new lines to the cart
*/
declare type AddLines = {
  lines?: Line[]
}

/**
* This is the representation of the cart's line objects with you call {@link addLine}, {@link getLine}, etc
*/
declare type Line = {
  internalid?: string
  quantity?: number
  amount?: number
  rate?: number
  tax_amount?: number
  tax_code?: string
  itemtype?: string
  item?: {
    internalid: number
    itemid?: string
    displayname?: string
    isinactive?: boolean
    itemtype?: string
    minimumquantity?: number
  }
  options?: LineOption[]
  extras?: {
    shipaddress?: string
    shipmethod?: string
    tax_rate?: number
    rate_formatted?: string
    discount?: number
    total?: number
    amount_formatted?: string
    tax_amount_formatted?: string
    discount_formatted?: string
    total_formatted?: string
    description?: string
    giftcertfrom?: string
    giftcertmessage?: string
    giftcertnumber?: number
    giftcertrecipientemail?: string
    giftcertrecipientname?: string
    taxrate1?: string
    taxrate2?: string
    grossamt?: string
    tax1amt?: string
    custreferralcode?: string
    excludefromraterequest?: boolean
    custcol_ns_pos_voidqty?: string
    voidPercentage?: number
    returnedQuantity?: number
    isUnvalidatedReturn?: boolean
    order?: boolean
    note?: string
  }
}

/**
* This is the representation of the line's option in the  {@link Line} type
*/
declare type LineOption = {
  cartOptionId: string
  value: any
}

/**
* This is the representation of the cart's summary returned by  {@link getSummary},  etc
*/
declare type Summary = {
  total?: number
  taxtotal?: number
  tax2total?: number
  discounttotal?: number
  subtotal?: number
  shippingcost?: number
  handlingcost?: number
  giftcertapplied?: number
  discounttotal_formatted?: string
  taxonshipping_formatted?: string
  taxondiscount_formatted?: string
  itemcount?: number
  taxonhandling_formatted?: string
  discountedsubtotal?: number
  discountedsubtotal_formatted?: string
  taxondiscount?: number
  handlingcost_formatted?: string
  taxonshipping?: number
  taxtotal_formatted?: string
  totalcombinedtaxes_formatted?: string
  totalcombinedtaxes?: number
  giftcertapplied_formatted?: string
  shippingcost_formatted?: string
  discountrate?: number
  taxonhandling?: number
  tax2total_formatted?: string
  discountrate_formatted?: string
  estimatedshipping?: number
  estimatedshipping_formatted?: string
  total_formatted?: string
  subtotal_formatted?: string
  shippingtax1rate?: string
  shippingcostoverridden?: boolean
  amountdue?: number
  tranid?: string
  createddate?: Date
  couponcode?: string
  createdfrom?: Date
  changedue?: number
}

/**
* in SCA the object returned by getShoppingSession().getOrder().submit()
*/
declare type ConfirmationSubmit = any

/**
* This is the representation an address
*/
declare type Address = {
  internalid?: string
  zip?: string
  country?: string
  addr1?: string
  addr2?: string
  addr3?: string
  city?: string
  company?: string
  defaultbilling?: boolean
  defaultshipping?: boolean
  fullname?: string
  isresidential?: boolean
  isvalid?: boolean
  phone?: string
  state?: string
}

/**
* This is the representation of a shipping method
*/
declare type ShipMethod = {
  internalid?: string
  name?: string
  rate?: number
  rate_formatted?: string
  shipcarrier?: string
}

/**
* This is the representation of a shipping method



*/
declare type PaymentMethod = {
  internalid?: string
  type?: string
  creditcard?: {
    ccnumber?: string
    ccname?: string
    ccexpiredate?: string
    expmonth?: string
    expyear?: string
    ccsecuritycode?: string
  }
  key?: string
  thankyouurl?: string
  errorurl?: string
}

