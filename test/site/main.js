var $ = require('jquery');
var detectLang = require('../../index');

$('#btn').click(function(e) {
	var detection = detectLang($('#input').val(), { statistics: true });
	var parts = [];
	$.each(detection.statistics, function(language, points) {
		parts.push(language + ': ' + points);
	});
	$('#output').text(parts.join('\n'));
});