#include <stdio.h>
#include <stdlib.h>

int main() {

    srand(42);

    printf("Your lucky numbers are:\n");

    for (int i = 0; i < 5; i++) {
        printf("%d ", rand() % 100 + 1);
    }

    return 0;
}