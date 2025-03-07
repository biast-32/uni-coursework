"""
The program asks for three numbers (integers or floats), computes their sum and average, and then prints the results.

"""

print("This program calculates the average of the 3 numbers you enter.")
print("The numbers can be int's or float's")

a = float(input("Enter the first number:" + "\n"))
b = float(input("Enter the second number:" + "\n"))
c = float(input("Enter the third number:" + "\n"))

print("Sum of the numbers: " + str(round(a + b + c, 3)))
print("Average of the numbers (rounded to 3 decimal places): " + str(round((a + b + c) / 3, 3)))
print("Average of the numbers (rounded to the closest integer): " + str(round((a + b + c) / 3)))
print("Average of the numbers as an integer without the decimal part: " + str(int((a + b + c) / 3)))