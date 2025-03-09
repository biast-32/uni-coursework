"""
The program asks the user to input names one by one and saves them to a file. The program continues prompting for names until the user enters 'stop', when the program stops and saves the names entered so far into the file.

"""

def write_names(file_name):
  za_file=open(file_name,"a+")
  while True:
    name=input(f"Enter a name or 'stop':\n")
    if name=="stop":
      break
    za_file.write(name+"\n")
  za_file.close()

za_file=input("Enter the name of the file to be saved:\n")
write_names(za_file)
