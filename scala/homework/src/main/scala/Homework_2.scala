// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 2

object Homework_2 {

  // >>>>>>>>>>>>>>>>>>>>>>>> 1. ADDITION <<<<<<<<<<<<<<<<<<<<<<<< //

  /** addition function: explanation
   * adds two integers using recursion
   * if b = 0, the function just returns a (a + 0 = a)
   * if b > 0, the function calls itself and adds one to the result
   * * in this case, when calling itself, b must decrease by 1 to get closer to 0
   * if b < 0, the function calls itself and subtracts one from the result
   * * in this case, when calling itself, b must increase by 1 to get closer to 0
   */

  /** addition function: example
   * addition(3, 2) = addition(3, 1) + 1 = 4 + 1 = 5 // because 2 != 0 && 2 > 0
   * addition(3, 1) = addition(3, 0) + 1 = 3 + 1 = 4 // because 1 != 0 && 1 > 0
   * addition(3, 0) = 3 // because 0 == 0, the base case
   * addition(3, 1) = 3 + 1 = 4
   * addition(3, 2) = 4 + 1 = 5
   */

  def addition(a: Int, b: Int): Int = {
    if (b == 0) a
    else if (b > 0) addition(a, b - 1) + 1
    else addition (a, b + 1) - 1
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 2. SUBTRACTION <<<<<<<<<<<<<<<<<<<<<<<< //

  /** subtraction function: explanation
   * subtracts an integer from another using the addition function
   * it calls the addition function, but with b negated (i.e. a - b is a + (-b))
   */

  /** subtraction function: example
   * subtraction(3, 2) = addition(3, -2)
   * addition(3, -2) = addition(3, -1) - 1 // because -2 != 0 && -2 < 0
   * addition(3, -1) = addition(3, 0) - 1 // because -1 != 0 && -1 < 0
   * addition(3, 0) = 3 // because 0 == 0, the base case
   * addition(3, -1) = 3 - 1 = 2
   * addition(3, -2) = 2 - 1 = 1
   */

  def subtraction(a: Int, b: Int): Int = {
    addition (a, -b)
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 3. MULTIPLICATION <<<<<<<<<<<<<<<<<<<<<<<< //

  /** multiplication function: explanation
   * multiplies two integers using recursion and the addition function
   * if b = 0, just returns 0 (a * 0 = 0)
   * if b > 0, it adds a to the result recursively for b times
   * if b < 0, it calls itself with both numbers negated so that b becomes positive and addition can be used, but a becomes negative so the result will be correct
   */

  /** multiplication function: example
   * multiplication(3, 2) = addition(3, multiplication(3, 1))
   * multiplication(3, 1) = addition(3, multiplication(3, 0))
   * multiplication(3, 0) = 0 // because 0 == 0, the base case
   * multiplication(3, 1) = 3 + 0 = 3
   * multiplication(3, 2) = 3 + 3 = 6
   *
   * multiplication(3, -2) = multiplication(-3, 2)
   * multiplication(-3, 2) = addition(-3, multiplication(-3, 1))
   * multiplication(-3, 1) = addition(-3, multiplication(-3, 0))
   * multiplication(-3, 0) = 0 // because 0 == 0, the base case
   * multiplication(-3, 1) = -3 + 0 = -3
   * multiplication(-3, 2) = -3 + (-3) = -6
   */

  def multiplication(a: Int, b: Int): Int = {
    if (b == 0) 0
    else if (b > 0) addition(a, multiplication(a, b - 1))
    else multiplication(-a, -b)
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 4. DIVISION <<<<<<<<<<<<<<<<<<<<<<<< //

  /** division function: explanation
   * divides a by b using recursion and the subtraction function
   * if b = 0, prints error message because division by 0 is not possible
   * if both a and b are < 0, it calls itself with both numbers negated because -a / -b is the same as a / b
   * if a < 0, it calls itself with a negated and just returns the negated result because -a / b = -(a / b)
   * if b < 0, it calls itself with b negated and just returns the negated result because a / -b = -(a / b)
   * if both a and b are > 0 and a < b, it means there is no more to subtract and returns 0
   * if both a and b are > 0 and a >= b, it recursively subtracts b from a and adds 1 to the quotient
   */

  /** division function: example
   * division(7, 2) = division(subtraction(7, 2), 2) + 1 = division(5, 2) + 1
   * division(5, 2) = division(subtraction(5, 2), 2) + 1 = division(3, 2) + 1
   * division(3, 2) = division(subtraction(3, 2), 2) + 1 = division(1, 2) + 1
   * division(1, 2) = 0 // because 1 < 2 and no more can be subtracted
   * division(3, 2) = 0 + 1 = 1
   * division(5, 2) = 1 + 1 = 2
   * division(7, 2) = 2 + 1 = 3
   */

  def division(a: Int, b: Int): Either[String, Int] = {
    if (b == 0) Left("Division by 0 not possible.")
    else if (a < 0 && b < 0 ) division(-a, -b)
    else if (a < 0) {
      division(-a, b) match {
        case Left(error) => Left(error)
        case Right(result) => Right(-result)
      }
    }
    else if (b < 0) {
      division(a, -b) match {
        case Left(error) => Left(error)
        case Right(result) => Right(-result)
      }
    }
    else if (a < b) Right(0)
    else {
      division(subtraction(a, b), b) match {
        case Left(error) => Left(error)
        case Right(result) => Right(result + 1)
      }
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 5. FACTORIAL <<<<<<<<<<<<<<<<<<<<<<<< //

  /** factorial function: explanation
   * multiplies all numbers from n to 1 using recursion and the multiplication function
   * if n = 0, just returns 1 because 0! = 1
   * if n != 0 it just multiplies n and the factorial of n - 1
   */

  /** factorial function: example
   * factorial(5) = multiplication(factorial(4), 5)
   * factorial(4) = multiplication(factorial(3), 4)
   * factorial(3) = multiplication(factorial(2), 3)
   * factorial(2) = multiplication(factorial(1), 2)
   * factorial(1) = multiplication(factorial(0), 1)
   * factorial(0) = 1 // because 0! = 1
   * factorial(1) = multiplication(1, 1) = 1
   * factorial(2) = multiplication(1, 2) = 2
   * factorial(3) = multiplication(2, 3) = 6
   * factorial(4) = multiplication(6, 4) = 24
   * factorial(5) = multiplication(24, 5) = 120
   */

  def factorial(n: Int): Int = {
    if (n == 0) 1
    else multiplication(factorial(n - 1), n)
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 6. ISPRIME <<<<<<<<<<<<<<<<<<<<<<<< //

  /** isPrime function: explanation
   * checks if n is prime using recursion
   * if n = 0 or n == 1, just return false
   * if n = 2, just return true
   * if n is even but larger than 2, return false because 2 is the only even number that is prime
   * if n is odd, for all numbers from 2 ro the square root of n, check if n is divisible by them
   * * if n is divisible only by one of them, return false because it means n is divisible by at least one more number other than 1 and itself (n)
   * * if all numbers are checked and n is not divisible by any, return true
   */

  /** isPrime function: example
   * isPrime(17) --> for i <- 2 to 4
   * * 17 % 2 != 0
   * * 17 % 3 != 0
   * * 17 % 4 != 0
   * true // because 17 is not divisible by other numbers than 1 and itself, so it is prime
   */

  def isPrime(n: Int): Boolean = {
    if (n == 0 || n == 1) false
    else if (n == 2) true
    else if (n % 2 == 0) false
    else {
      for (i: Int <- 2 to math.sqrt(n).toInt) {
        if (n % i == 0) return false
      }
      true
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>> 7. IMPACT ON MEMORY <<<<<<<<<<<<<<<<<<<<<<<< //

  /** recursion vs loops
   * recursion takes a lot more memory because for each function call it stores values and stacks them until the base case
   * loops are more efficient because they reuse memory
   */

  /** recursion: example */
   def recursionFactorial(n: Int): Int = {
   if (n == 0) 1
   else multiplication(recursionFactorial(n - 1), n)
   }
  /** for n = 5, each function call would store and stack a value (1, 2, 6, 24, 120) */

  /** loops: example */
   def loopFactorial(n: Int): Int = {
     var factorial = 1
     for (i: Int <- 1 to n) {
       factorial = factorial * i
     }
     factorial
   }
   /** for n = 5, for each i the factorial variable would just be updates, so no additional memory is used */

  // >>>>>>>>>>>>>>>>>>>>>>>> 8. SCOPE <<<<<<<<<<<<<<<<<<<<<<<< //

  /** local vs global
   * local scope means variables live only inside the function they were declared in
   * * they cannot be accessed or used from the outside
   * * they are more safe when it comes to accidental changing
   * * they can be constant(val) or modifiable(var)
   * * using closure, their life can be extended outside the function
   *
   * global scope refers to variables declared outside any function
   * * they can be accessed and used throughout the entire program
   * * they can be constant(val) or modifiable(var)
   */

  /** global variable example */
  var globalVar = 64

  /** local variable example */
  def variableClosedCage(): Int = {
    val localVar = 32
    localVar
  }

  /** extending local variable life using closure example */
  def variableOpenCage(): () => Int = {
    val localVar = 32
    () => localVar
  }
  val openCage = variableOpenCage()

  def main(args: Array[String]): Unit = {
    // Calling each method with sample inputs
    println(addition(5, 3))
    println(subtraction(5, 3))
    println(multiplication(5, 3))
    println(division(6, 2))
    println(factorial(5))
    println(isPrime(7))

    println(recursionFactorial(5))
    println(loopFactorial(5))

    println(globalVar) // this prints 7 because the global variable is accessible from anywhere in the program
    // println(localVar) // this would produce an error because the local variable cannot be accessed from outside
    println(openCage())
  }
}
