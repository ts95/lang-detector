var _ = require('underscore');

function sum(nums) {
	return _.reduce(nums, function(memo, num) {
		return memo + num;
	}, 0);
}

function getPoints(lineOfCode, checkers) {
	return sum(_.map(checkers, function(checker) {
		if (checker.pattern.test(lineOfCode)) {
			return checker.points;
		}
		return 0;
	}));
}

/**
 * Key: Language name.
 * Value: Array of pattern and points pairs (checkers).
 * 
 * Points scale:
 * -1 if it's very unlikely
 *  1 if it's somewhat likely
 *  2 if it's very likely
 */
var languages = {
	'JavaScript': [
		// undefined keyword
		{ pattern: /undefined/g, points: 2 },
		// Function definition
		{ pattern: /function( )*(\w+( )*)?\(.+\)/g, points: 2 },
		// console.log('ayy lmao')
		{ pattern: /console.log( )*\(/g, points: 2 },
		// Variable declaration
		{ pattern: /var( )+\w+( )*=?/, points: 1 },
		// null keyword
		{ pattern: /null/g, points: 1 },
		// === operator
		{ pattern: /===/g, points: 1 },
		// !== operator
		{ pattern: /!==/g, points: 1 },
		// C style variable declaration.
		{ pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
	],

	'C': [
		// Primitive variable declaration.
		{ pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
		// malloc function call
		{ pattern: /malloc\(.+\)/, points: 2 },
		// Variable declaration and/or initialisation.
		{ pattern: /(\w+)( )+\w+(;|( )*=)/, points: 2 },
		// #include <whatever.h>
		{ pattern: /#include (<|")\w+\.h(<|")/g, points: 2 },
		// Array declaration.
		{ pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
		// NULL constant
		{ pattern: /NULL/, points: 1 },
		// void keyword
		{ pattern: /void/g, points: 1 },
		// printf function
		{ pattern: /printf( )*\(.+\)/, points: 1 },
		// new Keyword from C++
		{ pattern: /new \w+/, points: -1 },
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
		// import something
		{ pattern: /import \w+/, points: 2 },
		// class keyword
		{ pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
		// print statement/function
		{ pattern: /print((( )*\(.+\))|( )*.+)/, points: 2 },
		// if keyword
		{ pattern: /if( )+(.+)( )*:/, points: 2 },
		// elif keyword
		{ pattern: /elif( )+(.+)( )*:/, points: 2 },
		// else keyword
		{ pattern: /else:/, points: 2 },
		// pass keyword
		{ pattern: /pass/, points: 1 },
		// and/or keywords/operators
		{ pattern: /(and|or)/, points: 1 },
		// &&/|| operators
		{ pattern: /(&{2}|\|{2})/, points: -1 },
		// const
		{ pattern: /const( )*\w+/, points: -1 },
		// C style variable declaration.
		{ pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
	],

	'Unknown': [],
};

/**
 * @snippet {String} The code snippet.
 * @allResults {Boolean} (Optional) Return all results.
 * @return {String} or {Object}
 */
function detect(snippet, allResults) {
	var linesOfCode = snippet.replace(/\r\n?/g, '\n').split('\n');

	var pairs = _.keys(languages).map(function(key) {
		return { language: key, checkers: languages[key] };
	});

	var results = _.map(pairs, function(pairs) {
		var language = pairs.language;
		var checkers = pairs.checkers;
		return {
			language: language,
			points: language === 'Unknown' ? 1 : sum(_.map(linesOfCode, function(lineOfCode) {
				return getPoints(lineOfCode, checkers);
			})),
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

module.exports = detect;