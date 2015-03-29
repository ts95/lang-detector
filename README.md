lang-detector
=====
A fast and small library for detecting the programming language of a code snippet. Can also be used on very large strings of code spanning multiple thousand lines.

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
<br>
**Disclaimer:** The accuracy of this library is disputable.