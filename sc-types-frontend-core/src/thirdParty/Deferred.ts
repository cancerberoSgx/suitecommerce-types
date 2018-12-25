import { Fn } from "..";

/**
 * Deferred object. In SCA the implementation of deferred object is actually 
 * [```jQuery.Deferred```](https://api.jquery.com/category/deferred-object/).
 * *Heads up!* For simplifying, this jsdoc unify both the jQuery.Deferred and the Promise Object into one. Go to 
 * the [API documentation](https://api.jquery.com/category/deferred-object/) for the real thing. 
 * 
 * Extension implementers can safely require jQuery by the AMD name ```jQuery``` and instantiate Deferred like this:
 * 
 * @example <caption>Extension implementers can safely require jquery by the AMD name "jQuery" and instantiate 
 * Deferred like this:</caption>
 * 
 * define('MyExtension', ['jQuery'], function(jQuery) {
 *   var promise = jQuery.Deferred();
 * })
 * 
 */
export interface Deferred<ResolvedType=any> extends JQueryDeferred<ResolvedType> {

	// /**
	//  * Reject a Deferred object and call any failCallbacks with the given args.
	//  * @param {Object} args Optional arguments that are passed to the failCallbacks.
	//  * @return {Deferred}
	//  */
	// reject(val:any):this

	// /**
	//  * Return a Deferred Promise object.
	//  * @return {Deferred}
	//  */
	// promise() :this

	// /**
	//  * Call the progressCallbacks on a Deferred object with the given args.
	//  * @param {Object}  args Optional arguments that are passed to the progressCallbacks.
	//  * @return {Deferred}
	//  */
	// notify(...args:any[]):this

	// /**
	//  * Add handlers to be called when the Deferred object is rejected.
	//  * The deferred.fail() method accepts one or more arguments, all of which can be either a single function
	//  *  or an array of functions. When the Deferred is rejected, the failCallbacks are called.
	//  * @param {Function|Array<Function>}failCallbacks
	//  * @return {Deferred}
	//  */
	// fail(failCallbacks:Fn|Fn[]):this


	// /**
	//  * Determine the current state of a Deferred object.
	//  * @returns {string} 'pending'|'resolved'|'rejected'
	//  *
	//  */
	// state(): 'pending'|'resolved'|'rejected'

	// /**
	//  * Add handlers to be called when the Deferred object is resolved.
	//  * The deferred.done() method accepts one or more arguments, all of which can be either a single function or an
	//  * array of functions. When the Deferred is resolved, the doneCallbacks are called.
	//  * Callbacks are executed in the order they were added.
	//  * @param {Function|Function[]} doneCallbacks
	//  * @return {Deferred}
	//  */
	// done(doneCallbacks:Fn|Fn[]):this

	// /**
	//  * Add handlers to be called when the Deferred object generates progress notifications.
	//  * @param {Function|Function[]}  progressCallbacks
	//  *   A function, or array of functions, to be called when the Deferred.notify() is called.
	//  * @return {Deferred}
	//  */
	// progress(progressCallbacks:Fn|Fn[]) :this

	// /**
	//  * Add handlers to be called when the Deferred object is either resolved or rejected.
	//  * The deferred.always() method receives the arguments that were used to .resolve() or .reject() the Deferred object,
	//  *  which are often very different.
	//  * @param {Function|Function[]} alwaysCallbacks
	//  *   A function, or array of functions, that is called when the Deferred is resolved or rejected.
	//  * @return {Deferred}
	//  */
	// always(alwaysCallbacks:Fn|Fn[]):this

	// /**
	//  * @param {Function} doneFilter A function that is called when the Deferred is resolved.
	//  * @param {Function=} [failFilter]  An optional function that is called when the Deferred is rejected.
	//  * @param {Function=} [progressFilter] An optional function that is called when progress notifications are sent.
	//  */
	// then(doneFilter:Fn, failFilter?:Fn, progressFilter?: Fn) :this

	// /**
	//  * Resolve a Deferred object and call any doneCallbacks with the given args.

	//  */
	// resolve(vql:ResolvedType):this
}