var fs = require('fs');
var assert = require('assert');
var detectLang = require('../index');

describe('FizzBuzz', function() {

	function readFizzBuzzFile(ext, cb) {
		fs.readFile(__dirname + '/fizzbuzz/fizzbuzz' + ext, {
			encoding: 'utf8',
		}, function(err, code) {
			if (err) return cb(err);
			cb(null, code);
		});
	}

	it('should detect JavaScript', function() {
		readFizzBuzzFile('.js', function(err, code) {
			if (err) throw err;
			assert.equal('JavaScript', detectLang(code));
		});
	});

	it('should detect C', function() {
		readFizzBuzzFile('.c', function(err, code) {
			if (err) throw err;
			assert.equal('C', detectLang(code));
		});
	});

	it('should detect Python', function() {
		readFizzBuzzFile('.py', function(err, code) {
			if (err) throw err;
			assert.equal('Python', detectLang(code));
		});
	});

	it('should detect Java', function() {
		readFizzBuzzFile('.java', function(err, code) {
			if (err) throw err;
			assert.equal('Java', detectLang(code));
		});
	});

});