"""
The program asks for two matrices, then performs matrix addition and matrix multiplication.

"""

import numpy as np

the_matrix = []
the_other_matrix = []

the_row_nr = int(input("Enter the number of rows for the first matrix:\n"))
the_column_nr = int(input("Enter the number of columns for the first matrix:\n"))


print(f"Enter values for a {the_row_nr}x{the_column_nr} matrix:")


for i in range(the_row_nr):
    the_row_input = input(f"Enter {the_column_nr} values for row {i+1} (separated by space):\n")
    the_row_input = the_row_input.split()
    the_row = []
    for the_row_str in the_row_input:
        the_row.append(float(the_row_str))
    the_matrix.append(the_row)
        
np_the_matrix = np.array(the_matrix)
print("This is matrix 1:")
print(np_the_matrix)

the_other_row_nr = int(input("Enter the number of rows for the second matrix:\n"))
the_other_column_nr = int(input("Enter the number of columns for the second matrix:\n"))


print(f"Enter values for a {the_other_row_nr}x{the_other_column_nr} matrix:")


for j in range(the_other_row_nr):
    the_other_row_input = input(f"Enter {the_other_column_nr} values for row {j+1} (separated by space):\n")
    the_other_row_input = the_other_row_input.split()
    the_other_row = []
    for the_other_row_str in the_other_row_input:
        the_other_row.append(float(the_other_row_str))
    the_other_matrix.append(the_other_row)
        
np_the_other_matrix = np.array(the_other_matrix)
print("This is matrix 2:")
print(np_the_other_matrix)

while True:
    try:
        the_sum = np_the_matrix + np_the_other_matrix
        print("Matrix sum:")
        print(the_sum)
        break
    except ValueError:
        print("Error: sum not possible")
        break

while True:
    try:
        the_product = np.dot(np_the_matrix, np_the_other_matrix)
        print("Matrix multiplication:")
        print(the_product)
        break
    except:
        print("Error: multiplication not possible")
        break