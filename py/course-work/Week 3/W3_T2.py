"""
The program asks if the user wishes to terminate the program or not. If they choose not to, it will ask for a username and password, and check if they are correct.

"""

asw = input("Do you want to stop the execution of the program (y/Y):\n")

if asw == 'y' or asw == 'Y':
    print("Bye!")
else:
    name = input("Enter username:\n")
    passw = input("Enter password:\n")

    if name == "Mark" and passw == "drowssap":
        print("User recognized.")
    else:
        print("You entered an invalid login name or password.")