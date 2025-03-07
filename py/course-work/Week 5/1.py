"""
The  program uses a function that counts the occurrences of a character in a string.

"""

def occurrences(ch, string):
    #n is counting the occurrences
    n = 0

    #x goes through the string 
    for x in string:
        
        #x takes the roles of each letter in the string and gets compared to ch
        if x == ch:

            #if they match n has to count
            n = n + 1
    #return the number counted by n
    return n

scrat = input("Enter a character:\n")

if len(scrat) > 1:
    print("Error: Give a single character.")
else:
    sid = input("Enter a string:\n")

    print(f"The character '{scrat}' appears {occurrences(scrat,sid)} time(s) in the string.")
