// Name: Bianca-Ioana Stefanescu
// Student ID: 001512335

// Homework 4

import scala.io.Source // used in task 4 to read the file

object Homework_4 extends App {

  //////////////////////////////// T A S K  0 ////////////////////////////////

  println("Task 0:")
  val nums: List[Int] = List[Int](1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  println(nums) // should print (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  val squares: List[Int] = nums.map(n => n * n)
  println(squares) // should print (1, 4, 9, 16, 25, 36, 49, 64, 81, 100)

  val evenSquares: List[Int] = squares.filter(n => n % 2 == 0)
  println(evenSquares) // should print (4, 16, 36, 64, 100)

  val evenList: List[Int] = nums.filter(n => n % 2 == 0)
  val evenSet: Set[Int] = evenList.toSet
  println(evenSet) // should print (2, 4, 6, 8, 10)
  // here, when running, the order is not the same, but the elements are correct

  val sum = evenSet.foldLeft(0)((t, e) => t + e)
  println(sum)

  val squaresMap: Map[Int, Int] = nums.map(n => n -> (n * n)).toMap
  println(squaresMap)

  val squareEleven = squaresMap.getOrElse(11, 0)
  println(squareEleven)


  //////////////////////////////// T A S K  1 ////////////////////////////////

  /**
   * the function creates a new sequence where the uniques elements will be stored
   * then, for each element in the given sequence, it checks if it already exists in the new one
   * * if not, the element is added to the new sequence
   * * if it already exists, the function moves on to the next element
   * in the end, the new sequence is returned
   * */

  def removeDuplicates(seq: Seq[String]): Seq[String] = {
    var newSeq: Seq[String] = Seq()

    seq.foreach { i =>
      if (!newSeq.contains(i)) {
        newSeq = newSeq :+ i
      }
    }
    newSeq
  }

  // example usage
  println("\nTask 1:")
  val seqTask1: Seq[String] = Seq("hello", "world", "hello", "scala", "world")
  println(removeDuplicates(seqTask1)) // should print (hello, world, scala)


  //////////////////////////////// T A S K  2 ////////////////////////////////

  /**
   * the function creates a new set where the common elements will be stored
   * then, for each element in the first sequence, it checks if it also exists in the second one
   * * if it does, the element is added to the new set
   * * if not, the function moves on to the next element
   * in the end, the new set is returned
   * */

  def findCommonElements[A](set1: Set[A], set2: Set[A]): Set[A] = {
    var newSet: Set[A] = Set()

    set1.foreach { i => {
      if (set2.contains(i)) {
        newSet = newSet + i
      }
    }}
    newSet
  }

  // example usage
  println("\nTask 2:")
  val set1Task2: Set[Int] = Set(1, 2, 3, 4, 5)
  val set2Task2: Set[Int] = Set(3, 4, 5, 6, 7)
  println(findCommonElements(set1Task2, set2Task2)) // should print (3, 4, 5)
  // here, when running, it actually prints (5, 3, 4),
  // so the elements are not in order,
  // but they are correct and the task is fulfilled


  //////////////////////////////// T A S K  3 ////////////////////////////////

  /**
   * the function creates a new map initialized with the given map, which can be modified (keys can be deleted)
   * for each element in the list, it checks if the map contains a key identical ro the element
   * * if it does, the key is deleted from the new map
   * * if not, the function moves on to the next element in the list
   * in the end, the new map is returned
   * */

  def removeKeys[A, B](map: Map[A, B], list: List[A]): Map[A, B] = {
    var newMap: Map[A, B] = map

    list.foreach { key => {
      if (newMap.contains(key)) {
        newMap = newMap - key
      }
    }}
    newMap
  }

  // example usage
  println("\nTask 3:")
  val mapTask3 = Map("Tokyo" -> "Japan",
    "Canberra" -> "Australia",
    "Ottawa" -> "Canada",
    "Paris" -> "France",
    "Cairo" -> "Egypt",
    "Buenos Aires" -> "Argentina")
  val listTask3 = List("Ottawa", "Paris")
  println(removeKeys(mapTask3, listTask3)) // should print (Tokyo -> Japan, Canberra -> Australia, Cairo -> Egypt, Buenos Aires -> Argentina)
  // here, when running, it actually prints (Cairo -> Egypt, Canberra -> Australia, Tokyo -> Japan, Buenos Aires -> Argentina)
  // so the elements are not in order,
  // but they are correct and the task is fulfilled


  //////////////////////////////// T A S K  4 ////////////////////////////////

  /**
   * the function creates a new map where the words and their count will be stored
   * then, it tries to get the file from the name (assuming there are no issues with it)
   * and reads the lines
   * then, for each line in the file, it gets the words separated by white spaces
   * * for each word in the line
   * ** if it exists in the map, its count is increased by 1
   * ** if it doesn't, it is added to the map and its count is set to 0
   * at the end, the map is returned
   * and finally, the file is closed
   * */

  def occurrences(filename: String): Map[String, Int] = {
    var map: Map[String, Int] = Map()

    val file = Source.fromFile(filename)
    try {
      val lines = file.getLines()

      lines.foreach { line => {
        val words = line.split("\\s+")

        words.foreach { word => {
          map = map + (word -> (map.getOrElse(word, 0) + 1))
        }
        }
      }}
      map
    } finally {
      file.close()
    }
  }

  // example usage
  println("\nTask 4:")
  val filenameTask4 = "task4file.txt" //if it doesn't work, please try using the absolute path
  val mapTask4 = occurrences(filenameTask4)

  mapTask4.foreach { case (word, count) => {
    println(s"$word $count")
  }}


}