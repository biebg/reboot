Reboot
============

##How to use it

`npm install forever-reboot`

then


```
var reboot = require('forever-reboot');
reboot.config(options);
```

###Reboot.config(Configuration);
Configuration`Object`:

* __main__:(required) `String` the path when you use forever to start , example: `forever start example/index.js` the 'main' should be `example/index.js`
* __branch__:(options)`String` project branch ,default: `master`.
* __method__:(options)`String` project start method, default: `forever`
* __dir__: (options)`String` project git root directory, default: `./`(advice you to set it with an absolute path)