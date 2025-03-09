def jumps(n, a, b):
    if n == 0:
        return 1

    ways_to_pass = [0] * (n + 1)
    ways_to_pass[0] = 1  

    for i in range(1, n + 1):
        if i >= a:
            ways_to_pass[i] += ways_to_pass[i - a]

        if i >= b:
            ways_to_pass[i] += ways_to_pass[i - b]

    return ways_to_pass[n]

if __name__ == "__main__":
    print(jumps(4, 1, 2))
    print(jumps(8, 2, 3))
    print(jumps(11, 6, 7))
    print(jumps(30, 3, 5))
    print(jumps(100, 4, 5))