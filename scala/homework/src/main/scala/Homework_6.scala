// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 6

package homework.src.main.scala

object Homework_6 extends App{

  //////////////////////////////// T A S K  1 ////////////////////////////////

  /**
   * the function maps each element in the list
   * to either Right, the number itself, if it is prime
   * or to Left, an error message, if it is not
   */

  def lookingForPrimes(list: List[Int]): List[Either[String, Int]] = {
    list.map {
      n =>
        if (isPrime(n) == true){
          Right(n)
        } else {
          Left (s"$n is not a prime number =<")
        }
    }
  }

  /**
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

  println("\nTask 1\n")
  val listTask1 = List(5, 2, 8, 4, 9, 1)
  val resultTask1 = lookingForPrimes(listTask1)

  resultTask1.foreach{
    case Right(n) => println(s"$n is a prime number =D")
    case Left(error) => println(error)
  }


  //////////////////////////////// T A S K  2 ////////////////////////////////

  /**
   * first, we create the student case class with name, age and grade
   * then, a list of students, where some do not have a grade
   * then, using flatMap, we get the grades from the list of students
   * using filter, we get rid of the grades that were equal to None
   * then, we put the declared grades in a list of ints
   * lastly, we compute the average using sum and length built-in functions
   */

  case class Student(name: String, age: Int, grade: Option[Int])

  val listTask2 = List(Student("Neon", 20, Some(5)),
                        Student("Xenon", 24, Some(4)),
                        Student("Carbon", 19, None),
                        Student("Nitrogen", 22, None),
                        Student("Helium", 21, Some(3)))

  val rawTask2: List[Option[Int]] = listTask2.flatMap(s => List(s.grade))

  val filteredTask2: List[Option[Int]] = rawTask2.filter(g => g != None)

  val gradesTask2: List[Int] = filteredTask2.map(_.get)

  val average: Double = gradesTask2.sum.toDouble / gradesTask2.length.toDouble

  println("\nTask 2\n")
  println(s"The average is $average") // should be 4.0 ((5 + 4 + 3) / 3 = 12 / 3 = 4)


  //////////////////////////////// T A S K  3 ////////////////////////////////

  /**
   * the function returns a string if the sencond (y) int is 0
   * and it returns the result of division (as an int) if y is not 0
   */

  def division(x: Int, y: Int): Either[String, Int] = {
    if (y == 0) {
      Left("Attempted division by 0 =<")
    } else {
      Right(x / y)
    }
  }

  println("\nTask 3\n")

  val tuplesTask3 = List((5,2), (8,4), (9,0), (0,1))

  /**
   * the function takes a list of tuples and a function that takes 2 ints and returns either a string or an int
   * it maps each tuple its result from the function
   */

  def applyDiv(list: List[(Int, Int)], function: (Int, Int) => Either[String, Int]) = {
    list.map{
      case (x,y) => function(x,y)
    }
  }

  /**
   * we apply the division for each tuple in the list using the HOF applyDiv
   * then, we separate left values from right ones using partition
   * using filter, we get the right values, then put them in a list of ints
   * then, we compute the sum using foldLeft
   */

  val rawTask3: List[Either[String, Int]] = applyDiv(tuplesTask3, division)

  val (leftsTask3, rightsTask3) = rawTask3.partition(_.isLeft)

  val filteredTask3: List[Either[String, Int]] = rightsTask3.filter(_.isRight)

  val valuesTask3: List[Int] = filteredTask3.map {
    case Right(value) =>  value
  }

  val sumTask3 = valuesTask3.foldLeft(0)((t, e) => t + e.toString.toInt)

  println(s"The sum of rights is $sumTask3") // should be 4 (5/2 + 8/4 + 0/1 = 2 + 2 + 0 = 4)


  //////////////////////////////// T A S K  4 ////////////////////////////////

  /**
   * the function returns None if "error" exists in the list
   * and returns Some with all elements of the list concatenated
   */

  def check(list: List[String]): Option[String] = {
    if (list.exists(str => str.contains("error"))) {
      None
    } else {
     Some(list.mkString(""))
  }
  }

  println("\nTask 4\n")

  def applyCheck(list:List[String], function: List[String] => Option[String]): Option[String] = {
    function(list)
  }

  /**
   * we take 2 example lists, one with "error" in it, and one without
   * then we use the HOF to apply the checking function on each list
   * and match the result with the appropriate response
   */

  val list1Task4 = List("glitch", "error", "anomaly")
  val list2Task4 = List("post", "card", "box")

  val result1Task4 = applyCheck(list1Task4, check)
  val result2Task4 = applyCheck(list2Task4, check)

  result1Task4 match {
    case Some(value) => println(s"$value")
    case None => println("The list contains error =<")
  }

  result2Task4 match {
    case Some(value) => println(s"$value")
    case None => println("The list contains error =<")
  }

}

