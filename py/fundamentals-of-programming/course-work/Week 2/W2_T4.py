"""
The program asks for a word and an integer smaller than or equal to the number of letters in the word. Then it replaces the letter in that position into an asterisk (*).

"""

word = input("Give a word:" + '\n')
print("The length of the word is " + str(len(word)))
x = int(input("Give an integer smaller than or equal to " + str(len(word)) + ":" + '\n'))

print(str(word[:x-1]) +  "*"  + str(word[x:]))