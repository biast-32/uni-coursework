"""
The program checks whether a user-specified date (in YYYY-MM-DD format) is valid, considering leap years and different month lengths.

"""

#import module(s) or class(es)
from datetime import datetime
#ask for input
datestr=input("Enter a date in YYYY-MM-DD format:\n")
#try
try:
    date=datetime.strptime(datestr,"%d/%m/%Y")
    if date.year>=1 and 1<=date.month<=12 and 1<=date.day<=31:
        if date.month==2:
            if date.year%4==0 and date.year%100!=0 or date.year%400==0:
                if 1<=date.day<=29:
                    print(f"{datestr} is a valid date.")
                else:
                    print(f"{datestr} is not a valid date.")
            else:
                if 1<=date.day<=28:
                    print(f"{datestr} is a valid date.")
                else:
                    print(f"{datestr} is not a valid date.")
        else:
            if date.month in [4,6,9,11]:
                if 1<=date.day<=30:
                    print(f"{datestr} is a valid date.")
                else:
                    print(f"{datestr} is not a valid date.")
            else:
                if 1<=date.day<=31:
                    print(f"{datestr} is a valid date.")
                else:
                    print(f"{datestr} is not a valid date.")
#except
except ValueError:
    print(f"{datestr} is not a valid date.")
