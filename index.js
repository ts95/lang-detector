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
 * Value: Function that calculates the probability of the
 * code being in the given language.
 * 
 * The function returns:
 *  0 if it's unlikely
 *  1 if it's somewhat likely
 *  2 if it's very likely
 */
var languages = {
	'JavaScript': function(lineOfCode) {
		var checkers = [
			{ pattern: /undefined/g, points: 2 },
			{ pattern: /function( )\((\w+,?( )*)+\)*/g, points: 2 },
			{ pattern: /console.log( )*\(/g, points: 2 },
			{ pattern: /^var( )+\w+/g, points: 1 },
			{ pattern: /null/g, points: 1 },
		];
		return getPoints(lineOfCode, checkers);
	},

	'Unknown': function(lineOfCode) {
		return 0;
	},
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

	var results = _.mapObject(languages, function(calculate, language) {
		return {
			language: language,
			points: language === 'Unknown' ? 1 : sum(_.map(linesOfCode, function(lineOfCode) {
				return calculate(lineOfCode);
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