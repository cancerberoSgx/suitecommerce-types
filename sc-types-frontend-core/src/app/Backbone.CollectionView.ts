import { BackboneView, Template, BackboneModel, TemplateContext, BackboneViewOptions, BackboneCollection } from "../thirdParty";

/**
 * A collection view is a concrete tool view for showing a collection of items all of the same type.
 * We just create a collection view instance and give it the collection of items (array or backbone collection)
 * and the view class used for rendering each item.
 * 
 * It support the high level concept of rows and cells to group / grid the items and let use custom 
 * templates for cells and rows.
*/
export class BackboneCollectionView<CustomContext extends TemplateContext = TemplateContext, Model extends BackboneModel = BackboneModel, Context extends (BackboneCollectionViewContext & CustomContext) = (BackboneCollectionViewContext & CustomContext)> extends BackboneView<Model, Context> {

  initialize(options?: BackboneCollectionViewOptions<Model, CustomContext>): void {
    throw new Error("Method not implemented.");
  }

  /** Generates the context used by the row template. This method is aimed to be overridden */
  generateRowContext() {
    throw new Error("Method not implemented.");
  }

  /** generates the context used by the cell template . can be overridden */
  generateCellContext(child_view_instance: BackboneView): (any & { spanSize: number }) {
    throw new Error("Method not implemented.");
  }

  calculateSpanSize(): number {
    throw new Error("Method not implemented.");
  }

  childCells: BackboneView[]
}

export interface BackboneCollectionViewContext<m extends BackboneModel=BackboneModel> extends TemplateContext {
  collection: BackboneCollection<m>
  showCells: boolean
}

export interface BackboneCollectionViewOptions<m extends BackboneModel=BackboneModel, CustomContext extends TemplateContext = TemplateContext> extends BackboneViewOptions<m> {

  /**The View class of this collection view children */
  childView: typeof BackboneView
  /**the options to be passed to children views */
  childViewOptions: any
  viewsPerRow: number
  /** Total number of rows used by the CSS framework */
  rowsCount: number
  /**Template used to override the default child view template */
  childTemplate: Template
  /**Template used to override the default cell template */
  cellTemplate: Template
  /**Template used to override the default row template */
  rowTemplate: Template
  /**Defines the data type values used to find the container element of the cells in a row . default: backbone.collection.view.cells*/
  cellsContainerId: string  
  /** allows the user to define a custom context.*/
  context: CustomContext
  /**Defines the data type values used to find the container elements of the child view in a cell. default: 'backbone.collection.view.cell'*/
  cellContainerId: string
  /**Defines the data type values used to find the container elements of the rows in a template. default:  'backbone.collection.view.rows'*/
  rowsContainerId: string
}

// 	,	initialize: function (options)
// 		{
// 			this.childView = options.childView || this.childView;
// 			this.childViewOptions = options.childViewOptions || this.childViewOptions;
// 			this.viewsPerRow = options.viewsPerRow ? options.viewsPerRow : this.viewsPerRow;
// 			if (this.viewsPerRow < 1)
// 			{
// 				this.viewsPerRow = Infinity;
// 			}

// 			this.context = options.context || {};
// 			this.collection = options.collection;
// 			this.childTemplate = options.childTemplate || this.childTemplate;
// 			this.cellTemplate = options.cellTemplate || this.cellTemplate;
// 			this.rowTemplate = options.rowTemplate || this.rowTemplate;
// 			this.cellsContainerId = options.cellsContainerId || this.cellsContainerId;
// 			this.cellContainerId = options.cellContainerId || this.cellContainerId;
// 			this.template = options.template || this.template;

// 			this.childCells = [];
// 		}

// 	,	createChildElement: function ()
// 		{
// 			var data = this.placeholderData || {}
// 			,	tag_name = data.childTagName || 'div'
// 			,	element = jQuery('<' + tag_name + '></' + tag_name + '>');

// 			if (data.childId)
// 			{
// 				element.attr('id', data.childId);
// 			}

// 			if (data.childClass)
// 			{
// 				element.addClass(data.childClass);
// 			}

// 			if (data.childDataAction)
// 			{
// 				element.attr('data-action', data.childDataAction);
// 			}

// 			if (data.childDataType)
// 			{
// 				element.attr('data-type', data.childDataType);
// 			}

// 			return element;

// 		}

// 		// @method generateRowContext Generates the context used by the row template. This method is aimed to be overrided @return {Backbone.CollectionView.RowContext}
// 	,	generateRowContext: function ()
// 		{
// 			//@class Backbone.CollectionView.RowContext
// 			return {};
// 		}

// 		// @method generateCellContext Generates the context used by the cell template @return {Backbone.CollectionView.CellContext}
// 	,	generateCellContext: function (child_view_instance)
// 		{
// 			var child_view_instance_context = child_view_instance.getTemplateContext ? child_view_instance.getTemplateContext() : child_view_instance.getContext ? child_view_instance.getContext() : {};

