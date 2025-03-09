"""
The program reads data from the titanic.csv file and prints:
>> the number of male passengers
>> the number of female passengers
>> the average age of the passengers
>> the age of the oldest passenger

"""

#import necessary module(s)
import csv

#set every counter to 0
the_male_nr = 0
the_female_nr = 0
the_total_age = 0
the_passengers_with_data_nr = 0
the_oldest_age = 0

#open the file and read it
with open('titanic.csv', 'r')as the_file:

    #read the csv file
    the_csv = csv.DictReader(the_file)

    #extract sex and age
    for the_line in the_csv:
        the_sex = the_line['Sex']
        the_age = the_line['Age']

        #check male
        if the_sex == 'male':
            the_male_nr = the_male_nr + 1

            #check female
        if the_sex == 'female':
            the_female_nr = the_female_nr + 1

        #add the ages and count how many passengers have age data
        if the_age != '' and the_age.isnumeric():
            the_age = int(the_age)
            the_total_age = the_total_age + the_age
            the_passengers_with_data_nr = the_passengers_with_data_nr + 1

            #check the oldest
            if the_age > the_oldest_age:
                the_oldest_age = the_age

#calculate the average age
the_avrg_age = round(the_total_age / the_passengers_with_data_nr)

#print
print(f"The number of male passengers: {the_male_nr}")
print(f"The number of female passengers: {the_female_nr}")
print(f"The average age of passengers: {the_avrg_age}")
print(f"The age of the oldest passenger: {the_oldest_age}")