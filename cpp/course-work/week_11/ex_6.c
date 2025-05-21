#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main() {

    char sentence[99];

    printf("Enter a sentence (max 100 characters):\n");
    fgets(sentence, sizeof(sentence), stdin);
    sentence[strcspn(sentence, "\n")] = '\0';

    for (int i = 0; i <= strlen(sentence); i++) {
        if (isupper(sentence[i]) != 0) {
            sentence[i] = tolower(sentence[i]);
        } else if (islower(sentence[i]) != 0) {
            sentence[i] = toupper(sentence[i]);
        }
    }

    printf("Reversed case sentence:\n%s", sentence);

    return 0;
}