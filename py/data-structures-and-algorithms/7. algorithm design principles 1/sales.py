def sales(cars, customers):
    A = mergesort(cars)
    B = mergesort(customers)
    s = 0
    i = 0
    j = 0

    while i < len(A) and j < len(B):
        if A[i] <= B[j]:
            s += 1
            i += 1
            j += 1
        else:
            j += 1
    return s

def mergesort(the_list):
    if len(the_list) <= 1:
        return the_list
    first_half = the_list[len(the_list) // 2 :]    # half of the items from the_list
    other_half = the_list[: len(the_list) // 2]    # other half of the items
    return merge(mergesort(first_half), mergesort(other_half))

def merge(first_half, other_half):
    answer = []
    while first_half or other_half:
        if not first_half:     # first_half is empty, append rest items from other_half
            answer += other_half
            break
        elif not other_half:   # other_half is empty, append rest items from first_half
            answer += first_half
            break
        elif first_half[0] <= other_half[0]:
            answer.append(first_half.pop(0))
        else:
            answer.append(other_half.pop(0))
    return answer

if __name__ == "__main__":
    print(sales([20, 10, 15], [11, 25, 15]))
    print(sales([13, 7, 2, 3, 12, 4, 19], [3, 25, 16, 14]))
    print(sales([24, 6, 20, 21, 12, 5], [25, 1, 24, 15]))
    print(sales([14, 9, 10, 15, 18, 20], [24, 17, 9, 22, 12, 4]))
