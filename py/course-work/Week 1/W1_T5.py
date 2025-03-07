
"""
The program asks for two numbers, then performs division with remainder and prints the result.

"""

a = int(input("Give the first integer: "))
b = int(input("Give the second integer: "))

print("Number " + str(b) + " goes into number " + str(a) + " "+str(round(a / b)) + " times")
print("The remainder is" + " " + str(a % b))