"""
The program generates a random password of a user-specified length using letters, digits, and special characters. 

"""

#import module(s)
import random
import string

LETTERS = string.ascii_letters
DIGITS = string.digits
SPECIAL = string.punctuation
COMB = LETTERS + DIGITS + SPECIAL

#set seed
random.seed(8292)

while True:
    #ask for length
    l=int(input("Enter the length of the password:\n"))

    #verify length
    if l <= 0:
        print(f"Password length must be a positive integer.")
    else:
    #generate the password
        password=''.join(random.choice(COMB) for i in range(l))
        print(f"Generated password: {password}")
        break
