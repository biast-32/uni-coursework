"""
The program asks for a non-negative integer n, then calculates and prints the sum of the sequence n + (n-2) + (n-4) + ... until the result is less than or equal to 0.

"""

def integer_sum(n):
    if n < 1:
        return 0
    else:
        return n + integer_sum(n - 2)

the_num = int(input("Give a non-negative integer n:\n"))
print (f"n + (n-2) + (n-4) + ... = {integer_sum(the_num)}")

