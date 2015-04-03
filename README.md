lang-detector
=====
[![NPM](https://nodei.co/npm/lang-detector.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/lang-detector/)

A fast and small library for detecting the programming language of a code snippet. 
Can be used for strings of code spanning multiple thousand lines.

This library should only be used if you don't have anything else to go by to determine the language of the code, like a file extension.

## Detectable languages
* JavaScript
* C
* C++
* Python
* Java
* HTML
* CSS
* Ruby
* Go
* PHP

## Install
```Shell
npm install lang-detector --save
```

## Usage
```JavaScript
/**
 * function detectLang(snippet, options) { ... }
 *
 * @snippet {String} The code snippet.
 * @options {Object} (Optional) {
 *   heuristic: {Boolean} Enable heuristic optimisation for better performance. `true` by default.
 *   statistics: {Boolean} Return statistics. `false` by default.
 * }
 * @return {String} (Name of the detected language) or {Object} (Statistics).
 */
var detectLang = require('lang-detector');

detectLang('List<String> things = new ArrayList<>();')
    // =>    'Java'
detectLang('console.log("Hello world");')
    // =>    'JavaScript'
detectLang('Hello world.', { statistics: true })
    /* =>   {
                "detected": "Unknown",
                "statistics": {
                    "JavaScript": 0,
                    "C": 0,
                    "C++": 0,
                    "Python": 0,
                     ...
                    "Unknown": 1
                }
            } 
     */
```

## Unit tests
Run `npm test` in the root of the directory to run the tests.

## License
<a href="https://tldrlegal.com/license/mit-license" target="_blank">MIT</a> © <a href="https://github.com/ts95/" target="_blank">Toni Sučić</a>