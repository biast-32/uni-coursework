"""
The program asks for an integer, then for that many more integers, and computes their sum.

"""

def input_integer():
    the_int = input("Enter an integer:\n")
    while True:
        try:
            the_int = int(the_int)
            if int(the_int) == the_int:
                return the_int
        except ValueError:
            print("Invalid input. Please enter an integer.")
            the_int = input("Enter an integer:\n")

def main():
    the_int = input_integer()
    print(f"Now give {the_int} integers!")
    k = 0
    s = 0
    while k < int(the_int):
        k = k + 1
        the_num = input_integer()
        s = s + int(the_num)
    print(f"The sum of the entered integers is: {s}")

if __name__ == '__main__':
    main()
