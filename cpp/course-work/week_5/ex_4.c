#include <stdio.h>
#include <string.h>

void swapElements(char str[], int index1, int index2){
    char aux;
    aux = str[index1];
    str[index1] = str[index2];
    str[index2] = aux;

    printf("Modified string: %s", str);
}

int main(){
    char str[100];
    int index1, index2;

    printf("Enter a string:\n");
    fgets(str, sizeof(str), stdin);
    str[strcspn(str, "\n")] = '\0';

    printf("Enter first index:\n");
    scanf("%d", &index1);

    printf("Enter second index:\n");
    scanf("%d", &index2);

    if(index1 >= 0 && index2 >= 0 && index1 <= strlen(str) && index2 <= strlen(str)){
        swapElements(str, index1, index2);
    } else{
        printf("Indices are out of bounds.");
    }

    return 0;
}