#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_SIZE 100

char **generateStrings(int n) {
    char **strings = (char **)malloc(n * sizeof(char *));

    if (strings == NULL) {
        printf("Memory allocation failed\n");
        return NULL;
    }

    for (int i = 0; i < n; i++) {
        strings[i] = (char *)malloc(MAX_SIZE * sizeof(char));
        if (strings[i] == NULL) {
            printf("Memory allocation failed!\n");
            return NULL;
        }
        printf("Enter string %d:\n", i + 1);
        scanf(" %[^\n]", strings[i]);
    }

    return strings;
}

int main() {
    int n;

    printf("Enter the number of strings:\n");
    scanf("%d", &n);

    char **strings = generateStrings(n);

    printf("\nThe stored strings are:\n");
    for (int i = 0; i < n; i++) {
        printf("%d: %s\n", i + 1, strings[i]);
    }

    for (int i = 0; i < n; i++) {
        free(strings[i]);
    }
    free(strings);

    return 0;
}