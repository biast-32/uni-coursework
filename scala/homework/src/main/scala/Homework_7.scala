// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 6

package homework.src.main.scala

object Homework_7 extends App {

  //////////////////////////////// T A S K  1 ////////////////////////////////

  /**
   * the wrapper function, sumList, takes the list and returns the sum
   * it contains the go function and calls the go function with the list and 0
   * * 0 being the initial value of the sum
   * then, the go function takes two parameters
   * * the remaining part of the list
   * * and an accumulator where the sum is stored
   * * if the rest of the list is empty, the accumulator (sum) is returned
   * * else the go function is called with the rest of the rest of the list
   * ** and with the value obtained from adding the head of the rest of the list to the accumulator (sum)
   */

  def sumList(list: List[Int]): Int = {
    @annotation.tailrec
    def go(restList: List[Int], acc: Int): Int =
      if(restList.isEmpty) acc
      else go(restList.tail, restList.head + acc)
    go(list, 0)
  }

  println("\nTask 1\n")
  val listTask1 = List(5, 2, 8, 4 ,9, 1)
  println(sumList(listTask1))


  //////////////////////////////// T A S K  2 ////////////////////////////////

  /**
   * the function returns None if "error" exists in the list
   * and returns Some with all elements of the list concatenated
   */

  def concatUnlessError(list: List[String]): Option[String] = {
    if (list.exists(str => str.contains("error"))) {
      None
    } else {
      Some(list.mkString(""))
    }
  }

  println("\nTask 2\n")
  val list1Task2 = List("error", "list", "scala", "computer", "sushi")
  val list2Task2 = List("list", "of", "strings", "sushi")
  println(concatUnlessError(list1Task2))
  println(concatUnlessError(list2Task2))


  //////////////////////////////// T A S K  3 ////////////////////////////////

  /**
   * At first, I found functional programming a bit confusing, however, with each exercise, I started to notice the advantages:
   * It often takes fewer lines of code to accomplish the same tasks, and the code is easy to understand when revisiting it.
   * It is less likely to get bugs in the code such as unexpected results at runtime, so FP really helped with predictability.
   * While confusing at first, using only recursion actually proved to make me less prone to getting tangled in loops and nesting them.
   * Recursion also promoted my thinking, code reusability, and really understanding what is going on in the code.
   * */

}