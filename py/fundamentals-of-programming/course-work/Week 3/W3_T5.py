"""
The program asks for a number, then tells the corresponding grade.

"""

mimi = float(input("Enter your number of points:\n"))

if mimi >= 0 and mimi <= 49:
    print("Your grade is: 0")
elif mimi<=59:
    print("Your grade is: 1")
elif mimi<=69:
    print("Your grade is: 2")
elif mimi<=79:
    print("Your grade is: 3")
elif mimi<=89:
    print("Your grade is: 4")
elif mimi<=100:
    print("Your grade is: 5")