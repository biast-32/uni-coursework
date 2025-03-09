#include <stdio.h>
#include <string.h>

int main(){
    char sent[500];
    char delim[]= "aeiouAEIOU";
    char *token;

    printf("Enter a sentence:\n");
    fgets(sent, sizeof(sent), stdin);

    token = strtok(sent, delim);

    printf("Splitting the sentence by vowels:\n");

    while(token != NULL) {
        printf("%s\n", token);
        token = strtok(NULL, delim);
    }

    return 0;
}