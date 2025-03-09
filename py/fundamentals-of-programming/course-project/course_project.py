#########################################################################
# CT60A0203 Introduction to Programming - Online teaching
# Name: Bianca-Ioana Stefanescu
# Date: 13.11-2023
# By submitting this work, I certify that
#
# I wrote all the code myself and have not shared it with anyone else
# Although I used the internet to search for solutions (e.g., Stack Exchange, GeeksforGeeks, and Programiz), I wrote the code independently.
# I asked ChatGPT and used the answer as a reference, but I wrote the code by myself.
#
#########################################################################


# UPDATE MARCH 2025 - improve looping and error handling


#import module(s) and class(es)
from datetime import datetime
import random





#_1.0_add_student
def add_student():
    #ask the first and last name
    while True:
        print("Names should contain only letters and start with capital letters.")
        the_first_name = input("Enter the first name of the student:\n")
        the_last_name = input("Enter the last name of the student:\n")
        #check if the names are only letters and start with capitals
        if the_first_name.isalpha() and the_last_name.isalpha() and the_first_name[0].isupper() and the_last_name[0].isupper():
            #major selection
            print("Select student's major:")
            print("\t\tCE: Computational Engineering")
            print("\t\tEE: Electrical Engineering")
            print("\t\tET: Energy Technology")
            print("\t\tME: Mechanical Engineering")
            print("\t\tSE: Software Engineering")
            while True:
                #ask the major
                the_choice = input("What is your selection?\n")
                #check if the major is correct
                if the_choice in ["CE","EE","ET","ME","SE"]:
                    print("Student added successfully!\n")
                    #generate ID
                    the_used_IDs = []
                    with open('students.txt','r') as the_file:
                        for the_line in the_file:
                            the_number = int(the_line.strip().split(",")[0])
                            the_used_IDs.append(the_number)
                    while True:
                        the_ID=random.randint(10000,99999)
                        if the_ID not in the_used_IDs:
                            break
                    #generate email
                    the_email = (f"{the_first_name.lower()}.{the_last_name.lower()}@lut.fi")
                    #add data to the file
                    with open('students.txt', 'a') as the_file:
                        the_file.write(f"{the_ID},{the_first_name},{the_last_name},{datetime.now().year},{the_choice},{the_email}\n")
                    break
                #in case the major is not right
                else:
                    print("Invalid major selection. Try again!")
                    continue
        #in case the name is not right
        else:
            continue




        
#_2.0_search student
def search_student():
    while True:
        #ask input for search
        the_search = input("Give at least 3 characters of the student's first or last name:\n")
        #check if the search is valid
        if len(the_search) < 3 or not the_search.strip():
            continue
        #open and read the file
        with open('students.txt', 'r') as the_file:
            #take a counter to count the matches found
            k = 0
            print("Matching students:")
            #split the content at ","
            for the_line in the_file:
                the_id = the_line.strip().split(",")[0]
                the_first_name = the_line.strip().split(",")[1]
                the_last_name = the_line.strip().split(",")[2]
                #check if there is a match
                if the_search.lower() in the_first_name.lower() or the_search.lower() in the_last_name.lower():
                    #count the match
                    k = k + 1
                    print(f"ID: {the_id}, First name: {the_first_name}, Last name: {the_last_name}")
            
            #in case there is no match
            if k == 0:
                break
            break




#_3.0_search course
def search_course():
    while True:
        #ask input for search
        the_search = input("Give at least 3 characters of the name of the course or the teacher:\n")
        #check if the search is valid
        if len(the_search) < 3 or not the_search.strip():
            print("Invalid input. Try again!")
            continue
        #open and read the file
        with open('courses.txt','r') as the_file:
            #take a counter to count the matches found
            k = 0
            #split the content at ","
            for the_line in the_file:
                the_code = the_line.strip().split(",")[0]
                the_name = the_line.strip().split(",")[1]
                the_teachers = the_line.strip().split(",",3)[3]
                the_list = the_teachers.split(",")
                #check if there is a match
                if the_search.lower() in the_teachers.lower() or the_search.lower() in the_name.lower():
                    print(f"ID: {the_code}, Name: {the_name}, Teacher(s): {the_teachers}")
                    #count the match
                    k = k + 1
            #in case there is no match        
            if k == 0:
                break




                
