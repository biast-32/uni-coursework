"""
The program asks the user for a file name, reads names from the file, sorts them alphabetically, and prints them.

"""

def print_names(file_name):
    with open(file_name, 'r') as file:
            za_names=[za_line.strip() for za_line in file.readlines()]
            za_names.sort()
            for za_name in za_names:
                print(za_name)
za_file=input("Give the name of the input file:\n")
print_names(za_file)
