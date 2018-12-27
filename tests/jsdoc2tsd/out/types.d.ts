/**
 * This is the representation of Promotion objects for methods liks {@link addPromotion}, {@link getPromotions} etc
 */
declare type Promotion = {
    internalid?: string;
    type: string;
    name: string;
    rate: string;
    code: string;
    errormsg: string;
    isvalid: boolean;
};

/**
 * Data type for adding new lines to the cart
 */
declare type AddLine = {
    line: Line;
};

/**
 * Data type for adding new lines to the cart
 */
declare type AddLines = {
    lines: Line[];
};

/**
 * This is the representation of the cart's line objects with you call {@link addLine}, {@link getLine}, etc
 *
 *
 *
 *
 */
declare type Line = {
    internalid?: string;
    quantity?: number;
    amount?: number;
    rate?: number;
    tax_amount?: number;
    tax_code?: string;
    itemtype?: string;
    item?: {
        internalid: number;
        itemid?: string;
        displayname?: string;
        isinactive?: boolean;
        itemtype?: string;
        minimumquantity?: number;
    };
    options?: LineOption[];
    extras?: {
        shipaddress?: string;
        shipmethod?: string;
        tax_rate?: number;
        rate_formatted?: string;
        discount?: number;
        total?: number;
        amount_formatted?: string;
        tax_amount_formatted?: string;
        discount_formatted?: string;
        total_formatted?: string;
        description?: string;
        giftcertfrom?: string;
        giftcertmessage?: string;
        giftcertnumber?: number;
        giftcertrecipientemail?: string;
        giftcertrecipientname?: string;
        taxrate1?: string;
        taxrate2?: string;
        grossamt?: string;
        tax1amt?: string;
        custreferralcode?: string;
        excludefromraterequest?: boolean;
        custcol_ns_pos_voidqty?: string;
        voidPercentage?: number;
        returnedQuantity?: number;
        isUnvalidatedReturn?: boolean;
        order?: boolean;
        note?: string;
    };
};

/**
 * This is the representation of the line's option in the  {@link Line} type
 */
declare type LineOption = {
    cartOptionId: string;
    value: any;
};

/**
 * This is the representation of the cart's summary returned by  {@link getSummary},  etc


 */
declare type Summary = {
    total?: number;
    taxtotal?: number;
    tax2total?: number;
    discounttotal?: number;
    subtotal?: number;
    shippingcost?: number;
    handlingcost?: number;
    giftcertapplied?: number;
    discounttotal_formatted?: string;
    taxonshipping_formatted?: string;
    taxondiscount_formatted?: string;
    itemcount?: number;
    taxonhandling_formatted?: string;
    discountedsubtotal?: number;
    discountedsubtotal_formatted?: string;
    taxondiscount?: number;
    handlingcost_formatted?: string;
    taxonshipping?: number;
    taxtotal_formatted?: string;
    totalcombinedtaxes_formatted?: string;
    totalcombinedtaxes?: number;
    giftcertapplied_formatted?: string;
    shippingcost_formatted?: string;
    discountrate?: number;
    taxonhandling?: number;
    tax2total_formatted?: string;
    discountrate_formatted?: string;
    estimatedshipping?: number;
    estimatedshipping_formatted?: string;
    total_formatted?: string;
    subtotal_formatted?: string;
    shippingtax1rate: string;
    shippingcostoverridden: boolean;
    amountdue: number;
    tranid: string;
    createddate: Date;
    couponcode: string;
    createdfrom: Date;
    changedue: number;
};

/**
 * in SCA the object returned by getShoppingSession().getOrder().submit()
 */
declare type ConfirmationSubmit = any;

/**
 * This is the representation an address
 */
declare type Address = {
    internalid: string;
    zip: string;
    country: string;
    addr1: string;
    addr2: string;
    addr3: string;
    city: string;
    company: string;
    defaultbilling: boolean;
    defaultshipping: boolean;
    fullname: string;
    isresidential: boolean;
    isvalid: boolean;
    phone: string;
    state: string;
};

/**
 * This is the representation of a shipping method
 */
declare type ShipMethod = {
    internalid: string;
    name: string;
    rate: number;
    rate_formatted: string;
    shipcarrier: string;
};

/**
 * This is the representation of a shipping method



 */
declare type PaymentMethod = {
    internalid: string;
    type: string;
    creditcard: {
        ccnumber: string;
        ccname: string;
        ccexpiredate: string;
        expmonth: string;
        expyear: string;
        ccsecuritycode: string;
    };
    key: string;
    thankyouurl: string;
    errorurl: string;
};