#_4.0_add course completion
def add_course_completion():




    
    while True:
        #ask the course ID
        the_course_ID = input("Give the course ID:\n")
        #open and read the file
        with open('courses.txt', 'r') as the_file:
            #split the content at ","
            for the_line in the_file:
                the_code = the_line.strip().split(",")[0]
                #check if the course exists
                if the_course_ID == the_code:




                    
                    while True:
                        #ask the student ID
                        the_student_ID = input("Give the student ID:\n")
                        #open and read the file
                        with open('students.txt', 'r') as the_other_file:
                            #split the content at ","
                            for the_other_line in the_other_file:
                                the_ID = the_other_line.strip().split(",")[0]
                                #check if the student exists
                                if the_student_ID == the_ID:




                                    
                                    while True:
                                        #ask the grade
                                        the_grade = int(input("Give the grade:\n"))
                                        #check if the grade is valid
                                        if 1 <= the_grade <= 5:
                                            #open and read file
                                            with open('passed.txt', 'r+') as the_other_other_file:
                                                #go through the lines
                                                the_other_other_lines = the_other_other_file.readlines()
                                                #go through the elements
                                                for the_element, the_other_other_line in enumerate(the_other_other_lines):
                                                    #split the content at ","
                                                    the_the_cID, the_the_sID, the_the_date, the_the_grade = the_other_other_line.strip().split(",")
                                                    the_the_grade = int(the_the_grade)
                                                    #check if the student has passed the course
                                                    if the_course_ID == the_the_cID and the_student_ID == the_the_sID:
                                                        #in case the grade is not bigger
                                                        if the_the_grade < the_grade:




                                                            
                                                            #ask date
                                                            the_date = check_date_validity()
                                                            the_existing_date = datetime.strptime(the_the_date, "%d/%m/%Y")
                                                            the_new_date = datetime.strptime(the_date, "%d/%m/%Y")
                                                            the_difference = (the_new_date - the_existing_date).days
                                                            #in case the date is not within 30 days
                                                            if int(the_difference) > 30:
                                                                print("Input date is older than 30 days. Contact \"opinto\".")
                                                                return
                                                            #in case the date is within 30 days
                                                            else:
                                                                #update data
                                                                the_other_other_lines[the_element] = f"{the_course_ID},{the_student_ID},{the_date},{the_grade}\n"
                                                                #open file and enable writing
                                                                with open('passed.txt', 'w') as the_write_file:
                                                                    #write new data
                                                                    the_write_file.writelines(the_other_other_lines)
                                                                print("Input date is valid.\nRecord added!")
                                                                return
                                                        else:
                                                            print(f"Student has passed the course earlier with {the_the_grade}")
                                                            return




                                                            
                                                    #in case the student has not passed the course
                                                    elif the_element == len(the_other_other_lines) - 1:
                                                        the_date = check_date_validity()
                                                        the_difference = check_date_distance(the_date)
                                                        if int(the_difference) > 30:
                                                            print("Input date is older than 30 days. Contact \"opinto\".")
                                                            return
                                                        else:
                                                            the_other_other_file.write(f"{the_course_ID},{the_student_ID},{the_date},{the_grade}\n")
                                                            print("Input date is valid.\nRecord added!")
                                                            return




                                                        
                                        #in case the grade is not correct                
                                        else:
                                            print("Grade is not a correct grade.")
                                    break
                        break
                    break




#_4.1_add course completion - check the format of the date                
def check_date_format(the_datestr, the_format = "%d/%m/%Y"):
    #check if the format is ok
    try:
        datetime.strptime(the_datestr, the_format)
        return True
    #in case the format is not ok
    except ValueError:
        return False





#_4.2_add course completion - check the validity of the date
def check_date_validity():
    while True:
        #ask date
        the_datestr = input("Enter a date (DD/MM/YYYY):\n")
        #check format
        if check_date_format(the_datestr):
            #convert to datetime object
            the_date = datetime.strptime(the_datestr, "%d/%m/%Y")
            # check if the date is not later than today
            if the_date <= datetime.now():
                return the_datestr
            #in case the date is later than today
            else:
                print("Input date is later than today. Try again!")
        #in case the format is not good or the date is not valid
        else:
            print("Invalid date format. Use DD/MM/YYYY. Try again!")




