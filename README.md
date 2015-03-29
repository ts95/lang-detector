lang-detector
=====
A library for detecting the programming language of a code snippet.

Currently supported languages:
* JavaScript

Install:
```
npm install lang-detector
```

Usage:
```JavaScript
var lang = require('lang-detector');
lang('var javascript = true;') // => { language: 'JavaScript', points: 1 }
lang('ooga booga')             // => { language: 'Unknown', points: 0 }
```

Disclaimer: The accuracy of this library is disputable.<br>
Disclaimer #2: This project is <b>far</b> from finished. Support for more languages and better accuracy will come with time.