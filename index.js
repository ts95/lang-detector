var _ = require('underscore');

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
 * Value: Array of pattern and points pairs (checkers).
 * 
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus: Almost unique to a given language.
 *  1 = Regular: Not unique to a given language.
 * -1 = Penalty: Does not match a given language.
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
		{ pattern: /#include (<|")\w+\.h(<|")/g, points: 2 },
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
		{ pattern: /printf( )*\(.+\)/, points: 1 },
		// new Keyword from C++
		{ pattern: /new \w+/, points: -1 },
		// Single quote multicharacter string
		{ pattern: /'.{2,}'/, points: -1 },
	],

	'Python': [
		// Function definition
		{ pattern: /def( )+\w+( )*:/, points: 2 },
		// while loop
		{ pattern: /while (.+):/, points: 2 },
		// for loop
		{ pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):?/, points: 2 },
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
		// Python variable declaration.
		{ pattern: /\w+( )*=( )*[\w]+/, points: 1 },
		// import something
		{ pattern: /import ([[^\.]\w])+/, points: 1 },
		// print statement/function
		{ pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
		// &&/|| operators
		{ pattern: /(&{2}|\|{2})/, points: -1 },
		// const
		{ pattern: /const( )*\w+/, points: -1 },
		// C style variable declaration.
		{ pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
	],

	'Java': [
		// System.out.println() etc.
		{ pattern: /System\.(in|out)\./, points: 2 },
		// Class variable declarations
		{ pattern: /(private|protected|public)( )*\w+( )*\w+(( )*=( )*[\w])?/, points: 2 },
		// Method
		{ pattern: /(private|protected|public)( )*\w+( )*[\w]+\(.+\)/, points: 2 },
		// @Override annotation.
		{ pattern: /@Override/, points: 2 },
		// String class
		{ pattern: /(^|\s)(String)( )+[\w]+( )*=?/, points: 2 },
		// List/ArrayList
		{ pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: 2 },
		// class keyword
		{ pattern: /(public( )*)?class( )*\w+/, points: 2 },
		// Array declaration.
		{ pattern: /(\w+)(\[\])+( )+\w+/, points: 2 },
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
		// poiner
		{ pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
		// Single quote multicharacter string
		{ pattern: /'.{2,}'/, points: -1 },
	],

	'HTML': [
		// Tags
		{ pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2 },
	],

	'CSS': [
		// Properties
		{ pattern: /[a-z\-]+:.+;/, points: 2 },
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

		return {
			language: language,
			points: points,
		};
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

	return bestResult.language;
}

module.exports = detectLang;