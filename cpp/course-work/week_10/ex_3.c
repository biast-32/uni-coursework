#include <stdio.h>
#include <string.h>

void toUpperCase(char * str) {
    for (int i = 0; str[i] != '\0'; i++) {
        str[i] = toupper(str[i]);
    }
}

void toLowerCase(char* str) {
    for (int i = 0; str[i] != '\0'; i++) {
        str[i] = tolower(str[i]);
    }
}

void (*stringFunctions[])(char*) = {toUpperCase, toLowerCase};

int main() {
    char str[100];
    int choice;

    printf("Enter a string:\n");
    fgets(str, sizeof(str), stdin);

    printf("Choose operation:\n1. Uppercase\n2. Lowercase\n");
    printf("Enter your choice:\n");
    scanf("%d", &choice);

    stringFunctions[choice - 1](str);
    printf("Processed String: %s\n", str);
}