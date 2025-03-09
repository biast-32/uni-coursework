def triangle(a, b, c):
    if (a <= 0 or b <= 0 or c <= 0):
        return (False)
    
    if (a + b > c and b + c > a and c + a > b):
        return (True)
    else:
        return (False)
    

if __name__ == "__main__":
    print(triangle(3, 5, 4))
    print(triangle(-1, 2, 3))
    print(triangle(5, 9, 14))
    print(triangle(30, 12, 29))