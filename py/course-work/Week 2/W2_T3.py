"""
The program takes a long word as input and performs string manipulations:
>> Extracts the first five letters
>> Extracts the last five letters
>> Extracts letters 2 through 5
>> Prints every second letter
>> Prints the word backwards

"""

s = input("Enter a long word:" + '\n')
l = len(s)
print("The first five letters are: " + s[:5])
print("The last five letters are: " + s[-5:])
print("Letters 2, 3, 4 and 5 are: " + s[1:5])
print("Every second letter of the word: " + s[1:l:2])
print("The word backwards " + "'" + s[-1: :-1] + "'")