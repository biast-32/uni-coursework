// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 1

object Homework_1 extends App {

  // 1.1 Provide two variables/values showing difference between immutable and mutable types. Demonstrate that you are unable to do any assignment to immutable type with an error. [Hint: var vs val]

  // we create an immutable variable using val
  val immutable: Int = 5

  // we create a mutable variable using variable
  var mutable: Int = 5

  println ("Immutable variable before: " + immutable)
  println ("Mutable variable before: " + mutable)

  // we try to assign another value to immutable but it causes an error, prooving the variable's immutability
  //immutable = 7

  //we assign another value to mutable to show it is possible (no error is caused)
  mutable = 7
  println ("Mutable variable after: " + mutable)

  // 1.2 Provide an example where Scala automatically infers the Data Types of a Boolean, Double, Int and String variables.

  // we create the variables without specifying the type
  val the_boolean = false
  val the_double = 0.32
  val the_int = 5
  val the_string = "star"

  // we print the types to check if scala inferred them correctly
  println (s"the_boolean is a: ${the_boolean.getClass}") //should print "the_boolean is a: boolean"
  println (s"the_double is a: ${the_double.getClass}") // should print "the_double is a: double"
  println (s"the_int is a: ${the_int.getClass}") // should print "the_int is a: integer"
  println (s"the_string is a: ${the_string.getClass}") // should print "the_string is a: string"

  // 1.3 Create an immutable variable of type String holding your “Last Name” with the help of multiple immutable variables of type Char. [Hint: String Composition]

  // we create an immutable variable for each unique cahracter in the last name
  // stefanescu >> s,t,e,f,a,n,c,u
  val s: Char = 's'
  val t: Char = 't'
  val e: Char = 'e'
  val f: Char = 'f'
  val a: Char = 'a'
  val n: Char = 'n'
  val c: Char = 'c'
  val u: Char = 'u'

  // we create and print the immutable variable to hold the last name
  val last_name: String = "" + s.toUpper + t + e + f + a + n + e + s + c + u

  println (last_name) // should print "Stefanescu"

  // 1.4 Create a value of type Int holding your age and place it inside the String “I am learning scala at the age of __years” [Hint: String Interpolation]

  // we create the varible containing the age
  val age: Int = 20

  // we print the message using string interpolation
  println (s"I am learning scala at the age of ${age} years")
  // but it can also be done with string concatenation
  // println("I am learning scala at the age of " + age + " years")

  // 1.5 What is a definition of Expression in Scala? Write your answer in the comment supported with example.

  // An Expression in Scala is a piece of code that has a type (int, bool, string etc) and produces a value, like a simple integer, an addition, a multiplication, or a more complex expression.

  // here are some examples

  // this is a simple expression that just evaluates to a double
  val double_exp: Double = 0.32 // it evaluates to 0.32
  println (double_exp)

  // this is an expression that evaluates to an integer via a sum
  val sum_exp: Int = 5 + 7 // it evaluates to 12
  println (sum_exp)

  // this is an if statement expression that evaluates to an integer via comparison
  val x: Int = 5
  val y: Int = 7
  val min_exp: Int = if (x < y) x else y // it evaluates to x (5 < 7)
  println (min_exp)

  // 1.6 Write any example showing Chained IF expression resulting to a single value of Int Type

  // for the example we will create a simple program that gives the cost of the electricity bill depending on how much electricity has been used:
  // if the consumption is lower than 500 KWh, the cost is 3 coins per KWh
  // if the consumption is anywhere from 500 to 999, the cost is 5 coins per KWh
  // if 1000 KWh or more has been consumed, the cost is 7 coins per KWh
  // (of course this is an exagerated and oversimplified version to use only integers)

  // first, we create the variable that holds the amount of electricity cosumed
  val KWh: Int = 832
  // val KWh: Int = 432
  // val KWh: Int = 1032
  // val KWh: Int = -32

  // now we make the cost variable that uses chained if expressions
  val cost: Int = if (0 <= KWh && KWh < 500) {
    KWh * 3
  } else if (500 <= KWh && KWh < 1000 ) {
    KWh * 5
  } else if (1000 <= KWh) {
    KWh * 7
  } else {
    -1
  }

  if (cost != -1) {
    println (s"The cost is: ${cost}")
  } else {
    println ("The consumption value is invalid =(((")
  }

  // 1.7 Write a Code Block returning a value of type string by concatenating your “First Name” and “Last Name”

  // we create a code block that defines the first and last name, then concatenates them
  val code_block: String = {
    val the_first_name = "Bianca-Ioana"
    val the_last_name = "Stefanescu"
    the_first_name + " " + the_last_name
  }

  println (code_block) // should print "Bianca-Ioana Stefanescu"

  // 1.8 Define a function that takes 2 values of type Int and returns a single value of type String after summation. E.g. the return String should be “The sum of 1 and 2 is: 3"

  // we create the function that takes two int parameters, p and q, and returns a string
  def funct (p: Int, q: Int): String = {
    // then we make the sum varibale which will hold the sum of p and q and we initialize it with an empty string
    var sum: String = ""

    // finally, we assign the desired string with p, q, and their sum to the sum variable and return it
    sum = "The sum of " + p + " and " + q + " is: " + (p + q)
    return sum
  }

  // here is an example of calling the function
  println (funct(5, 7)) // should print "The sum of 5 and 7 is: 12"

}