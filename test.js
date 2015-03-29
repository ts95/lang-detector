var fs = require('fs');
var path = require('path');
var lang = require('./index');

var codeDir = path.join(__dirname, 'example_code');

fs.readFile(path.join(codeDir, 'fizzbuzz.c'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log(lang(code));
});

fs.readFile(path.join(codeDir, 'fizzbuzz.js'), {
	encoding: 'utf8',
}, function(err, code) {
	if (err) throw err;
	console.log(lang(code));
});