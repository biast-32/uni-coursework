#include <stdio.h>
#include <stdlib.h>

int main() {

    char *line = NULL;
    size_t len = 0;
    size_t read;

    printf("Welcome to the Echo Machine! (Press Ctrl+D to finish)\n");

    while(1) {
        printf("Please enter anything:\n");

        read = getline(&line, &len, stdin);

        if (read == -1) {
            break;
        }
            printf("You entered: %s\n", line);
    }

    free(line);

    return 0;
}