lang-detector
=====
A library for detecting the programming language of a code snippet.

Currently supported languages:
* JavaScript
* C
* Python

Install:
```Shell
npm install lang-detector
```

Usage:
```JavaScript
var detectLang = require('lang-detector');

detectLang('var javascript = true;') // => 'JavaScript'

detectLang('ooga booga', true)
	/* =>   [ { language: 'JavaScript', points: 0   },
			  { language: 'C',          points: 0   },
			  { language: 'Python',     points: 0   },
			  { language: '...',        points: ... },
			  { language: 'Unknown',    points: 1   } ]   */

```

Disclaimer: The accuracy of this library is disputable.