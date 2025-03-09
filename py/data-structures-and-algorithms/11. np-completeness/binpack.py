def binpack(items, S):
    items.sort(reverse=True)
    bins = []

    for item in items:
        packed = False
        for bin in bins:
            sum = 0

            for i in bin:
                sum += i
            if sum + item <= S:
                bin.append(item)
                packed = True
                break
            
        if not packed:
            bins.append([item])
    
    return bins

if __name__ == "__main__":
    items = [9, 3, 3, 6, 10, 4, 6, 8, 6, 3]
    B = 10

    bins = binpack(items, B)

    for i in range(len(bins)):
        print(f"bin {i+1}: {bins[i]}")