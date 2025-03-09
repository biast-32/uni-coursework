"""
The program asks for a string and reverses it using recursion.

"""

def reverse_string(S):
    if not S:
        return ""
    else:
        return S[-1] + reverse_string(S[:-1])

S = input("Give a string to reverse:\n")
print(f"Original String: {S}")
print(f"Reversed String: {reverse_string(S)}")
