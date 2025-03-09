def subsets(n: int) -> list:
    result = []
    
    for i in range(1, n + 1):
        next_subsets = [[i]]
        for subset in result:
            next_subsets.append(subset + [i])
        result.extend(next_subsets)
        
    return result

if __name__ == "__main__":
    print(subsets(1))
    print(subsets(2)) 
    print(subsets(3)) 
    print(subsets(4)) 

    S = subsets(10)
    print(S[95])
    print(S[254])
    print(S[826])