def queen(n, m):
    solutions = []

    def backtrack(size, checking_row, tries_left):
        if tries_left == 0:
            solutions.append(size[:])
            return
        
        if checking_row >= n:
            return
        
        for checking_col in range(n):
            if check_if_safe(size, checking_row, checking_col):
                size.append((checking_row, checking_col))
                backtrack(size, checking_row + 1, tries_left - 1)
                size.pop()
        
        backtrack(size, checking_row + 1, tries_left)

    def check_if_safe(size, checking_row, checking_col):
        for row, col in size:
            if row == checking_row or col == checking_col or abs(row - checking_row) == abs(col - checking_col):
                return False
        return True
    
    backtrack([], 0, m)
    return len(solutions)

if __name__ == "__main__":
    print(queen(4, 4))
    print(queen(4, 2))
    print(queen(6, 4))
    print(queen(7, 2))
    print(queen(8, 8))