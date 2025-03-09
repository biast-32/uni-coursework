#include <stdio.h>

int sumOfArray(int row, int col, int arr[row][col]) {
    int sum = 0;

    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            sum = sum + arr[i][j];
        }
    }

    return sum;
}

int main() {
    int row, col;

    printf("Enter the number of rows:\n");
    scanf("%d", &row);
    printf("Enter the number of columns:\n");
    scanf("%d", &col);

    int arr[row][col];

    for (int i = 0; i < row; i++) {
        printf("Enter row %d:\n", i + 1);
        for (int j = 0; j < col; j++) {
            scanf("%d", &arr[i][j]);
        }
    }

    int sum = sumOfArray(row, col, arr);

    printf("Sum of all elements: %d", sum);

    return 0;
}