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

detectLang('var javascript = true;')
	// =>     { language: 'JavaScript', points: 1 }

detectLang('ooga booga', true)
	/* =>   [ { language: 'JavaScript', points: 0 },
			  { language: 'C',          points: 0 },
			  { language: 'Unknown',    points: 1 } ]   */

```

Disclaimer: The accuracy of this library is disputable.<br>
Disclaimer #2: This project is <b>far</b> from finished. Support for more languages and better accuracy will come with time.