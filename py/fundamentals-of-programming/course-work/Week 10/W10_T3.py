"""
The program asks for two numbers, attempts to divide the first by the second, and displays the result.

"""

the_first_str = input("Enter the first number:\n")
the_second_str = input("Enter the second number:\n")

while True:
    try:
        the_first = float(the_first_str)
        the_second = float(the_second_str)
        the_result = round((the_first/the_second),8)
        if float(the_first) == the_first and float(the_second)== the_second and the_second != 0:
            print(f"The result of {the_first} / {the_second} is {the_result}")
            break
    except ZeroDivisionError:
        print("You cannot divide by zero")
        break
    except ValueError:
        print("You must enter valid numbers")
        break