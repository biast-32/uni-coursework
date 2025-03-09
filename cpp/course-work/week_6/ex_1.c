#include <stdio.h>

#define MAX_SIZE 100

void reverseArray(int A[], int size) {
    int left = 0, right = size - 1;
    while (left < right) {
        int aux = A[left];
        A[left] = A[right];
        A[right] = aux;

        left++;
        right--;
    }

}

int main(){
    int array[MAX_SIZE];
    int size = 0;
    
    printf("Enter numbers separated by spaces (non-integer value terminates):\n");
    
    while (size < MAX_SIZE) {
        if (scanf("%d", &array[size]) != 1) {
            break;
        }
        size++;
    }

    printf("Original array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    reverseArray(array, size);

    printf("Reversed array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    return 0;
}