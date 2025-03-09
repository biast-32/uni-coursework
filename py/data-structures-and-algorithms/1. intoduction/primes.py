def primes(N):
    if (N < 2):
        return (0)
    
    p = 0
    for i in range (2, N + 1):
        ok = True
        for d in range (2, int(i ** 0.5) + 1):
            if (i % d == 0):
                ok = False
                break
        if (ok):
            p += 1
    return (p)


if __name__ == "__main__":
    print(primes(7))
    print(primes(15))
    print(primes(50))