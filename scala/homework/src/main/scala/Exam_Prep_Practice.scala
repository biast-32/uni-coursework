package homework.src.main.scala

object Exam_Prep_Practice extends App{

  // compute the sum of even numbers from a list
  def sum_1(list: List[Int]): Int = {
    if(list.isEmpty) {
      0
    } else {
      val curr = list.head
      val restSum = sum_1(list.tail)

      if (curr % 2 == 0) {
        curr + restSum
      } else {
        restSum
      }
    }
  }

    //Ex_1
    println("Ex_1")
    val list_1 = List(1, 2, 3, 4, 5, 6, 7, 8)
    val result_1 = sum_1(list_1)
    println(s"Sum is: $result_1")


}
