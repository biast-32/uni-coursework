"""
The program asks user for a datetime string and specifies the month, weekday, week, and day number.

"""

#import class
from datetime import datetime

#ask for input
date=input("Give a datetime string in format \"%Y/%m/%d %H:%M:%S\":\n")
the_date=datetime.strptime(date, "%Y/%m/%d %H:%M:%S")

#conversions
m=the_date.strftime('%B')
w=the_date.strftime('%A')
wnr=the_date.strftime('%W')
dnr=the_date.strftime('%j')

#printing
print(f"Month: {m}")
print(f"Weekday: {w}")
print(f"Week nr: {wnr}")
print(f"Day nr: {dnr}")
