#mongoose-request-context

A simple mongoose plugin for automaticaly saving request context information in a document.

##Usage

```js
var contextPlugin = require('./mongoose-request-context');
var Game = new Schema({ ... });
Game.plugin(contextPlugin, { 
	contextPath: 'request:user.name',
	propertyName: 'userName'
});
```

##Options
-`contextPath` - A context path that will be read from the active context

-`[propertyName]` - optional - Name of the property to store the context in (defaults to `context`)

-`[contextObjectType]` - optional - Type of the document property to store the context in (defaults to String)
