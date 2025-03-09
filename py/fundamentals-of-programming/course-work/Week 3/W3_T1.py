"""
The program asks for a year and tells whether it is a leap year or not.

"""

year = int(input("Enter a year:\n"))

if year % 4 != 0:
    print(str(year) + " is not a leap year.")
elif year % 100 == 0:
 if year % 400 != 0:
    print(str(year) + " is not a leap year.")
else:
     print(str(year) + " is a leap year.")