#include <stdio.h>
#include <ctype.h>

int main() {

    char ch[2];

    printf("Enter a character:\n");
    fgets(ch, sizeof(ch), stdin);

    printf("Classification:\n");

    if (isalpha(ch[0]) != 0) {
        printf("- It is an alphabetic character.\n");
        if (islower(ch[0]) != 0) {
            printf("  -> and a lowercase letter.\n");
        } else {
            printf("  -> and an uppercase letter.\n");
        }
    } else if (isdigit(ch[0]) != 0) {
        printf("- It is a digit.\n");
    } else if (ispunct(ch[0]) != 0) {
        printf("- It is a punctuation character.\n");
    }

    return 0;
}