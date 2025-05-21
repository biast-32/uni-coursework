package homework.src.main.scala

object Exam_Prep_Theory {
/*
  // define main
  def main(args: Array[String]): Unit = {

    // printing
    println("Good morning, sunshine! The earth says hello!")

    // Pure function
    // Functional programming is defined by pure functions
    // Functions have no side effects (do not make modifications)
    def add(a: Int, b: Int): Int = a + b

    // List creation
    val the_int_list = List(1, 2, 3)
    val the_string_list = List("One", "Two", "Three")
    val the_made_list = "Fli" :: "Fla" :: "Flo" :: Nil

    // List operations
    val head = the_int_list.head // first element
    val tail = the_int_list.tail // all elements - head
    val last = the_int_list.last // last element
    val init = the_int_list.init // all elements - last

    val reversed = the_int_list.reverse
    val length = the_int_list.length
    val concat = the_int_list ++ the_string_list

    // Higher order functions
    // Functions that take other functions as parameters
    def applyTwice(f: Int => Int, x: Int): Int = f(f(x))
    val use_applyTwice = applyTwice(x => x * 2, 3)

    val the_list = List(1,2,3)

    // Map
    val doubled = the_list.map(x => x * 2)

    // Filter
    val evens = the_list.filter(x => x % 2 == 0)

    // Fold
    val sum = the_list.foldLeft(0)((total, x) => total + x)

    // Currying
    // partially applied functions
    def curryAdd(a:Int)(b:Int): Int = a + b
    val use_curryAdd = curryAdd(2)_ // partially applied function
    use_curryAdd(3) // returns 5

    // Option Type (Error handling)
    def safeDevide(a: Int, b:Int): Option[Int] = {
      if (b == 0){
        None
      } else {
        Some(a / b)
      }
    }

    val result = safeDevide(10, 2) match {
      case Some(value) => println(s"Result is $value")
      case None => println("Bai iesti prost?! Bai iesti nebun?!")
    }

    // Pattern matching
    val x: Any = "zavalaidanga"

    x match {
      case s: String => println(s"It's a string: $s")
      case i: Int => println(s"It is an int: $i")
      case _ => println("Um... Idk")
    }

    // Pattern matching with case classes
    case class Person(name: String, age: Int)
    val d = Person("Dorel", 48)

    d match {
      case Person(n, a) if (a > 18) => println(s"$n can drink")
      case Person(n, _) => println(s"$n cannot drink")
    }

    // Tail Recursion
    import scala.annotation.tailrec

    def factorial(n:Int): Int = {
      @tailrec
      def loop(acc: Int, n: Int): Int = {
        if (n <= 0 ) acc
        else loop(acc * n, n - 1)
      }
      loop(1, n)
    }

    // Variance and Type parameters
    class Box[+T](val item: T) // Covariant (+)
    class Container[-T] // Contravariant (-)

    // Upper and lower bounds
    class Queue[+T] {
      def enqueue[U >: T](x: U): Queue[U] = new Queue(x, head :: tail)
    }

    // foreach, map, flatmap, filter, foldLeft, mkString, getOrElse, match
  }
*/
}
