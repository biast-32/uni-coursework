"""
The  program uses a function that counts the number of words in a sentence.

"""

def count_words(sentence):
    #n counts the words and start with one because a sentence must have at least one word
    n = 1

    #x goes through all characters of the string but works like i in a vector
    for x in range(1,len(sentence)):

        #if the character behind is space and the next is not n counts
        if sentence[x-1] == " " and sentence[x] != " ":
            n = n + 1

    #return the number of words
    return n

scrat = input("Give a sentence:\n")

print(f"This sentence contains {count_words(scrat)} words.")