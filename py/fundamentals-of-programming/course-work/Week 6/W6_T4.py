"""
The program asks the user to input a number of rows and columns for a matrix. Then, it prompts the user to input each row of the matrix, ensuring that the correct number of elements are entered per row. After gathering the data, it stores the rows in a matrix and displays the matrix with rows and columns.

"""

def create_matrix(rows,cols):
    #create an empty matrix
    matrix=[]
    #go through the rows
    for i in range(rows):
        #as long as i is within the range
        while True:
            #ask the user for rows and split the numbers given
            r=input(f"Give row {i + 1}:\n").split()
            #if the length is as the colomns'
            if len(r)==cols:
                #attach the row to the matrix element by element as numbers
                matrix.append([int(n) for n in r])
                break
            else:
                print("Error: Invalid number of elements in the row. Please try again.")
    return matrix

def print_matrix(matrix):
    for r in matrix:
        print("|" + "\t".join(str(elem) for elem in r) + "|")

r=int(input("Enter the number of rows:\n"))
c= int(input("Enter the number of columns:\n"))

matrix=create_matrix(r,c)
print_matrix(matrix)
