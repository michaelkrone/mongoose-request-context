/**
 * Module defining a mongoose plugin for adding request context information to a model
 * @module {Object} userInfo
 * @requires {lodash}
 */
'use strict';

var _ = require('lodash');
var documentContext = require('request-context');

/**
 * The default options object
 * @type {{contextPath: undefined, contextObjectType: Function, propertyName: string}}
 */
var defaultOptions = {

	/**
	 * The path of the context to use for retrieving user information
	 * @type {String}
	 * @default undefined
	 */
	contextPath: undefined,

	/**
	 * The type of the user information to set
	 * @type {Object}
	 * @default String
	 */
	contextObjectType: String,

	/**
	 * The name of the property to set
	 * @type {String}
	 * @default 'editedBy'
	 */
	propertyName: 'context'
};

/**
 * The plugin function
 * @type {Function}
 * @param {MongooseSchema} schema - The MongooseSchema this plugin should be attached to
 * @param {Object} options - The options object that should be applied as the plugin options
 */
module.exports = exports = function saveContextPlugin(schema, options) {
	options = _.defaults(options || {}, defaultOptions);

	var definitionObject = {};
	definitionObject[options.propertyName] =  options.contextObjectType;
	schema.add(definitionObject);

	schema.pre('save', preSave);

	function preSave(next) {
		// jshint validthis: true
		var cntxt = documentContext.getContext(options.contextPath);

		if (cntxt) {
			this[options.propertyName] = cntxt;
		}

		return next();
	}
};
