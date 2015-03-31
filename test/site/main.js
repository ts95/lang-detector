var $ = require('jquery');
var detectLang = require('../../index');

console.log($('#btn'));

$('#btn').click(function(e) {
	var detection = detectLang($('#input').val(), { detailedResult: true });
	var parts = ['Detected: ' + detection.detected];
	$.each(detection.statistics, function(language, points) {
		parts.push(language + ': ' + points);
	});
	$('#output').text(parts.join('\n'));
	//$('#output').text(JSON.stringify(detection, null, 4));
});