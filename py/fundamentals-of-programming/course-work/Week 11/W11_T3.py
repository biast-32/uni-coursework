"""
The program asks for a list of integers and a target sum. It then finds all unique pairs of integers from the list that add up to the target sum and displays them.

"""

the_list = []
the_solutions = []

while True:
    the_input = input("Enter an integer (or type 'done' to finnish input) :\n")
    if the_input == "done":
        break
    else:
        the_list.append(int(the_input))
        
the_sum = int(input("Enter the target sum:\n"))

for i in range(len(the_list)):
    for j in range(i + 1, len(the_list)):
        if (the_list[i] + the_list[j] == the_sum):
            if the_list[i] < the_list[j]:
                the_solutions.append((the_list[i], the_list[j]))
            else:
                the_solutions.append((the_list[j], the_list[i]))

print(f"Pairs with a sum of {the_sum}:")
for the_solution in the_solutions:
    print(the_solution)