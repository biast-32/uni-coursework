#include <stdio.h>

#define MAX_SIZE 100

void countNum(int a[], int size) {
    int ke = 0;
    int ko = 0;

    for (int i = 0; i < size; i++) {
        if (i % 2 == 0) {
            ke++;
        } else {
            ko ++;
        }
    }

    printf("Even numbers: %d\n", ke);
    printf("Odd numbers: %d\n", ko);
}

int main() {

    int array[MAX_SIZE];
    int size;

    printf("Enter the array elements separated by spaces (non-integer value terminates):\n");
    while (size < MAX_SIZE) {
        if (scanf("%d ", &array[size]) != 1) {
            break;
        }
        size++;
    }

    countNum(array, size);

    return 0;
}