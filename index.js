/**
 *	The MIT License (MIT)
 *
 *	Copyright (c) 2015 Toni Sučić
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 */

var _ = require('underscore');

var debug = false;

function getPoints(language, lineOfCode, checkers) {
	return _.reduce(_.map(checkers, function(checker) {
		if (checker.pattern.test(lineOfCode)) {
			return checker.points;
		}
		return 0;
	}), function(memo, num) {
		return memo + num;
	}, 0);
}

/**
 * A checker is an object with the following form:
 *  { pattern: /something/, points: 1 }
 * 
 * Key: Language name.
 * Value: Array of checkers.
 * 
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus point:    Almost unique to a given language.
 *  1 = Regular point:  Not unique to a given language.
 * -1 = Penalty point:  Does not match a given language.
 */
var languages = {
	'JavaScript': [
		// undefined keyword
		{ pattern: /undefined/g, points: 2 },
		// Function definition
		{ pattern: /function( )*(\w+( )*)?\(.+\)/g, points: 2 },
		// console.log('ayy lmao')
		{ pattern: /console\.log( )*\(/g, points: 2 },
		// === operator
		{ pattern: /===/g, points: 2 },
		// !== operator
		{ pattern: /!==/g, points: 2 },
		// Variable declaration
		{ pattern: /var( )+\w+( )*=?/, points: 2 },
		// null keyword
		{ pattern: /null/g, points: 1 },
		// (else )if statement
		{ pattern: /(else )?if( )+\(.+\)/, points: 1 },
		// while loop
		{ pattern: /while( )+\(.+\)/, points: 1 },
		// C style variable declaration.
		{ pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
		// pointer
		{ pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
	],

	'C': [
		// Primitive variable declaration.
		{ pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
		// malloc function call
		{ pattern: /malloc\(.+\)/, points: 2 },
		// #include <whatever.h>
		{ pattern: /#include (<|")\w+\.h(>|")/, points: 2 },
		// pointer
		{ pattern: /(\w+)( )*\*( )*\w+/, points: 2 },
		// Variable declaration and/or initialisation.
		{ pattern: /(\w+)( )+\w+(;|( )*=)/, points: 1 },
		// Array declaration.
		{ pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
		// NULL constant
		{ pattern: /NULL/, points: 1 },
		// void keyword
		{ pattern: /void/g, points: 1 },
		// (else )if statement
		{ pattern: /(else )?if( )*\(.+\)/, points: 1 },
		// while loop
		{ pattern: /while( )+\(.+\)/, points: 1 },
		// printf function
		{ pattern: /(printf|puts)( )*\(.+\)/, points: 1 },
		// new Keyword from C++
		{ pattern: /new \w+/, points: -1 },
		// Single quote multicharacter string
		{ pattern: /'.{2,}'/, points: -1 },
	],

	'C++': [
		// Primitive variable declaration.
		{ pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
		// #include <whatever.h>
		{ pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: 2 },
		// using namespace something
		{ pattern: /using( )*namespace( )*\w+( )*;/, points: 2 },
		// template
		{ pattern: /template( )*<.*>/, points: 2 },
		// std
		{ pattern: /std::\w+/g, points: 2 },
		// cout/cin/endl
		{ pattern: /(cout|cin|endl)/g, points: 2 },
		// NULL constant
		{ pattern: /NULL/, points: 1 },
		// void keyword
		{ pattern: /void/g, points: 1 },
		// (else )if statement
		{ pattern: /(else )?if( )*\(.+\)/, points: 1 },
		// while loop
		{ pattern: /while( )+\(.+\)/, points: 1 },
		// new Keyword
		{ pattern: /new \w+(\(.*\))?/, points: 2 },
		// Scope operator
		{ pattern: /\w*::\w+/, points: 1 },
		// malloc function call
		{ pattern: /malloc\(.+\)/, points: -1 },
		// Single quote multicharacter string
		{ pattern: /'.{2,}'/, points: -1 },
		// Java List/ArrayList
		{ pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: -1 },
	],

	'Python': [
		// Function definition
		{ pattern: /def( )+\w+( )*:/, points: 2 },
		// while loop
		{ pattern: /while (.+):/, points: 2 },
		// from library import something
		{ pattern: /from [\w\.]+ import (\w+|\*)/, points: 2 },
		// class keyword
		{ pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
		// if keyword
		{ pattern: /if( )+(.+)( )*:/, points: 2 },
		// elif keyword
		{ pattern: /elif( )+(.+)( )*:/, points: 2 },
		// else keyword
		{ pattern: /else:/, points: 2 },
		// for loop
		{ pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):?/, points: 1 },
		// Python variable declaration.
		{ pattern: /\w+( )*=( )*[\w]+/, points: 1 },
		// import something
		{ pattern: /import ([[^\.]\w])+/, points: 1 },
		// print statement/function
		{ pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
		// &&/|| operators
		{ pattern: /(&{2}|\|{2})/, points: -1 },
	],

	'Java': [
		// System.out.println() etc.
		{ pattern: /System\.(in|out)\./, points: 2 },
		// Class variable declarations
		{ pattern: /(private|protected|public)( )*\w+( )*\w+(( )*=( )*[\w])?/, points: 2 },
		// Method
		{ pattern: /(private|protected|public)( )*\w+( )*[\w]+\(.+\)/, points: 2 },
		// String class
		{ pattern: /(^|\s)(String)( )+[\w]+( )*=?/, points: 2 },
		// List/ArrayList
		{ pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: 2 },
		// class keyword
		{ pattern: /(public( )*)?class( )*\w+/, points: 2 },
		// Array declaration.
		{ pattern: /(\w+)(\[( )*\])+( )+\w+/, points: 2 },
		// final keyword
		{ pattern: /final( )*\w+/, points: 2 },
		// getter & setter
		{ pattern: /\w+\.(get|set)\(.+\)/, points: 2 },
		// new Keyword (Java)
		{ pattern: /new \w+( )*\(.+\)/, points: 2 },
		// C style variable declaration.
		{ pattern: /(^|\s)(char|long|int|float|double)( )+[\w]+( )*=?/, points: 1 },
		// extends/implements keywords
		{ pattern: /(extends|implements)/, points: 1 },
		// null keyword
		{ pattern: /null/g, points: 1 },
		// (else )if statement
		{ pattern: /(else )?if( )*\(.+\)/, points: 1 },
		// while loop
		{ pattern: /while( )+\(.+\)/, points: 1 },
		// void keyword
		{ pattern: /void/g, points: 1 },
		// const
		{ pattern: /const( )*\w+/, points: -1 },
		// pointer
		{ pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
		// Single quote multicharacter string
		{ pattern: /'.{2,}'/, points: -1 },
		// C style include
		{ pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: -1 },
	],

	'HTML': [
		// Tags
		{ pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2 },
	],

	'CSS': [
		// Properties
		{ pattern: /[a-z\-]+:.+;/, points: 2 },
	],

	'Ruby': [
		// require/include
		{ pattern: /(require|include)( )*'\w+(\.rb)?'/, points: 2 },
		// Function definition
		{ pattern: /def( )+\w+( )*(\(.+\))?( )*\n/, points: 2 },
		// Instance variables
		{ pattern: /@\w+/, points: 2 },
		// Boolean property
		{ pattern: /\.\w+\?/, points: 2 },
		// puts (Ruby print)
		{ pattern: /puts( )*("|').+("|')/, points: 2 },
		// Inheriting class
		{ pattern: /class [A-Z]\w*( )*<( )*([A-Z]\w*(::)?)+/, points: 2 },
		// attr_accessor
		{ pattern: /attr_accessor( )+(:\w+(,( )*)?)+/, points: 2 },
		// new
		{ pattern: /\w+\.new( )+/, points: 2 },
		// elsif keyword
		{ pattern: /elsif/, points: 2 },
		// do
		{ pattern: /do( )*\|(\w+(,( )*\w+)?)+\|/, points: 2 },
		// for loop
		{ pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+)/, points: 1 },
		// nil keyword
		{ pattern: /nil/, points: 1 },
		// Scope operator
		{ pattern: /[A-Z]\w*::[A-Z]\w*/, points: 1 },
	],

	'Unknown': [],
};

/**
 * @snippet {String} The code snippet.
 * @allResults {Boolean} (Optional) Return all results.
 * @return {String} or {Object}
 */
function detectLang(snippet, allResults) {
	var linesOfCode = snippet
		.replace(/\r\n?/g, '\n')
		.replace(/\n{2,}/g, '\n')
		.split('\n');

	var pairs = _.keys(languages).map(function(key) {
		return { language: key, checkers: languages[key] };
	});

	var results = _.map(pairs, function(pairs) {
		var language = pairs.language;
		var checkers = pairs.checkers;

		if (language === 'Unknown') {
			return { language: 'Unknown', points: 1 };
		}

		var points = _.reduce(_.map(linesOfCode, function(lineOfCode) {
			return getPoints(language, lineOfCode, checkers);
		}), function(memo, num) {
			return memo + num;
		}, 0);

		return { language: language, points: points };
	});

	if (allResults) {
		var resultsObject = {};
		for (var result of results) {
			resultsObject[result.language] = result.points;
		}
		return resultsObject;
	}

	var bestResult = _.max(results, function(result) {
		return result.points;
	});

	if (debug) {
		console.log(bestResult.language);
		console.log(results);
	}

	return bestResult.language;
}

module.exports = detectLang;