def my_mean(L):
    k = 0
    s = 0
    for i in L:
        k = k + 1
        s = s + i
    return s / k





def my_variance(L):
    s = 0
    for i in L:
        d = 0
        d = ( i - my_mean(L)) ** 2
        s = s + d
    return s / len(L)





def my_mode(L):
    f = {}
    maxv = 0
    maxf = 0
    for i in L:
        if i in f:
            f[i] = f[i] + 1
        else:
            f[i] = 1
        if maxf < f[i]:
            maxf = f[i]
            if maxv < i:
                maxv = i
    return maxv
