"""
The program asks the user for a source file name and a destination file name, then copies the content from the source file to the destination file.

"""

import shutil

def file_copy(fileA,fileB):
    shutil.copy(fileA,fileB)
    
za_A_file=input("Please give the name of the source file:\n")
za_B_file=input("Please give the name of the destination file:\n")
file_copy(za_A_file,za_B_file)
print("File copied successfully!")