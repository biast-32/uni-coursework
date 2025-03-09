def sums(items):
    result = []
    unique_sums = []

    for i in range(len(items)):
        new_sums = [items[i]] 
        
        for existing_sum in result:
            new_sums.append(existing_sum + items[i])

        result.extend(new_sums)

    for sum_value in result:
        if sum_value not in unique_sums:
            unique_sums.append(sum_value)
   
    return len(unique_sums)

if __name__ == "__main__":
    print(sums([1, 2, 3]))                  
    print(sums([2, 2, 3]))                  
    print(sums([1, 3, 5, 1, 3, 5]))         
    print(sums([1, 15, 5, 23, 100, 55, 2])) 