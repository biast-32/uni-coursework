"""
The program defines a Person class, creates instances of people, and allows them to introduce themselves and celebrate their birthday.

"""

#Ex4.py
from person import Person
p1 = Person("Valtteri",34)
p2 = Person("Kimi",44)
p1.introduce()
p2.introduce()
p2.celebrate_birthday()
p2.introduce()
