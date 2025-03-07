"""
The program asks the user to input the number of rows and columns for a matrix. Then, it prompts the user to input each row of the matrix, ensuring that the correct number of elements is entered per row. After gathering the data, it stores the rows in a matrix and displays both the original matrix and its transpose.

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

def transpose(matrix):
    #take measures from matrix
    i=len(matrix)
    j=len(matrix[0])
    #create matrix with 0's
    trixma=[[0 for x in range(i)] for y in range(j)]
    #go through the rows and columns and put correct numbers
    for a in range(i):
        for b in range(j):
            trixma[b][a]=matrix[a][b]
    return trixma

r=int(input("Enter the number of rows:\n"))
c= int(input("Enter the number of columns:\n"))

matrix=create_matrix(r,c)
trixma=transpose(matrix)
print("The original matrix:")
print_matrix(matrix)
print("Its transpose:")
print_matrix(trixma)
