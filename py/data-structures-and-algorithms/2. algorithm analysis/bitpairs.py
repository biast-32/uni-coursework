def pairs(s):
    final_sum = 0
    k = 0
    indices_sum = 0
    
    for i in range(0, len(s)):
        if s[i] == '1':
            # (i - 1st 1) + (i - 2nd 1) + ... (i - nth 1) =
            # i - 1st 1 + i - 2nd 1 + ... + i - nth 1 = 
            # i + i + ... + i - 1st 1 - 2nd 1 - ... - nth 1 = 
            # n * i - (1st 1 + 2nd 1 + ... + nth 1) = 
            # number of 1s * current position - sum of previous indices
            final_sum += k * i - indices_sum
            k += 1
            indices_sum += i
        i += 1
    
    return final_sum

if __name__ == "__main__":
    print(pairs("100101"))
    print(pairs("101"))
    print(pairs("100100111001"))