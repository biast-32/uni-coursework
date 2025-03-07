"""
The  program uses:
>> a function that counts the occurrences of a character in a string
>> a function that checks if two words are anagrams

"""

def occurrences(ch,string):

    #n is counting the occurrences
    n=0

    #x goes through the string 
    for x in string:

        #x takes the roles of each letter in the string and gets compared to ch
        if x==ch:

            #if they match n has to count
            n=n+1

    #return the number counted by n
    return n

def anagram(A,B):

    #ok pretends everything is ok and the words are anagrams
    ok=1

    #if the length of the words is not the same it's impossible to be anagrams
    if len(A)!=len(B):

        #so ok cannot pretend things are ok anymore
        ok=0

    #but otherwise
    else:

        #x goes through all the characters in A
        for x in A:
            
            #if the number of occurrences of a letter in A doesn't match the one in B
            if occurrences(x,A)!=occurrences(x,B):

                #ok cannot pretend things are ok anymore
                ok=0

    #return ok to see if things are ok or not
    return ok

scrat=input("Enter string A:\n")

sid=input("Enter string B:\n")

if anagram(scrat,sid)==0:
        print(f"{scrat} and {sid} are not anagrams")
else:
        print(f"{scrat} and {sid} are anagrams")