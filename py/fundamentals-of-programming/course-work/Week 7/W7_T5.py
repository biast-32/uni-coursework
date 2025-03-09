"""
The program asks the user for a source file name, reads its contents, and prints the second element of each line.

"""

za_csv=input("Give the name of the CSV file:\n")
with open(za_csv, 'r') as za_file:
        for za_line in za_file:
            za_elem=za_line.split(",")
            if len(za_elem) >= 2:
                print(za_elem[1].strip())
