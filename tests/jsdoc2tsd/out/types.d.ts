/**
 * @typedef {Object} TranslationEntry
 * @property {string} key
 * @property {string} value
 */
declare type TranslationEntry = {
    key: string;
    value: string;
};

/**
 * @typedef {Object} Session
 * @property {SessionCurrency} currency
 * @property {SessionLanguage} language
 * @property {SessionTouchpoints} touchpoints
 * @property {String} priceLevel
 */
declare type Session = {
    currency: SessionCurrency;
    language: SessionLanguage;
    touchpoints: SessionTouchpoints;
    priceLevel: string;
};

/**
 * @typedef  {Object} SessionCurrency
 * @property {String} internalid
 * @property {String} symbol
 * @property {String} code
 * @property {String} name
 * @property {String} currencyname
 * @property {String} isdefault
 * @property {Number} symbolplacement
 */
declare type SessionCurrency = {
    internalid: string;
    symbol: string;
    code: string;
    name: string;
    currencyname: string;
    isdefault: string;
    symbolplacement: number;
};

/**
 * @typedef  {Object} SessionLanguage
 * @property {String} name
 * @property {String} isdefault
 * @property {String} locale
 * @property {String} languagename
 */
declare type SessionLanguage = {
    name: string;
    isdefault: string;
    locale: string;
    languagename: string;
};

/**
 * @typedef  {Object} SessionTouchpoints
 * @property {String} logout
 * @property {String} customercenter
 * @property {String} serversync
 * @property {String} viewcart
 * @property {String} login
 * @property {String} welcome
 * @property {String} checkout
 * @property {String} continueshopping
 * @property {String} home
 * @property {String} register
 * @property {String} storelocator
 */
declare type SessionTouchpoints = {
    logout: string;
    customercenter: string;
    serversync: string;
    viewcart: string;
    login: string;
    welcome: string;
    checkout: string;
    continueshopping: string;
    home: string;
    register: string;
    storelocator: string;
};

