<?php

for ($i = 1; $i <= 100; $i++) {
	if ($i % 3 == 0) {
		echo "fizz";
	}

	if ($i % 5 == 0) {
		echo "buzz";
	}

	if ($i % 3 != 0 && $i % 5 != 0) {
		echo $i;
	}

	echo "\n";
}