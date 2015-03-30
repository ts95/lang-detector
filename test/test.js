var fs = require('fs');
var assert = require('assert');
var detectLang = require('../index');

describe('fizzbuzz', function() {

	function readFizzBuzzFile(ext, cb) {
		fs.readFile(__dirname + '/fizzbuzz/fizzbuzz' + ext, {
			encoding: 'utf8',
		}, function(err, code) {
			if (err) return cb(err);
			cb(null, code);
		});
	}

	it('should detect JavaScript', function(done) {
		readFizzBuzzFile('.js', function(err, code) {
			if (err) throw err;
			assert.equal('JavaScript', detectLang(code));
			done();
		});
	});

	it('should detect C', function(done) {
		readFizzBuzzFile('.c', function(err, code) {
			if (err) throw err;
			assert.equal('C', detectLang(code));
			done();
		});
	});

	it('should detect Python', function(done) {
		readFizzBuzzFile('.py', function(err, code) {
			if (err) throw err;
			assert.equal('Python', detectLang(code));
			done();
		});
	});

	it('should detect Java', function(done) {
		readFizzBuzzFile('.java', function(err, code) {
			if (err) throw err;
			assert.equal('Java', detectLang(code));
			done();
		});
	});

});

describe('big files', function() {

	it('should detect C (4593 loc file)', function(done) {
		fs.readFile(__dirname + '/random/large.c', {
			encoding: 'utf8',
		}, function(err, code) {
			if (err) throw err;
			assert.equal('C', detectLang(code));
			done();
		});
	});

});

describe('random files', function() {

	// Test HTML
	it('should detect HTML', function(done) {
		fs.readFile(__dirname + '/random/page.html', {
			encoding: 'utf8',
		}, function(err, code) {
			if (err) throw err;
			assert.equal('HTML', detectLang(code));
			done();
		});
	});

	// Test CSS
	it('should detect CSS', function(done) {
		fs.readFile(__dirname + '/random/normalize.css', {
			encoding: 'utf8',
		}, function(err, code) {
			if (err) throw err;
			assert.equal('CSS', detectLang(code));
			done();
		});
	});

});

describe('snippets', function() {

	// Test something that isn't a programming language.
	it('should detect Unknown', function(done) {
		assert.equal('Unknown', detectLang('ooga booga'));
		done();
	});

	// Test a short JavaScript snippet.
	it('should detect JavaScript', function(done) {
		assert.equal('JavaScript', detectLang('var javascript = true;'));
		done();
	});

	// Test pointer.
	it('should detect C', function(done) {
		assert.equal('C', detectLang('int *ptr;'));
		done();
	});

	// Test python variable declaration.
	it('should detect Python', function(done) {
		assert.equal('Python', detectLang('i = 1'));
		done();
	});

	// Test getter/setter.
	it('should detect Java', function(done) {
		assert.equal('Java', detectLang('Person person = people.get(0);'));
		done();
	});

});