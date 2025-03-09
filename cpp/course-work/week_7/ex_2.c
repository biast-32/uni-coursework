#include <stdio.h>
#include <stdlib.h>

int main() {

    int size = 4;
    int k = 0;
    int *array = (int*)malloc(4 * sizeof(int));

    if (array == NULL){
        printf("Memory allocation failed!\n");
        return 1;
    }

    int nr;

    printf("Enter numbers (enter -1 to stop):\n");

    while (1) {
        printf("Enter a number:\n");
        scanf("%d", &nr);

        if (nr == -1) {
            printf("\nFinal array (with %d elements): ", k);
            for(int i = 0; i < k; i++) {
                printf("%d ", array[i]);
            }
            break;
        }

        array[k] = nr;
        k ++;

        if (k >= (size * 75) / 100) {
            size *= 2;
            array = (int*)realloc(array, size * sizeof(int));

            if (array == NULL){
                printf("Memory allocation failed!\n");
                return 1;
            } else {
                printf("The array size increases to %d.\n", size);
            }
        }
    }

    free(array);

    return 0;
}