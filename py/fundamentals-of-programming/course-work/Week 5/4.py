"""
The  program uses a function that compresses consecutive duplicate letters.

"""

def compress(string):

    #n counts the number of occurences of each letter
    n=1

    #in aux we will create the compressed string
    aux=""

    #i goes through the number of each letter in the string
    for i in range(1,len(string)):

        #if a letter is the same as the one behind it
        if string[i-1]==string[i]:

            #n counts the occurrences
            n=n+1
        else:

            #otherwise the letter is just added to the compressed string
            aux=aux+string[i-1]

            #if a letter appears more than once
            if n>1:

                #the letter is added and also the number of occurrences
                aux=aux+str(n)

            #n goes back to 1 for another letter to be counted
            n=1

    #we add the rest of the string
    aux=aux+string[-1]

    #if a letter appears more than once
    if n>1:

                #the letter is added and also the number of occurrences
        aux=aux+str(n)

            #n goes back to 1 for another letter to be counted
        n=1

    #return the compressed string
    return aux

scrat=input("Give a string to compress:\n")

print(f"Compressed string: {compress(scrat)}")
print(f"Compressing ratio {round(len(compress(scrat))/len(scrat),2)}")
