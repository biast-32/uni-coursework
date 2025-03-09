#include <stdio.h>

int main() {
    int nr;
    int sum = 0;

    printf("Give the integer:\n");
    scanf("%d", &nr);

    while(nr){
        if(nr % 10 != 4 && nr % 10 != 8){
            sum = sum + ((nr % 10)*(nr % 10));
            nr = nr / 10;
        } else if(nr % 10 == 4){
            nr = nr / 10;
        } else if(nr % 10 == 8){
            break;
        }
    }

    printf("The summation is %d.", sum);
    return 0;
}