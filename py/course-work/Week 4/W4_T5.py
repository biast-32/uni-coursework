"""
The program asks for a string, and modifies all "s" letters (either lower or upper case) into "z".

"""

newton = input("Enter a string:\n")

for x in range(len(newton)):
    if newton[x] == "s":
        newton = newton[:x] + "z" + newton[x+1:]
    if newton[x] == "S":
        newton=newton[:x] + "Z" + newton[x+1:]

print("Modified string: " + newton)