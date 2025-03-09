"""
The program asks for a number, then calculates and displays the number raised to the power of 2, 3, 4, and 5, rounded to four decimal places.

"""

def powers(x):
    a = round(x ** 2, 4)
    b = round(x ** 3, 4)
    c = round(x ** 4, 4)
    d = round(x ** 5, 4)
    the_tuple = (a, b, c, d)
    return the_tuple




    
def main():
    x = input("Enter a number:\n")
    x = float(x)
    print(f"Powers of {x}:")
    print(f"x^2: {powers(x)[0]}")
    print(f"x^3: {powers(x)[1]}")
    print(f"x^4: {powers(x)[2]}")
    print(f"x^5: {powers(x)[3]}")



    
if __name__ == '__main__':
    main()
