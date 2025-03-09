#include <stdio.h>
#include <string.h>

void reverseString(char str[]){
    int size = strlen(str);
    char aux[size + 1];


    for (int i = 0; i < size; i++) {
        aux[i] = str[size - 1 - i];
    }
    aux[size] = '\0';

    strcpy(str, aux);

}

int main(){
    char inputStr[100];

    printf("Enter a string:\n");
    fgets(inputStr, sizeof(inputStr), stdin);
    inputStr[strcspn(inputStr, "\n")] = '\0';

    reverseString(inputStr);
    printf("Reversed string: %s\n", inputStr);

    return 0;
}