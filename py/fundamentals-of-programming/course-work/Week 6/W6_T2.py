"""
The program asks the user to input a series of integers separated by commas. It then asks the user to provide an integer, k, and prints the kth smallest unique number from the list of integers.

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
#check if k is the range
#if it is not we stop
#if it is
#we sort the list
#we eliminate repetitions
#we give the kth number
l=input_integers()
k=int(input(f"Give an integer:\n"))
if k>len(l):
    print(f"Not suitable")
else:
    for x in range(len(l)-1,0,-1):
        for y in range(x):
            if l[y]>l[y+1]:
                b=l[y]
                l[y]=l[y+1]
                l[y+1]=b
    print(f"{k}th smallest element is {l[k-1]}")
