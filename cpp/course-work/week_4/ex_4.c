#include <stdio.h>
#include <string.h>

int main(){
    char sent[200];
    int i;

    printf("Enter a sentence:\n");
    fgets(sent, sizeof(sent), stdin);

    int kv = 0;
    int kc = strlen(sent);

    for(i = 0; i < kc; i++){
        if(sent[i] == 'a' || sent[i] == 'e' || sent[i] == 'i' || sent[i] == 'o' || sent[i] == 'u' || sent[i] == 'A' || sent[i] == 'E' || sent[i] == 'I' || sent[i] == 'O' || sent[i] == 'U'){
            kv++;
        }
    }

    printf("Number of vowels: %d\n", kv);
    printf("Number of characters: %d", kc);
    return 0;
}