def split(T):
    n = len(T)

    if n == 1:
        return 0
    
    l_max = [0] * n
    l_max[0] = T[0]
    max = T[0]

    for i in range(1, n):
        if T[i] > max:
            max = T[i]
        l_max[i] = max
    
    r_min = [0] * n
    r_min[-1] = T[-1]
    min = T[-1]
    for i in range(n-2, -1, -1):
        if T[i] < min:
            min = T[i]
        r_min[i] = min
    
    k = 0
    for i in range(n - 1):
        if l_max[i] < r_min[i+1]:
            k += 1
    
    return (k)


if __name__ == "__main__":
    print(split([1, 2, 3, 4, 5]))
    print(split([5, 4, 3, 2, 1]))
    print(split([2, 1, 2, 5, 7, 6, 9]))
    print(split([1, 2, 3, 1]))