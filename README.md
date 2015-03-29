lang-detector
=====
A fast and small library for detecting the programming language of a code snippet. Can also be used on very large strings of code spanning multiple thousand lines.

## Currently supported languages:
* JavaScript
* C
* Python

## Install:
```Shell
npm install lang-detector
```

## Usage:
```JavaScript
var detectLang = require('lang-detector');

detectLang('var javascript = true;') // => 'JavaScript'

detectLang('ooga booga', true) /* =>  { 'JavaScript': 0,
                                        'C':        : 0,
                                        'Python':   : 0,
                                         ...
                                        'Unknown':  : 1 }  */

```

**Disclaimer:** The accuracy of this library is disputable.