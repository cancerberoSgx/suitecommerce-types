/**
 * A collection of miscellaneous utility methods that goes from object manipulation, text formatting, data validation, environment information, internationalization, URL manipulation, etc. You can require the module by the `Utils`, example:
 *
 * ```
 * define('MyCustomModule', ['Utils'], function (Utils)
 * {
 *     var translated = Utils.translate('There are $(0) apples in the tree', 55);
 * });
 * ```
 *
 * Also, all methods in Utils are mixed in underscore, so for example, you is the same to call `Utils.translate()` and `_.translate()`
 */
export class Utils {

  //FORMATTING

  /**
   * Will try to reformat a phone number for a given phone Format. If no format is given, it will try to use the one in site settings.
   */
  formatPhone(phone: string, format: string): string {
    throw new Error("Method not implemented.");
  }

  /**
   * Converts a date object to string using international format YYYY-MM-dd. Useful for inputs of type="date"
   * @param {Date} date
   * @return {String}
   */
  dateToString(date: Date): string {
    throw new Error("Method not implemented.");
  }

  /**
   * Parse a string date into a date object.
   * @param {String} str_date
   * @param {{format:String,plusMonth:Number}} options `format` is the String format that specify the format of the input string. By Default YYYY-MM-dd. `plusMonth`: Number that indicate how many month offset should be applied whne creating the date object.
   */
  stringToDate(str_date: string, options: {format:String,plusMonth:Number}) : Date{
    throw new Error("Method not implemented.");
  }

  /**
   * Formats given number and symbol to a currency like string. Example: `Utils.formatCurrency(10, '£')`
   */
  formatCurrency(value: string, symbol: string) : string{
    throw new Error("Method not implemented.");
  }
  
  /**
   * Formats with commas as thousand separator (e.g. for displaying quantities)
   *
   * @return the formatted quantity.
   */
  formatQuantity(number: string): string {
    throw new Error("Method not implemented.");
  }




  // VALIDATION

  /**
   * @return a non empty string with a internationalized warning message
   */
  validateSecurityCode(value: string): string {
    throw new Error("Method not implemented.");
  }
  /**
   * @return an error message if the passed phone is invalid or falsy if it is valid
   */
  validatePhone(phone: string): string {
    throw new Error("Method not implemented.");
  }
  /**
   * @return an error message if the passed state is invalid or falsy if it is valid
   */
  validateState(value: string, valName: string, options: {country: string}): string {
    throw new Error("Method not implemented.");
  }
  /**
   * @return an error message if the passed zip code is invalid or falsy if it is valid function
   */
  validateZipCode(value: string, valName: string, options: {country: string}): string {
    throw new Error("Method not implemented.");
  }


  /**
   * Used on all of the hardcoded texts in the templates. Gets the translated value from SC.Translations object literal.
   * Please always use the syntax `_('string').translate(1, 2)` instead of the syntax `_.translate('string', 1, 2)` if possible.
   *
   * Example using the Utils object: `Utils.translate('There are $(0) apples in the tree', appleCount)`
   *
   * Sample example using the `_.translate` (underscore mixing): `_('There are $(0) apples in the tree').translate(appleCount)`
   *
   * See {@tutorial frontend_internationalization}
   */
  translate(text: string): string {
    throw new Error("Method not implemented.");
  }



  // OBJECT HELPERS
  /**
   * Deep Copy of the object taking care of Backbone models
   */
  deepCopy(obj: any): any {
    throw new Error("Method not implemented.");
  }
  /**
   * Gets given object property supporting deep property references by separating names with dots ('.')
   * @param {any} object The object to get the property from
   * @param {String} path  a path with values separated by dots
   * @param {any} [default_value] value to return if nothing is found.
   */
  getPathFromObject(object: {[k: string]: any}, path: string, default_value: any) {
    throw new Error("Method not implemented.");
  }
  /**
   * Sets given object property supporting deep property references by separating names with dots ('.')
   * @param {any} object the object to modify
   * @param {String} path a path with values separated by dots
   * @param {any} value the value to set
   */
  setPathFromObject(object: {[k: string]: any}, path: string, value: any) {
    throw new Error("Method not implemented.");
  }



  /**
   * Determines if we are in shopping domain (secure or non secure) or single domain
   * @return true if in checkout or in single domain function
   */
  isShoppingDomain(): boolean{
    throw new Error("Method not implemented.");
  }
  /**
   * Determines if we are in a secure checkout
   * domain or in a secure single domain environment
   * @return true if in checkout or in single domain
   */
  isCheckoutDomain(): boolean {
    throw new Error("Method not implemented.");
  }
  /**
   * Determines if we are in a single domain environment
   * @return true if single domain
   */
  isSingleDomain(): boolean {
    throw new Error("Method not implemented.");
  }
  /**
   * Determines if we are in shopping ssp used when there are frontend features only shown in the shopping domain
   * @return true if in shopping domain, false if in checkout or myaccount
   */
  isInShopping(): boolean {
    throw new Error("Method not implemented.");
  }
  /**
   * Determines if we are in checkout or my account ssp
   * @return true if in checkout domain
   */
  isInCheckout(): boolean {
    throw new Error("Method not implemented.");
  }

  /**
   * returns the absolute URL of given relative path
   */
  getAbsoluteUrl(path: string): string {
    throw new Error("Method not implemented.");
  }
}