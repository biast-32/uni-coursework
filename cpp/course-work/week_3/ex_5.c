#include <stdio.h>

int main(){
    char str[40];
    printf("Enter a string:\n");
    fgets(str, 40, stdin);
    int i = 0;
    for (int i = 0; i < 40; i++) {
        if (str[i] == '\n') {
            str[i] = '\0';
            break;
        }
        if (str[i] == '\0') {
            break;
        }
    }
    printf("String without newline character: %s", str);
    printf("NEWLINE_CHAR\n");

    return 0;
}