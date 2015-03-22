# mongoose-request-context

A simple mongoose plugin for automaticaly saving context related information in a document. For instance you would like to
save the name of the logged in user when changes are made to documents or log request specific data in a document.
This plugin uses the [request-context](https://www.npmjs.com/package/request-context) module for accessing the domain data.

## Usage

Set a context in any middleware:
```js
var contextService = require('request-context');

// wrap requests in the 'request' namespace
app.use(contextService.middleware('request'));

// set some object from the request object on the context
// to automatically save it when a document changes
app.use(function (req, res, next) {
	contextService.setContext('request:userInfo', req.user);
	next();
});
```

Add the context plugin and provide the path to save in the models schema definition. The provided property
will be set in a pre save hook:
```js
var contextPlugin = require('mongoose-request-context');

var Game = new Schema({ ... });

Game.plugin(contextPlugin, {

	// the path will access the userInfo.name property from the
	// user object set by the middleware
	contextPath: 'request:userInfo.name',

	// the user name will automatically be saved as 'modifiedBy'
	propertyName: 'modifiedBy',

	// String is the default shema type, you might want to save
	// an Objectid, an Object or something else 
	contextObjectType: String
});
```

## Plugin Options

- `contextPath` - A context path that will be read from the active context, see [request-context](https://www.npmjs.com/package/request-context)
on how accessing a property by path.

- `[propertyName]` - optional - Name of the property to store the context in (defaults to `context`)

- `[contextObjectType]` - optional - Type of the document property to store the context in (defaults to String),
can be any available [mongoose SchemaType](http://mongoosejs.com/docs/schematypes.html)
