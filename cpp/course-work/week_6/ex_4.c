#include <stdio.h>

#define MAX_VALUE 100

int findMax(int *arr, int size) {
    int *ptr = arr;
    int le_grand = *ptr;

    for (int i = 0; i < size; i++) {
        ptr++;
        if (*ptr > le_grand) {
            le_grand = *ptr;
        }   
    }
    
    return le_grand;
}

int main() {
    int size, arr[MAX_VALUE];

    printf("Enter the number of elements:\n");
    scanf("%d", &size);

    printf("Enter the numbers:\n");
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    int le_grand = findMax(arr, size);
    printf("The maximum value is: %d", le_grand);

    return 0;
}