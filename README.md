#mongoose-request-context

A simple mongoose plugin for automaticaly saving context related information in a document. For instance you would like to
save the name of the logged in user when changes are made to documents.
This plugin uses the [request-context](https://www.npmjs.com/package/request-context) module for accessing the domain data.

##Usage

Set a context in any middleware:
```js
var contextService = require('request-context');

// wrap requests in the 'ns' namespace
app.use(contextService.middleware('ns'));

// set some user data from the request
app.use(function (req, res, next) {
	contextService.setContext('ns:user', req.user);
	next();
});
```

Add the context plugin and provide the path to save in the models schema definition. The provided property
will be set in a pre save hook.
```js
var contextPlugin = require('mongoose-request-context');

var Game = new Schema({ ... });

Game.plugin(contextPlugin, {
	// the path will access the user.name property from the 'ns' namespace
	contextPath: 'ns:user.name',
	// the user name will be saved as 'modifiedBy'
	propertyName: 'modifiedBy'
});
```

##Options

- `contextPath` - A context path that will be read from the active context

- `[propertyName]` - optional - Name of the property to store the context in (defaults to `context`)

- `[contextObjectType]` - optional - Type of the document property to store the context in (defaults to String)
