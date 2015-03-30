/*
 * fizzbuzz.cpp
 *
 *  Created on: Apr 25, 2012
 *      Author: Brian Geffon
 *
 *  fizzbuzz solved without looping or conditionals using only template recursion.
 */
 
#include <iostream>
#include <string>
 
template <int r> struct FizzBuzzPrinter {
	static const int fizzBuzzed = 0;
	template <typename T> FizzBuzzPrinter(T t) {}
};
 
template <> struct FizzBuzzPrinter<0> {
	static const int fizzBuzzed = 1;
	template <typename T> FizzBuzzPrinter(T t) {
		std::cout << t;
	}
};
 
template <int N> struct FizzBuzz: FizzBuzz<N - 1> {
	FizzBuzz() {
		FizzBuzzPrinter<(N % 15)>("FizzBuzz");
		FizzBuzzPrinter<(N % 5) + FizzBuzzPrinter<N % 15>::fizzBuzzed>("Buzz");
		FizzBuzzPrinter<(N % 3) + FizzBuzzPrinter<(N % 15)>::fizzBuzzed + FizzBuzzPrinter<(N % 5) + FizzBuzzPrinter<N % 15>::fizzBuzzed>::fizzBuzzed>("Fizz");
		FizzBuzzPrinter<FizzBuzzPrinter<N % 3>::fizzBuzzed + FizzBuzzPrinter<N % 5>::fizzBuzzed>(int(N));
		std::cout << std::endl;
	}
};
 
template <> struct FizzBuzz<0> {};
 
int main (int argc, char **argv)
{ 
	FizzBuzz<100> p;
	return 0;
}