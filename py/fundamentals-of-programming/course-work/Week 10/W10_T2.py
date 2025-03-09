"""
The program asks for a file name, attempts to open the file, and displays its contents.

"""

the_file_str = input("Enter the file name:\n")
while True:
    try:
        the_file = open(the_file_str, 'r')
        if the_file:
            print("File content:")
            the_content = the_file.read()
            print(the_content)
            break
        else:
            print("Error: File not found.")
            break
    except FileNotFoundError:
        print("Error: File not found.")
        break
        
