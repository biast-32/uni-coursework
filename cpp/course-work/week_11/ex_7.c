#include <stdio.h>
#include <stdlib.h>

int main() {

    char string[100];
    int n;

    printf("Enter an integer (as a string):\n");
    fgets(string, sizeof(string), stdin);

    n = atoi(string);

    if(n == 0) {
        printf("Invalid input: not a valid integer.\n");
    } else {
        printf("Original number: %d\n", n);
        printf("Absolute value: %d\n", abs(n));
    }

    return 0;
}