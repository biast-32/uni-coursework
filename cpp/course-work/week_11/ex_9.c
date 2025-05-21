#include <stdio.h>
#include <stdlib.h>

int compare_desc(const void *a, const void *b) {
    return (*(int *)b - *(int *)a);
    }

int main() {

    int notes[5];

    printf("Enter 5 student grades:\n");

    for (int i = 0; i < 5; i++) {
        printf("Grades %d:\n", i + 1);
        scanf("%d", &notes[i]);
    }

    printf("\nSorted grades (high to low):\n");

    qsort(notes, 5, sizeof(int), compare_desc);

    for (int i = 0; i < 5; i++) {
        printf("%d ", notes[i]);
    }

    return 0;
}