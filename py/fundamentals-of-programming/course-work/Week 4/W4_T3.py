"""
The program asks for a string and tells how many vowels it contains.

"""

yanni = input("Enter a string:\n")
v = 0
for x in yanni:
    if x in "aeiouAEIOU":
        v = v + 1
print("Number of vowels is: " + str(v))