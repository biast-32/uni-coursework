"""
The program asks for a positive integer and prints the even numbers smaller than or equal to it.

"""

spencer = int(input("Enter a positive integer:\n"))
i = 1

if spencer <= 0:
 print(f"{spencer} is not positive")
elif spencer % 2 == 0:
 for i in range(2, spencer + 2, 2):
  print(str(i) + "...", end="")
elif spencer % 2 != 0:
 for i in range(2, spencer, 2):
  print(str(i) + "...", end="")