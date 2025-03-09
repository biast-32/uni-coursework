"""
The program asks for a float and a non-negative integer, then calculates the float raised to the power of the integer.

"""

def power(x, n):
    if n == 0:
        return 1
    else:
        return x * power(x, n-1)

x = float(input("Give a float x:\n"))
n = int(input("Give a non-negative integer n:\n"))
print(f"{x} power to {n} is {power(x, n)}")
