"""
The program is a very basic calculator that asks for two numbers and an operation, then performs it.

"""

n1 = int(input("Enter the first number:\n"))
n2 = int(input("Enter the second number:\n"))

print("The calculator can perform the following operations:")
print("1) Add")
print("2) Subtract")
print("3) Multiply ")
print("4) Divide")
print("The numbers you entered are " + str(n1) + " and " + str(n2))

op = int(input("Select the operation (1-4):\n"))

if op == 1:
       print("Selection 1: "+str(n1)+" + "+str(n2)+" = "+str(n1+n2))
elif op == 2:
       print("Selection 2: "+str(n1)+" - "+str(n2)+" = "+str(n1-n2))
elif op == 3:
       print("Selection 3: "+str(n1)+" * "+str(n2)+" = "+str(n1*n2))
elif op == 4:
    if n2 == 0:
        print("Error: Zero cannot be used as a divisor.")
    else:
        print("Selection 4: "+str(n1)+" / "+str(n2)+" = "+str(round(n1/n2,2)))
else:
    print("The operation was not recognized.")