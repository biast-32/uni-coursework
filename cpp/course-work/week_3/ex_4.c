#include <stdio.h>
int main(){
    char str[30];
    char ch1, ch2;
    printf("Enter a string without spaces (up to 30 characters):\n");
    scanf("%s", str);
    printf("Enter two characters separated by a single space:\n");
    scanf(" %c %c", &ch1, &ch2);
    printf("String: %s\n", str);
    printf("First character: %c\n", ch1);
    printf("Second character: %c\n", ch2);
    return 0;
}