// 			//@class Backbone.CollectionView.CellContext
// 			return _.extend(
// 					child_view_instance_context
// 				,	{
// 						//@property {Number} spanSize
// 						spanSize: this.calculateSpanSize()
// 					}
// 				);
// 		}

// 	,	calculateSpanSize: function ()
// 		{
// 			return this.rowsCount / this.viewsPerRow;
// 		}

// 		// @method createCell Internal method for generate the render result of a child view wrapping it into a cell container.
// 	,	createCell: function (model, index)
// 		{
// 			var options = _.extend({}, this.childViewOptions, {model: model, index: index})
// 			,	child_view_instance = new (this.childView)(options);

// 			this.childCells.push(child_view_instance);

// 			if (!(child_view_instance.attributes && child_view_instance.attributes['data-root-component-id']))
// 			{
// 				child_view_instance.attributes = child_view_instance.attributes || {};
// 				child_view_instance.attributes['data-root-component-id'] = this.attributes && this.attributes['data-root-component-id'] || '';
// 			}

// 			child_view_instance.parentView = child_view_instance.parentView || this;
// 			child_view_instance.hasParent = true;

// 			child_view_instance.setElement(this.createChildElement());

// 			child_view_instance.render();

// 			if (child_view_instance.$el.children().length === 1)
// 			{
// 				child_view_instance.setElement(child_view_instance.$el.children()[0]);
// 			}

// 			if (this.cellTemplate)
// 			{
// 				var $cell = jQuery(this.cellTemplate(this.generateCellContext(child_view_instance)))
// 				,	$placeholder = $cell.find('[data-type="' + this.cellContainerId + '"]');

// 				if ($placeholder.length)
// 				{
// 					$placeholder.replaceWith(child_view_instance.$el);
// 				}
// 				else
// 				{
// 					$cell = jQuery('<div></div>');
// 					$cell.append(child_view_instance.$el);
// 				}

// 				return $cell;
// 			}
// 			else
// 			{
// 				return child_view_instance.$el;
// 			}

// 		}

// 		// @method appendCellsToRow Add an array of jQuery cells into an jQuery row @param {Array<jQuery>} cells
// 	,	appendCellsToRow: function (cells)
// 		{

// 			var $cells = jQuery(_(cells).map(function (element)
// 			{
// 				return element.get(0);
// 			}));

// 			if (this.rowTemplate)
// 			{
// 				var $row = jQuery(this.rowTemplate(this.generateRowContext()))
// 				,	$placeholder = $row.find('[data-type="' + this.cellsContainerId + '"]');

// 				if ($placeholder.length)
// 				{
// 					$placeholder.replaceWith($cells);
// 				}
// 				else
// 				{
// 					$row = jQuery('<div></div>');
// 					$row.append($cells);
// 				}

// 				return $row;
// 			}
// 			else
// 			{
// 				return $cells;
// 			}
// 		}

// 		// @method render Override default render to give support to iteration and multiple items per row
// 	,	render: function()
// 		{
// 			this.collection = this.collection instanceof Backbone.Collection ? this.collection : new Backbone.Collection(this.collection);

// 			//Empty the div before starting the render
// 			this.$el.empty();
// 			if (this.template)
// 			{
// 				this._render();
// 			}

// 			var self = this
// 			,	rows = []
// 			,	cells_in_row = [];

// 			if (self.childTemplate)
// 			{
// 				self.childView.prototype.template = self.childTemplate;
// 			}

// 			this.viewsPerRow = this.placeholderData && this.placeholderData.viewsPerRow || this.viewsPerRow;

// 			// @property {Array<Object>} collection this kind of view should be always have a collection property which is what is rendered.
// 			this.collection.each(function (model, index)
// 			{
// 				var cell = self.createCell(model, index);

// 				if (self.rowTemplate)
// 				{
// 					cells_in_row.push(cell);

// 					if (self.viewsPerRow === 1 || ((index + 1) % self.viewsPerRow === 0) || ((index + 1) === self.collection.length))
// 					{
// 						rows.push(self.appendCellsToRow(cells_in_row));
// 						cells_in_row = [];
// 					}
// 				}
// 				else
// 				{
// 					rows.push(cell);
// 				}
// 			});


// 			var $content = jQuery(_(rows).map(function (element)
// 			{
// 				return element.get(0);
// 			}));

// 			if (this.template)
// 			{
// 				this.$('[data-type="' + this.rowsContainerId + '"]').replaceWith($content);
// 			}
// 			else
// 			{
// 				this.$el.append($content);
// 			}

// 		}

// 	,	destroy: function()
// 		{
// 			_.each(this.childCells, function(child){
// 				child && child.destroy();
// 			});

// 			Backbone.View.prototype.destroy.apply(this, Array.prototype.slice.call(arguments));
// 		}

// 	,	getContext: function()
// 		{
// 			var context = {
// 				collection : this.collection
// 			,	showCells: !!this.collection.length
// 			};

// 			return _|tend(context, this.context);
// 		}
// 	});
// });
