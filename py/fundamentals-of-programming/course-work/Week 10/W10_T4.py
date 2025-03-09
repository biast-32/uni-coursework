"""
The program asks for row and column indices, attempts to access the corresponding element in a 3x3 matrix, and displays the value at that position.

"""

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
    ]

while True:
    try:
        the_row_str = input("Enter the row index:\n")
        the_row = int(the_row_str)
        the_column_str = input("Enter the column index:\n")
        the_column = int(the_column_str)
        the_element = matrix[the_row][the_column]
        if the_row and the_column and 0 <= the_row < 3 and 0 <= the_column <= 3:
            print(f"Value at position ({the_row}, {the_column}): {the_element}")
            break

    except IndexError:
        print("Error: Index out of bounds. Please enter valid row and column indices.")
        break
    
    except ValueError:
        print("Error: Please enter valid integers for row and column indices.")
        break
