// import { _, BindingValue, BackboneViewWithBindings } from 'sc-types-frontend'

// export default {

//   // override render() to add support to double binding using Backbone.stickit:
//   bindViewToStickit: function () {

//     debugger
//     console.log('bindViewToStickit');
    
//     var view = this as BackboneViewWithBindings

//     // Backbone.Validation.bind(view, {
//     // 	model: view.validationModel
//     // ,	forceUpdate: true
//     // });

//     debugger
//     view.stickit(view.validationModel, view.bindings);
//   }

//   , formatBindings: function (view: BackboneViewWithBindings) {

//     // we want to automatically add default desired configuration to stickit bindings without deleting stickit passed config.
//     // The default action is 'blur' and model modifications will be silent - this can be customized for particular inputs
//     _.each(view.bindings, function (binding: BindingValue, name: string) {
//       if (_.isString(binding)) {
//         view.bindings[name] = {
//           observe: binding
//           , setOptions: {
//             validate: true
//             , silent: true
//           }
//           , events: ['blur']
//         };
//       }
//       else if (!binding.setOptions || typeof (binding.setOptions.validate) === 'undefined') {
//         binding.setOptions = binding.setOptions || {};
//         binding.setOptions.validate = true;
//         binding.setOptions.silent = true;
//       }
//     });

//   }

//   // @method add makes the passed view a Form View. Views that want to be form views should call this method at initialize @static
//   // @param {Backbone.View} view the view instance we want to transform in a FormView.
//   , add: function (view: BackboneViewWithBindings, options) {
//     options = options || {};

//     debugger

//     this.formatBindings(view);

//     view.validationModel = options.noCloneModel ? view.model : view.model.clone();
//     !options.noCloneModel && view.model.on('change', this.synchronizeModels, view);
//     view.on(view.childViews ? 'afterCompositeViewRender' : 'afterViewRender', this.bindViewToStickit);

//     var self = this;
//     // overrides destroy() so we unstickit (remove bindings event listeners)
//     //@ts-ignore
//     view.destroy = _.wrap(view.destroy, function (fn) {
//       this.unstickit();
//       view.model.off('change', self.synchronizeModels);

//       return fn.apply(this, Array.prototype.slice.call(arguments));
//     });


//     // view.model.bind('validated', function (isValid)
//     // {
//     // 	//user clicked on submit AND there are validation errors -> focus on first error.
//     // 	if (view.isSavingForm && isValid === false)
//     // 	{
//     // 		var $first_input_error = jQuery('body [data-validation-error]:first input');

//     // 		if ($first_input_error)
//     // 		{
//     // 			if (!jQuery('.global-views-message-error').length && $first_input_error.closest('[data-validation="control-group"]').length)
//     // 			{
//     // 				jQuery('body').animate({
//     // 					scrollTop: $first_input_error.closest('[data-validation="control-group"]').offset().top
//     // 				}, 600);
//     // 			}

//     // 			$first_input_error.focus();
//     // 		}
//     // 	}

//     // 	// //user clicked on submit AND form is OK -> show progress button.
//     // 	// if (view.isSavingForm && isValid === true)
//     // 	// {
//     // 	// 	buttonSubmitProgress(view.$savingForm);
//     // 	// }

//     // 	view.isSavingForm = false;
//     // });

//     // when we have two FormViews and we switch focus from one to another we want to erase the validation error messages from the first one:
//     // @ts-ignore
//     view.events = view.events || {};
//     // view.events['focusin *'] = 'formViewFocusHandler';

//     // var removeValidationErrors = function ($el)
//     // {
//     // 	$el.find('[data-validation-error="block"]').remove();
//     // 	$el.find('[data-validation-error]').removeAttr('data-validation-error');
//     // };

//     // // @method removeValidationErrors remove all visual validation errors of this form view if any
//     // view.removeValidationErrors = function ()
//     // {
//     // 	removeValidationErrors(this.$el);
//     // };

//     // view.formViewFocusHandler = function ()
//     // {
//     // 	if (!this.$el.hasClass('focused-form-view'))
//     // 	{
//     // 		removeValidationErrors(jQuery('.focused-form-view'));
//     // 		jQuery('.focused-form-view').removeClass('focused-form-view');
//     // 	}
//     // 	this.$el.addClass('focused-form-view');
//     // };

//     view.saveForm = this.saveForm;

//     return view.validationModel;
//   }

//   //@method synchronizeModels Auxiliary method used to keep sync all changes made on the view's model and the cloned model
//   //It is important to notice that this method is expected to run in the context of the view
//   //@param {Backbone.Model} view_model Original view's model
//   //@return {Void}
//   , synchronizeModels: function (view_model) {
//     if (!view_model) {
//       return;
//     }

//     var changed_attributes = view_model.changedAttributes()
//       , view = this;

//     _.each(changed_attributes, function (value, attribute) {
//       view.validationModel.set(attribute, value);
//     });
//   }
// }