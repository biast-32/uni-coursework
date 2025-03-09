#include <stdio.h>
#include <string.h>

char asciiToChar(int asciiValue){
    return (char)asciiValue;
}

int charToAscii(char c){
    return (int)c;
}

int main(){
    int choice = -1;

    while (choice != 0){
        printf("Menu:\n");
        printf("1. Convert ASCII value to character\n");
        printf("2. Convert character to ASCII value\n");
        printf("0. Exit\n");
        printf("Enter your choice:\n");
        scanf("%d", &choice);
    
        switch(choice) {
            case 0: {
                printf("Exiting the program. Goodbye!\n\n");
                return 0;
            }

            case 1: {
                int ascii;
                printf("Enter an ASCII value:\n");
                scanf("%d", &ascii);
                printf("The character for ASCII value %d is '%c'.\n\n", ascii, asciiToChar(ascii));
                break;
            }

            case 2: {
                char c;
                printf("Enter a character:\n");
                scanf(" %c", &c);
                printf("The ASCII value for character '%c' is %d.\n\n", c, charToAscii(c));
                break;
            }

            default: {
                printf("Invalid choice");
                break;
            }
        }
    }

    return 0;
}