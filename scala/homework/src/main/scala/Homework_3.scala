// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 3

object Homework_3 {

  //////////////////////////////// E X E R C I S E  1 ////////////////////////////////

  /** operateOnList
   *  if the list is empty, the function just returns the empty list
   *  for "head", the first element in the processed list:
   *    if it is an odd number, the function converts it to an even one
   *    if it is even, the function leaves it as it is
   *  then, it recursively does the same thing for the rest of the list (tail)
   *  finally, the first element and the tail of the currently processed list are put together
   * */

  def operateOnList(list: List[Int], oddToEven: Int => Int): List[Int] = {
    if (list.isEmpty) {
      List()
    } else {
      var head = list.head
        if (list.head % 2 != 0) {
          head = oddToEven(list.head)
        } else {
          head = list.head
        }
      val rest = operateOnList(list.tail, oddToEven)
      head :: rest
    }
  }

  /** oddToEven
   * for this function, I didn't know whether odd numbers should be converted to the previous or next even number
   * so, I assumed it's the next one (odd number + 1)
   * */

  def oddToEven(n: Int): Int = {
    n + 1
  }


  //////////////////////////////// E X E R C I S E  2 ////////////////////////////////

  /** filterAndMap
   * if the list is empty, the function just returns the empty list
   * for each string in the list:
   *    if its length is greater than of equal to 6 (greaterLength returns true)
   *      the string is concatenated with its length
   *    if its length is less than 6, the string is omitted
   * the function recursively does the same thing for the rest of the list (tail)
   * finally, the first element and the tail of the currently processed list are put together
   * */

  def filterAndMap(list: List[String], greaterLength: String => Boolean, concat: String => String): List[String] = {
    if (list.isEmpty) {
      List()
    } else {
      val rest = filterAndMap(list.tail, greaterLength, concat)

      if (greaterLength(list.head)) {
        concat(list.head) :: rest
      } else {
        rest
      }
    }
  }

  def greaterLength(string: String): Boolean = {
    if (string.length >= 6) {
      true
    } else {
      false
    }
  }

  /** concat
   * for this function, I didn't know whether I should concatenate with
   * the length of the word "string" (so 6 all the time) or with the length of the string itself
   * so, I assumed it's the length of the string itself
   * */

  def concat(string: String): String = {
    string + string.length.toString
  }


  //////////////////////////////// E X E R C I S E  3 ////////////////////////////////

  /** listTransformation
   * the function takes 2 undeclared types A and B so that they can be versatile
   * then it uses recursion to process the list similar to the two previous exercises
   * the functions for the two examples are pretty self-explanatory
   * */

  def listTransformation[A, B](list: List[A], transformFunc: A => B): List[B] = {
    if (list.isEmpty) {
      List()
    } else {
      val rest = listTransformation(list.tail, transformFunc)
      transformFunc(list.head) :: rest
    }
  }

  // Example 1
  def stringToLength(string: String): Int = {
    string.length
  }

  // Example 2
  def doubleValue(n: Int): Int = {
    n * 2
  }


  //////////////////////////////// E X E R C I S E  4 ////////////////////////////////

  def curriedFunc(x: Int)(y: Int)(z: Int): Int = {
    x * y * z
  }

  /** partiallyAppFunc
   * I chose 5 as the fixed constant
   * */
  def partiallyAppFunc(a: Int, b: Int): Int = {
    curriedFunc(a)(b)(5)
  }


  //////////////////////////////// M A I N ////////////////////////////////

  def main(args: Array[String]): Unit = {
    // EX 1
    val list1 = List(2, 3, 5, 7, 14, 32)
    val newList1 = operateOnList(list1, oddToEven)

    println("Exercise 1:")
    println(newList1) // it should print 2, 4, 6, 8, 14, 32


    // EX 2
    val list2 = List("star", "asteroid", "planet", "matter", "nova", "blackhole")
    val newList2 = filterAndMap(list2, greaterLength, concat)

    println("\nExercise 2:")
    println(newList2)  // it should print asteroid8, planet6, matter6, blackhole9


    // EX 3
    val list31 = List("five", "two", "eight", "four", "nine", "one")
    val list32 = List(5, 2, 8, 4, 9, 1)

    val newList31 = listTransformation(list31, stringToLength)
    val newList32 = listTransformation(list32, doubleValue)
    val newList33 = listTransformation(list2, concat)

    println("\nExercise 3 Example 1:")
    println(newList31) // it should print 4, 3, 5, 4, 4, 3
    println("\nExercise 3 Example 2:")
    println(newList32) // it should print 10, 4, 16, 8, 18, 2
    println("\nExercise 3 Example 3:")
    println(newList33) // it should print star4, asteroid8, planet6, matter6, nova4, blackhole9


    // EX 4
    val curry1 = curriedFunc(2)(3)(5) // 2 * 3 * 5 = 6 * 5 = 30
    val curry2 = curriedFunc(8)(2)(4) // 8 * 2 * 4 = 16 * 4 = 64
    val curry3 = curriedFunc(0)(7)(8) // 0 * 7 * 8 = 0 * 56 = 0

    val part1 = partiallyAppFunc(2, 3) // 2 * 3 * 5 = 6 * 5 = 30
    val part2 = partiallyAppFunc(8, 2) // 8 * 2 * 5 = 16 * 5 = 80
    val part3 = partiallyAppFunc(0, 7) // 0 * 7 * 5 = 0 * 35 = 0

    println("\nExercise 4 Example 1:")
    println(s"Same parameters, same result: $curry1, $part1") // it should print 30 and 30
    println("\nExercise 4 Example 2:")
    println(s"Same first two parameters, different fixed value in partial, different result : $curry2, $part2") // it should print 64 and 80
    println("\nExercise 4 Example 3:")
    println(s"Same first two parameters, different fixed value in partial, same result because of 0: $curry3, $part3") // it should print 0 and 0
  }
}

