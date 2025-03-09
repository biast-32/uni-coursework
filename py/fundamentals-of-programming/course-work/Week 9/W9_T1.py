"""
The program asks the user for the number of employees they want. After that, it asks for employee data (name, workspace, age), stores them in a list of directories, and prints the information.

"""

def employee_dictionary(dict_list):
    how_many = int(input("How many employees do you want to add?\n"))
    k = 1
    while k <= how_many:
        the_name = input("Enter worker's name:\n")
        the_workplace = input("Enter worker's workplace:\n")
        the_age = input("Enter worker's age:\n")
        the_dict = {
            "Name":the_name,
            "Workplace":the_workplace,
            "Age":the_age
            }
        dict_list.append(the_dict)
        k = k+1

def print_work_info(dict_list):
    print("List of Employees:")
    for employee in dict_list:
        print(f"Name: {employee['Name']}, Workplace: {employee['Workplace']}, Age: {employee['Age']}")

if __name__ == "__main__":
    my_list = []
    employee_dictionary(my_list)
    print_work_info(my_list)
