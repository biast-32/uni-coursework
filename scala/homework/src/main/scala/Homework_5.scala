// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 5

package homework.src.main.scala

object Homework_5 extends App{

  //////////////////////////////// T A S K  1 ////////////////////////////////

  /**
   * we create a class that holds the list of numbers
   * it takes any type of parameter that is double or a subtype of it
   * * so, it takes double, float, long, int, short, byte
   * the class has the function avg which returns a double
   * * this is because the average is most of the time a double, not an integer
   * * each element is converted to string and then to double to avoid issues
   */

  case class NumList[+A](list: List[A]) {
    def avg(): Double = {
      val sum = list.foldLeft(0.0)((t, e) => t + e.toString.toDouble)
      sum / list.length
    }
  }

  println("\nTask 1\n")
  val listDTask1 = NumList(List(3.20, 6.44, 8.02)) // example with doubles
  val listFTask1 = NumList(List(-2.5, 4.2, 7.5)) // example with floats
  val listITask1 = NumList(List(4, 5, 10)) // example with ints

  println(listDTask1.avg()) // should print 5.8866...
  println(listFTask1.avg()) // should print 3.0666...
  println(listITask1.avg()) // should print 6.3333...


//////////////////////////////// T A S K  2 ////////////////////////////////

  /**
   * first, we create the base class, animal
   * * I had to declare it as abstract, otherwise an error was thrown
   * then, the two derived classes, bird and mammal
   * * each has the makeSound function that returns the respective sound
   * then, the makeAllSounds function takes a list of animals
   * * it can be a list of strings or any subtype of string
   * * and it returns a list of strings with the sounds mapped for each animal
   * * the function calls the makeSound() function for any type of animal, hence _.makeSound()
   */

  abstract class Animal(val name: String) {
    def makeSound(): String
  }

  class Bird(_name: String) extends Animal(_name) {
    def makeSound(): String = "bird noise"
  }

  class Mammal(_name: String) extends Animal(_name) {
    def makeSound(): String = "mammal noise"
  }

  def makeAllSounds[A <: Animal](animals: List[A]): List[String] = {
    animals.map(_.makeSound())
  }

  println("\nTask 2\n")
  val birdsTask2 = List(new Bird("Crow"), new Bird("Seagull"), new Bird("Shoebill"))
  val mammalsTask2 = List(new Mammal("Hyena"), new Mammal("Platypus"), new Mammal("Orca"))

  println(makeAllSounds(birdsTask2)) // should print "bird noise", "bird noise", "bird noise"
  println(makeAllSounds(mammalsTask2)) // should print "mammal noise", "mammal noise", "mammal noise"


//////////////////////////////// T A S K  3 ////////////////////////////////

  /**
   * first, we create the typeclass, collection
   * * I had to declare it as abstract, otherwise an error was thrown
   * then, derived classes for int, double and string
   * * the sort function uses Ordering (found in scala documentation)
   * * if the list has 1 or no elements, it is simply returned
   * * otherwise, the min of the list is found
   * * then the sorting is done for the rest of the list using recursion
   * * the min and the sorted rest of the list are then put together
   */


  abstract class collection[A] {
    def sort(list: List[A])(implicit ord: Ordering[A]): List[A]
  }

  class intCollection extends collection[Int] {
    def sort(list: List[Int])(implicit ord: Ordering[Int]): List[Int] = {
      if (list.length <= 1) {
        list
      } else {
        val min = list.min(ord)
        val rest = list.filter(_ != min)
        min :: sort(rest)
      }
    }
  }

  class doubleCollection extends collection[Double] {
    def sort(list: List[Double])(implicit ord: Ordering[Double]): List[Double] = {
      if (list.length <= 1) {
        list
      } else {
        val min = list.min(ord)
        val rest = list.filter(_ != min)
        min :: sort(rest)
      }
    }
  }

  class stringCollection extends collection[String] {
    def sort(list: List[String])(implicit ord: Ordering[String]): List[String] = {
      if (list.length <= 1) {
        list
      } else {
        val min = list.min(ord)
        val rest = list.filter(_ != min)
        min :: sort(rest)
      }
    }
  }

  println("\nTask 3\n")
  val intListTask3 = List(5, 2, 8, 4, 9, 1)
  val doubleListTask3 = List(3.14, 9.81, 6.022)
  val stringListTask3 = List("Pi", "Gravity", "Avogadro", "Time")

  val intCollectionTask3 = new intCollection
  val doubleCollectionTask3 = new doubleCollection
  val stringCollectionTask3 = new stringCollection

  val sortedIntTask3 = intCollectionTask3.sort(intListTask3)
  val sortedDoubleTask3 = doubleCollectionTask3.sort(doubleListTask3)
  val sortedStringTask3 = stringCollectionTask3.sort(stringListTask3)

  println(sortedIntTask3) // should print 1, 2, 4, 5, 8, 9
  println(sortedDoubleTask3) // should print 3.14, 6.022, 9.81
  println(sortedStringTask3) // should print Avogadro, Gravity, Pi, Time


  //////////////////////////////// T A S K  4 ////////////////////////////////

  /**
   * the function tries to match the string to the following cases:
   * * if the string is empty, then it returns true
   * * if the string is anything with the length of 1 ( one letter), returns true
   * * if the string is anything and the first and last letter are the same
   * ** then it uses recursion and calls itself on the string without the first and last letters
   * * the default case returns false
   * ** so if the string is not empty, is not a single letter, nor the first and last letter match
   */

  def isPalindrome(str: String): Boolean = str match{
    case "" => true
    case _ if (str.length == 1) => true
    case _ if (str.head == str.last) => isPalindrome(str.tail.init)
    case _ => false
  }

  println("\nTask 4\n")
  println(isPalindrome("rotator")) // should print true
  println(isPalindrome("scala")) // should print false
  println(isPalindrome("a")) // should print true


}
