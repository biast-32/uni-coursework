"""
The program asks the user to input numbers separated by commas, stores them in a list, and removes any duplicate numbers before displaying the final list. 

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

#declare a variable that will be the list
l=input_integers()
#print it
print(f"Original List: {l}")
#create an aux list to store the elements asked for
aux=[]
#go through the elements of the list
for x in l:
    #if the element is not in the aux
    if x not in aux:
        #append it to the aux
        aux.append(x)
print(f"List with duplicates removed: {aux}")