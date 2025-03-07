"""
The program asks the user for two dates and computes the number of days between them.

"""

#import class
from datetime import datetime

#ask for the first date
d1=input("Enter the first date (DD.MM.YYYY):\n")
date1=datetime.strptime(d1,"%d.%m.%Y")

#ask for the second date
d2=input("Enter the second date (DD.MM.YYYY):\n")
date2=datetime.strptime(d2,"%d.%m.%Y")

#calculate the number of days between
diff=abs(date2-date1)
days=diff.days
print(f"The number of days between {d1} and {d2} is {days} days.")