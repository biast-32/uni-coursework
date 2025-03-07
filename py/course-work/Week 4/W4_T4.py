"""
The program asks for two numbers, doubles the first, and increases the second by 100 until either exceeds 1000.

"""

a = int(input("Enter a:\n"))
b = int(input("Enter b:\n"))

while a < 1000 and b < 1000:
    print("a: "+str(a)+" b: "+str(b))
    a = a * 2
    b = b + 100

if a >= 1000:
        print("a exceeded 1000")
if b >= 1000:
        print("b exceeded 1000")