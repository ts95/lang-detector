lang-detector
=====
A library for detecting the programming language of a code snippet.

Currently supported languages:
* JavaScript

Usage:
```JavaScript
var lang = require('lang-detector');
lang('var javascript = true;'); // => { language: 'JavaScript', points: 1 }
lang('ooga booga');             // => { language: 'Unknown', points: 1 }
```

Disclaimer: The accuracy of this library is disputable.

Disclaimer #2: This project is *far* from finished. Support for more languages and better accuracy will come with time.