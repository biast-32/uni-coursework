"""
The program asks for a non-negative integer,then computes its factorial and prints the result.

"""

george = int(input("Enter a non-negative integer:\n"))

if george < 0:
    print("Error: Factorial is not defined for negative numbers")
else:
    if george == 0:
         print("Factorial of 0 is 1")
    else:
        i = george
        f = 1
        for i in range(george, 1, -1):
            f = f * i
        print("Factorial of " + str(george) + " is " + str(f))