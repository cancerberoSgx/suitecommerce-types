
declare type ItemInfo = {
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



declare type MatrixOptionSelection = {
    custom_item_option: string;
    custom_item_option_value: string | number;
};







declare type MatrixChild_ItemInfo = {
    internalid: string;
    custom_item_option?: string;
    isbackorderable: boolean;
    isinstock: boolean;
    ispurchasable: boolean;
    isstorepickupallowed: boolean;
    itemid: string;
    itemtype: string;
    itemtype: string;
    options: Array;
    outofstockbehavior: string;
    outofstockmessage: string;
    quantityavailable: number;
    quantityavailableforstorepickup_detail: Location;
    showoutofstockmessage: boolean;
    stockdescription: string;
    keyMapping_attributesRating: any;
    keyMapping_attributesToRateOn: array;
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



declare type Breadcrumb = {
    href: string;
    text: string;
};



declare type Image = {
    altimagetext: string;
    url: string;
};



declare type StorePickUpDetail = {
    internalid: number;
    qtyavailableforstorepickup: number;
};



declare type ItemStockInfo = {
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

