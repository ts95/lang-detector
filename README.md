lang-detector
=====
A fast and small library for detecting the programming language of a code snippet. Can also be used on moderately large strings of code spanning a few thousand lines, but it's not recommended as the function blocks execution.

This library should only be used if you don't have anything else to go by to determine the language of the code, like a file extension.

## Install:
```Shell
npm install lang-detector
```

## Detectable languages
* JavaScript
* C
* C++
* Python
* Java
* HTML
* CSS
* Ruby

## Usage:
```JavaScript
/**
 * function detectLang(snippet, allResults) { ... }
 *
 * @snippet {String} The code snippet.
 * @allResults {Boolean} (Optional) Return all results if true (object instead of string).
 * @return {String} or {Object}
 */
var detectLang = require('lang-detector');

detectLang('List<String> things = new ArrayList<>();')
    // =>    'Java'
detectLang('console.log("Hello world");')
    // =>    'JavaScript'
detectLang('Hello world.', true)
    /* =>  { 'JavaScript' : 0,
             'C'          : 0,
             'Python'     : 0,
              ...
             'Unknown'    : 1 } */

```

## Unit tests
Run `npm test` in the root of the directory to run the tests.

## License
<a href="https://tldrlegal.com/license/mit-license" target="_blank">MIT</a> © <a href="https://github.com/ts95/" target="_blank">Toni Sučić</a>