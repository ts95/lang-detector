lang-detector
=====
A library for detecting the programming language of a code snippet.

Currently supported languages:
* JavaScript
* C

Install:
```
npm install lang-detector
```

Usage:
```JavaScript
var detectLang = require('lang-detector');

detectLang('var javascript = true;') // => { language: 'JavaScript', points: 1 }
detectLang('ooga booga')             // => { language: 'Unknown',    points: 0 }

detectLang('console.log("Hello world");', true)
	/* =>	[ { JavaScript: { language: 'JavaScript', points: 2 },
  				Unknown:    { language: 'Unknown',    points: 0 } } ] */
```

Disclaimer: The accuracy of this library is disputable.<br>
Disclaimer #2: This project is <b>far</b> from finished. Support for more languages and better accuracy will come with time.