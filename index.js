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
 *  0 if it's unlikely
 *  1 if it's somewhat likely
 *  2 if it's very likely
 */
var languages = {
	'JavaScript': [
		// undefined keyword
		{ pattern: /undefined/g, points: 2 },
		// Function definition
		{ pattern: /function( )*\((\w+,?( )*)+\)*/g, points: 2 },
		// console.log('ayy lmao')
		{ pattern: /console.log( )*\(/g, points: 2 },
		// Variable declaration
		{ pattern: /^var( )+\w+( )*=?/, points: 1 },
		// null keyword
		{ pattern: /null/g, points: 1 },
		// C style variable declaration.
		{ pattern: /^(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
	],

	'C': [
			// Primitive variable declaration.
			{ pattern: /^(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
			// malloc function call
			{ pattern: /malloc\(.+\)/, points: 2 },
			// Variable declaration.
			{ pattern: /^(\w+)( )+\w+( )*\(.+\)/, points: 2 },
			// #include <whatever.h>
			{ pattern: /#include (<|")\w+\.h(<|")/g, points: 2 },
			// Array delcration.
			{ pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
			// NULL constant
			{ pattern: /NULL/, points: 1 },
			// void keyword
			{ pattern: /void/g, points: 1 },
			// new Keyword from C++
			{ pattern: /new \w+/, points: -1 },
	],

	'Unknown': [],
};

/**
 * @snippet {String} The code snippet.
 * @allResults {Boolean} (Optional) Return all results.
 * @return {Object}
 */
function detect(snippet, allResults) {
	var maxSnippetSize = 5000;

	if (snippet.length > maxSnippetSize)
		cb(new Error('Max snippet size of 5000 was exceeded.'));

	var linesOfCode = snippet.replace(/\r\n?/g, '\n').split('\n');

	var results = _.mapObject(languages, function(checkers, language) {
		return {
			language: language,
			points: sum(_.map(linesOfCode, function(lineOfCode) {
				return getPoints(lineOfCode, checkers);
			})),
		};
	});

	if (allResults) {
		return results;
	}

	var bestResult = _.max(results, function(result) {
		return result.points;
	});

	return bestResult;
}

module.exports = detect;