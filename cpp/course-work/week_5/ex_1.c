#include <stdio.h>

void countUntil(){
    int nr;
    int sum = 0;
    printf("Please enter an integer greater than 0:\n");
    scanf("%d", &nr);

    if(nr <= 0){
        printf("Stopping: the number must be greater than zero.");
    } else{
        for( int i = 0; i <= nr; i++){
            sum = sum + i;
        }
        printf("The sum of integers from 0 to %d is: %d", nr, sum);
    }
}

int main(){
    countUntil();
}