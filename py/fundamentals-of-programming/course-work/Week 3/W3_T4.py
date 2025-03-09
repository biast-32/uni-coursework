"""
The program asks for two words, tells which word comes first alphabetically, and checks if 'z' is in either word.
Then it asks for a third word and checks whether it is a palindrome.

"""

w1 = input("Enter word 1:\n")
w2 = input("Enter word 2:\n")

if w1 < w2:
    print("'"+w1+"' comes earlier in order than '"+w2+"'.")
elif w1 > w2:
    print("'"+w2+"' comes earlier in order than '"+w1+"'.")
else:
    print("The words are the same.")

if "z" in w1:
    ok = 1
    print("Letter 'z' is found in word '"+w1+"'.")
else:
    ok = 0

if "z" in w2:
    ok = 1
    print("Letter 'z' is found in word '"+w2+"'.")
else:
    ok = 0

if ok == 0:
    print("The letter 'z' was not found in either of the words.")

w3 = input("Enter a word to be tested:\n")

if w3 == w3[-1: :-1]:
    print("'"+w3+"' is a palindrome.")
else:
     print("'"+w3+"' is not a palindrome.")