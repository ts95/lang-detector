console.log(
    Array.apply(null, { length: 100 })
         .map(Number.call, Number)
         .map(function(n) {
        return n % 15 === 0 ?
                  'FizzBuzz' : n % 3 === 0 ?
                  'Fizz' : n % 5 === 0 ? 'Buzz' : n;
    })
);