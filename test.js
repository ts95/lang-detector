var fs = require('fs');
var path = require('path');
var lang = require('./index');

var codeDir = path.join(__dirname, 'example_code');

fs.readFile(path.join(codeDir, 'fizzbuzz.c'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log('fizzbuzz.c');
	console.log(lang(code, true));
	console.log();
});

fs.readFile(path.join(codeDir, 'fizzbuzz.js'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log('fizzbuzz.js');
	console.log(lang(code, true));
	console.log();
});

fs.readFile(path.join(codeDir, 'fizzbuzz.py'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log('fizzbuzz.py');
	console.log(lang(code, true));
	console.log();
});

fs.readFile(path.join(codeDir, 'fizzbuzz.ooga'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log('fizzbuzz.ooga');
	console.log(lang(code, true));
	console.log();
});