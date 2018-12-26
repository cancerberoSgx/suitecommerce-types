import { Deferred, VisualComponent } from "../..";

/**
 * The ProductDetails component let's the user interact with most important aspect of the Product Details Page, like setting options, changing quantity, and obtain item's related information. An instance of this component can obtained by calling `container.getComponent("PDP")`
 */
export interface ProductDetailsComponent extends VisualComponent {
      /**
     * Name of the PDP main full view. Please use this name to reference views in methods like {@link addChildViews}, {@link addToViewContextDefinition}, etc
     */
    PDP_FULL_VIEW :'ProductDetails.Full.View'

    
    /**
     * Name of the PDP quick-view. Please use this name to reference views in methods like {@link addChildViews}, {@link addToViewContextDefinition}, etc
     */
    PDP_QUICK_VIEW :'ProductDetails.QuickView.View'
  

  /**
   * Sets an option of the current PDP. It will only work if the current view is a Product Details Page
   * @param {String} cart_option_id Identifier of the option
   * @param {String} value Optional value. In case of invalid or not specified value the option selected will be cleaned
   * @return {Deferred<Boolean>} Returns a Deferred that is resolved with true or false accordingly if the action was successful or not
   * @fires ProductDetailsComponent#afterOptionSelection
   * @fires ProductDetailsComponent#beforeOptionSelection
   */
  setOption (cart_option_id:string, value:string) :Deferred<boolean>

  /**
   * Set the quantity of the current PDP. If the current View is a PDP
   * @param {Number} quantity
   * @return {Deferred} Returns a Deferred that is resolved with true or false accordingly if the action was successful or not
   * @fires ProductDetailsComponent#beforeQuantityChange
   * @fires ProductDetailsComponent#afterQuantityChange
   */
  setQuantity (quantity:number):Deferred<boolean>

  /**
   * If the current View is a PDP it will return a representation of the transaction line represented in the current pdp, null otherwise. Notice that there could be some dynamic - user - configured extra fields.
   * @return {ItemInfo}
   */
  getItemInfo ():ItemInfo 

  /**
   * Filters all the child items that apply for the passed in matrix_options or the current item selection.
   * If no matrix_options is sent, and there is no options selected, it will return all the matrix child items.
   * If matrix_options is null or undefined, it will return the matrhix childs for the current selection.
   * @param {MatrixOptionSelection} matrix_options Options to filter matrix child items
   * @return {MatrixChildItemInfo[]} All the children of a matrix that complies with the current or passed in selection
   */
  getSelectedMatrixChilds (matrix_options:MatrixOptionSelection): MatrixChildItemInfo[]

  /**
   * Returns all the matrix child of the matrix item
   * @return {MatrixChildItemInfo[]} All the children of a matrix item
   */
  getAllMatrixChilds (): MatrixChildItemInfo[]

  /**
   * Returns the information available about the stock of the item.
   * If it is an Inventory Item will return the stock quantity available.
   * Depending on the current matrix options selection, it returns the sum of the stock available of all the matrix item childs.
   */
  getStockInfo ():ItemStockInfo


  // TODO: create types for each callback and document them using the events jsdoc below

  on(name:'beforeOptionSelection', callback:(optionCartId:string,value:string)=>Deferred|void):void
  on(name:'afterOptionSelection', callback:(optionCartId:string,value:string)=>Deferred|void):void

  cancelableOn(name:'beforeOptionSelection', callback:(optionCartId:string,value:string)=>Deferred|void):void
  cancelableOn(name:'afterOptionSelection', callback:(optionCartId:string,value:string)=>Deferred|void):void

  cancelableTrigger(name:'beforeOptionSelection', optionCartId:string,value:string):Deferred
  cancelableTrigger(name:'afterOptionSelection', optionCartId:string,value:string):Deferred



  on(name:'beforeQuantityChange', callback:(q:number)=>Deferred|void):void
  on(name:'afterQuantityChange', callback:(currentIndex:number)=>void):void

  cancelableOn(name:'beforeQuantityChange', callback:(q:number)=>Deferred|void):void
  cancelableOn(name:'afterQuantityChange', callback:(currentIndex:number)=>void):void

  cancelableTrigger(name:'beforeQuantityChange', q:number):Deferred
  cancelableTrigger(name:'afterQuantityChange', currentIndex:number):Deferred



  on(name:'beforeImageChange', callback:(currentIndex:number,nextIndex:number)=>Deferred|void):void
  on(name:'afterImageChange', callback:(currentIndex:number)=>void):void

  cancelableOn(name:'beforeImageChange', callback:(currentIndex:number,nextIndex:number)=>Deferred|void):void
  cancelableOn(name:'afterImageChange', callback:(currentIndex:number)=>void):void

  cancelableTrigger(name:'beforeImageChange', currentIndex:number,nextIndex:number):Deferred
  cancelableTrigger(name:'afterImageChange', currentIndex:number):Deferred


}

