"""
The  program asks for two strings and checks (in three ways) if the first can be found as a substring in the second one.

"""

'''
#solution_1

#make a function that creates words as long as the first one with the letters in the second

def makeaux(aux,string,n):
    #x goes through all letters in the string
    for x in string:
        #aux is created with the letters in the string
        aux=aux+x
        #if the word is not as long as the first continue
        if len(aux)<n:
            continue
        #otherwise stop
        else:
            break
    #return the word
    return aux
#now make the wanted function
def contain(st,nd):
    #take an aux to make the word in it
    aux=""
    #if the word created with the makeaux function is the same as the first
    if makeaux(aux,nd,len(st))==st:
        return True
scrat=input("Enter the first string:\n")
sid=input("Enter the sencond string:\n")
if contain(scrat,sid)==True:
    print(f"The first string can be found in the second string")
else:
    print(f"The first string cannot be found in the second string")

#solution_2

def contain(st,nd):
    #take an aux to create a word with the letters in the second string
    aux=""
    #x goes through the letters in the second string
    for x in nd:
        #aux is created with the letters in the second string
        aux=aux+x
        #if aux is not as long as the first string continue
        if len(aux)<len(st):
            continue
        #otherwise stop
        else:
            break
    #if the new word and the first string are the same
    if aux==st:
        return True
scrat=input("Enter the first string:\n")
sid=input("Enter the sencond string:\n")
if contain(scrat,sid)==True:
    print(f"The first string can be found in the second string")
else:
    print(f"The first string cannot be found in the second string")
'''
#solution_3
def contain(st,nd):
    ok=False
    for x in range(len(nd)):
        if nd[x]==st[0]:
            ok=True
            for y in range(len(st)):
                if x+y<len(nd):
                    if nd[x+y]!=st[y]:
                        ok=False
                else:
                    ok=False
            if ok:
                return ok
    return ok
scrat=input("Enter the first string:\n")
sid=input("Enter the second string:\n")
if contain(scrat,sid)==True:
    print(f"The first string can be found in the second string.")
else:
    print(f"The first string cannot be found in the second string.")
