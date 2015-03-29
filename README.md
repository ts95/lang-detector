lang-detector
=====
A fast and small library for detecting the programming language of a code snippet. Can also be used on moderately large strings of code spanning a few thousand lines.

This library should only be used if you don't have anything else to go by to determine the language of the code, like a file extension.

## Install:
```Shell
npm install lang-detector
```

## Currently supported languages:
* JavaScript
* C
* Python
* Java

## Usage:
```JavaScript
var detectLang = require('lang-detector');

detectLang('var javascript = true;') // => 'JavaScript'

detectLang('ooga booga', true) /* =>  { 'JavaScript' : 0,
                                        'C'          : 0,
                                        'Python'     : 0,
                                         ...
                                        'Unknown'    : 1 }  */

```

## Unit tests
Run `npm test` in the root of the directory to run the tests.