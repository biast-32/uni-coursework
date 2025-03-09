"""
The program reads data from the students.json file and prints:
>> students who are 19 years old
>> students whose first name ends with "a"
>> students who study math

"""

#import module(s)
import json

#import data from the file
the_file = open("students.json", "r")
the_data = json.load(the_file)
the_file.close()

#(a)
print("Students who are 19 years old:")
for the_student in the_data:
    if the_student['age'] == 19:
        print(f"Student ID: {the_student['id']}, Name: {the_student['name']}, Age: {the_student['age']}")

#(b)
print("\nStudents whose name end with 'a':")
for the_student in the_data:
    the_name = the_student['name'].split()[0]
    if the_name[-1] == 'a':
        print(f"Student ID: {the_student['id']}, Name: {the_student['name']}")

#(c)
print("\nStudents who study math:")
for the_student in the_data:
    if 'Math' in the_student['courses']:
         print(f"Student ID: {the_student['id']}, Name: {the_student['name']}, Course: {the_student['courses']}")