/**
 * Cancelable event triggered before an option is selected. See {@link CancelableEvents}
 * @event ProductDetailsComponent#beforeOptionSelection
 * @property {String} optionCartId The selected option id
 * @property {String} value The selected option value
 */

/**
 * Triggered after an option is selected.
 * @event ProductDetailsComponent#afterOptionSelection
 * @property {String} optionCartId The selected option id
 * @property {String} value the selected option value
 */

/**
 * Cancelable event triggered before the quantity is changed. See {@link CancelableEvents}
 * @event ProductDetailsComponent#beforeQuantityChange
 * @type {number}
 */

/**
 * Triggered after the quantity is changed.
 * @event ProductDetailsComponent#afterQuantityChange
 * @type {number}
 */

/**
 * Cancelable event triggered before the main image displayed in the Details page changes. See {@link CancelableEvents}
 * @event ProductDetailsComponent#beforeImageChange
 * @property {number} currentIndex
 * @property {number} nextIndex
 */

/**
 * Triggered after the main image displayed in the Details page changes.
 * @event ProductDetailsComponent#afterImageChange
 * @type {undefined}
 */

// Data types:


type ItemInfo = {
  internalid: string;
  quantity?: number;
  options?: any[];
  splitquantity?: number;
  shipaddress?: number;
  shipmethod?: number;
  location?: number;
  fulfillmentChoice?: string;
  item?: {
      internalid?: string;
      type?: string;
      onlinecustomerprice_detail?: string;
  };
};



type MatrixOptionSelection = {
  custom_item_option: string;
  custom_item_option_value: string | number;
};







type MatrixChildItemInfo = {
  internalid: string;
  custom_item_option?: string;
  isbackorderable: boolean;
  isinstock: boolean;
  ispurchasable: boolean;
  isstorepickupallowed: boolean;
  itemid: string;
  itemtype: string;
  options: any[];
  outofstockbehavior: string;
  outofstockmessage: string;
  quantityavailable: number;
  quantityavailableforstorepickup_detail: Location;
  showoutofstockmessage: boolean;
  stockdescription: string;
  keyMapping_attributesRating: any;
  keyMapping_attributesToRateOn: any[];
  keyMapping_breadcrumb?: Breadcrumb;
  keyMapping_comparePriceAgainst: number;
  keyMapping_comparePriceAgainstFormated: string;
  keyMapping_correlatedItemsDetail: string;
  keyMapping_id: string;
  keyMapping_images?: Image;
  keyMapping_inStockMessage: string;
  keyMapping_isBackorderable: string;
  keyMapping_isInStock: string;
  keyMapping_isPurchasable: string;
  keyMapping_isReturnable: boolean;
  keyMapping_isfulfillable: boolean;
  keyMapping_isstorepickupallowed: boolean;
  keyMapping_itemType: string;
  keyMapping_keywords: string;
  keyMapping_matrixChilds: string;
  keyMapping_matrixParent: string;
  keyMapping_metaTags: string;
  keyMapping_minimumQuantity: number;
  keyMapping_name: string;
  keyMapping_optionsDetails: string;
  keyMapping_outOfStockMessage: string;
  keyMapping_pageHeader?: string;
  keyMapping_pageTitle?: string;
  keyMapping_price: number;
  keyMapping_priceDetails: string;
  keyMapping_price_formatted: string;
  keyMapping_quantityavailableforstorepickup_detail?: StorePickUpDetail;
  keyMapping_rating: number;
  keyMapping_ratingsCount: number;
  keyMapping_ratingsCountsByRate: any;
  keyMapping_relatedItems: string;
  keyMapping_relatedItemsDetail: string;
  keyMapping_showInStockMessage: boolean;
  keyMapping_showOutOfStockMessage: string;
  keyMapping_showQuantityAvailable: boolean;
  keyMapping_showStockDescription: boolean;
  keyMapping_sku: string;
  keyMapping_stock: string;
  keyMapping_stockDescription: string;
  keyMapping_stockDescriptionClass: string;
  keyMapping_thumbnail: {
      url?: string;
      altimagetext?: string;
  };
  keyMapping_url: string;
  onlinecustomerprice_detail: {
      onlinecustomerprice_formatted?: string;
      onlinecustomerprice?: number;
  };
};



type Breadcrumb = {
  href: string;
  text: string;
};



type Image = {
  altimagetext: string;
  url: string;
};



type StorePickUpDetail = {
  internalid: number;
  qtyavailableforstorepickup: number;
};



type ItemStockInfo = {
  stock: number;
  inStockMessage: string;
  isAvailableForPickup: boolean;
  isInStock: boolean;
  isNotAvailableInStore: boolean;
  outOfStockMessage: string;
  showInStockMessage: boolean;
  showQuantityAvailable: boolean;
  showStockDescription: boolean;
  stockDescription: string;
  stockDescriptionClass: string;
  stockPerLocation?: StorePickUpDetail;
};

