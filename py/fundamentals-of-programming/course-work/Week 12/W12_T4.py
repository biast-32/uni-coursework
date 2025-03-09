"""
The program asks for two positive integers, calculates their greatest common divisor (GCD) using recursion, and prints the result.

"""

def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

num_str = input("Give two positive integers separated by comma:\n")
a_str, b_str = num_str.split(",")
a = int(a_str)
b = int(b_str)
print(f"gcd({a},{b}) = {gcd(a, b)}")
