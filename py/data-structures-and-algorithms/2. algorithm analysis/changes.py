def changes(A):
    n = len(A)
    k = 0
    
    for i in range(1, n):
        if ( A[i] == A[i - 1]):
            k += 1
            A [i] = -1
    
    return (k)


if __name__ == "__main__":
    print(changes([1, 1, 2, 2, 2]))
    print(changes([1, 2, 3, 4, 5]))
    print(changes([1, 1, 1, 1, 1]))