#_4.3_add course completion - check the distance of the date            
def check_date_distance(the_date):
    the_present = datetime.now()
    the_diff = abs(the_date - the_present)
    the_days = the_diff.days
    return the_days





#_5.0_create and show record
def create_and_show_record(the_s_id):
    #open and read files
    with open('students.txt', 'r') as the_s_file, open('courses.txt', 'r') as the_c_file, open('passed.txt', 'r') as the_p_file:




        
        #personal information part
        the_data = None
        #split the content at ","
        for the_s_line in the_s_file:
            the_s_line_data = the_s_line.strip().split(",")
            #extract information
            if the_s_line_data[0] == the_s_id:
                the_data = {
                    'Student ID' : the_s_line_data[0],
                    'Name' : f"{the_s_line_data[2]}, {the_s_line_data[1]}",
                    'Starting year' : the_s_line_data[3],
                    'Major' : the_s_line_data[4],
                    'Email' : the_s_line_data[5]
                    }
                break




            
        #passed courses part
        the_passed_courses = []
        #take a counter to count the passed courses
        the_courses_nr = 0
        #split the content at ","
        for the_p_line in the_p_file:
            the_p_line_data = the_p_line.strip().split(",")
            #extract information
            if the_p_line_data[1] == the_s_id:
                the_passed_courses.append({
                    'Course ID' : the_p_line_data[0],
                    'Date' : the_p_line_data[2],
                    'Grade' : the_p_line_data[3]
                    })
                the_courses_nr = the_courses_nr + 1




                
        #display personal information part
        if the_data:
            print(f"\nStudent ID: {the_data['Student ID']}")
            print(f"Name: {the_data['Name']}")
            print(f"Starting year: {the_data['Starting year']}")
            print(f"Major: {the_data['Major']}")
            print(f"Email: {the_data['Email']}")
            #split content at ","
            the_c_data = [the_the_line.strip().split(",") for the_the_line in the_c_file]
            # take counter to count the credits
            the_total_credits = 0
            # take counter to count the points
            the_grade_points = 0
            print("\nPassed courses:\n")
            #extract information
            for the_passed_course in the_passed_courses:
                for the_c_line_data in the_c_data:
                    if str(the_c_line_data[0]) == the_passed_course['Course ID']:
                        print(f"Course ID: {the_c_line_data[0]}, Name: {the_c_line_data[1]}, Credits: {the_c_line_data[2]}")
                        print(f"Date: {the_passed_course['Date']}, Teacher(s): {the_c_line_data[3]}, grade: {the_passed_course['Grade']}\n")
                        # count credits
                        the_total_credits += int(the_c_line_data[2])
                        # count points
                        the_grade_points += int(the_passed_course['Grade'])
        #check if there are passed courses
        if the_courses_nr > 0:
            the_average_grade = round(the_grade_points / the_courses_nr, 1)
            print(f"Total credits: {the_total_credits}, average grade: {the_average_grade}")
        #in case there are no passed courses
        else:
            print("No passed courses")





            
#_5.1_search and displey record
def search_and_display_record():
    while True:
        search_student()
        the_s_id = input("Enter the student ID:\n")
        create_and_show_record(the_s_id)
        break




    
#_X.X_create the menu
def main():
    while True:
        try:
            #display options
            print("You may select one of the following:\n")
            print("\t\t1) Add student\n")
            print("\t\t2) Search student\n")
            print("\t\t3) Search course\n")
            print("\t\t4) Add course completion\n")
            print("\t\t5) Show student's record\n")
            print("\t\t0) Exit\n")
            #ask for input
            the_choice = input("What is your selection?\n")
            #assign functions
            if the_choice == '1':
                add_student()
            elif the_choice == '2':
                search_student()
            elif the_choice == '3':
                search_course()
            elif the_choice == '4':
                add_course_completion()
            elif the_choice == '5':
                search_and_display_record()
            elif the_choice == '0':
                exit(0)
            #in case the input is not valid
            else:
                print("Invalid input.")
        except ValueError:
            print("Invalid input.")




#_X.0_call the main function
if __name__ == "__main__":
    main()
               
