
"""
The program asks for the user's name, an integer, and a float, then computes the integer raised to the power of the float, prints the result, and displays a message using the user's name.

"""

n = input("Enter your name:" + '\n')
i = int(input("Enter an integer:" + '\n'))
f = float(input("Enter a float:" + '\n'))

print("Decimal"+" "+str(f) + " " + "to power" + " " + str(i) + " " + "is" + " "  + str(round((f ** i),2)))
print("Thank you for using the program "  + str(n) + "!")