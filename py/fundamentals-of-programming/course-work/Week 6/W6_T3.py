"""
The program asks the user to input a series of integers separated by commas and stores them in a list. It then creates a new list with the integers in reversed order and displays the reversed list.

"""

#create the function that asks the user to give a list and separates the elements 
def input_integers():
 #declare variable that takes the numbers
 input_string = input("Give integers separated by comma:\n")
 #tell python you separate by ,
 list_of_char = input_string.split(",")
 #create an empty list
 list_of_ints = []
 #go through the separated characters
 for ch in list_of_char:
     #append elements to the list
     list_of_ints.append(int(ch))
 return list_of_ints

l=input_integers()
aux=[]
for x in range(len(l)-1,0,-1):
    aux.append(l[x])
aux.append(l[0])
print(f"Reversed list: {aux}")
