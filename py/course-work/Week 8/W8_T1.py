"""
The program is a basic calculator for trigonometric calculations (sin, cos, inverse sin, inverse cos). 

"""

#import necessary module
import math

#create the mini-menu
while True:
    print(f"Trigonometric Calculations:")
    print(f"1. Sine Calculation")
    print(f"2. Cosine Calculation")
    print(f"3. Inverse Sine Calculation")
    print(f"4. Inverse Cosine Calculation")
    print(f"5. Exit")

    #take the input
    choice=input("Enter your choice (1/2/3/4/5):\n")

    #option 1 - sine
    if choice == '1':
        angle=float(input("Enter an angle in degrees:\n"))
        result=round(math.sin(math.radians(angle)),3)
        print(f"The sine of {angle} degrees is {result}\n")

    #option 2 - cosine
    elif choice == '2':
        angle=float(input("Enter an angle in degrees:\n"))
        result=round(math.cos(math.radians(angle)),3)
        print(f"The cosine of {angle} degrees is {result}\n") 

    #option 3 - inverse sine
    elif choice == '3':
        value=float(input("Enter the sine value:\n"))
        if -1<= value <=1:
            result=round(math.degrees(math.asin(value)),3)
            print(f"The inverse sine (in degrees) of {value} is {result}\n")
        else:
            print(f"Invalid input. Sine value must be between -1 and 1.\n")

    #option 4 - inverse cosine
    elif choice == '4':
        value=float(input("Enter the cosine value:\n"))
        if -1<= value <=1:
            result=round(math.degrees(math.acos(value)),3)
            print(f"The inverse cosine (in degrees) of {value} is {result}\n")
        else:
            print(f"Invalid input. Cosine value must be between -1 and 1.\n")

    #option 5 - exit
    elif choice == '5':
        print("Bye!")
        break

    #when the input is wrong
    else:
        print("Invalid choice. Please select a valid option.\n")
        
