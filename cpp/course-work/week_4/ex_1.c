#include <stdio.h>

int main(){
    float kwh;
    float bill = 0.00;

    printf("How much electricity did you use this month?\n");
    scanf("%f", &kwh);

    if (kwh <= 500) {
        bill = (kwh * 0.18);
    } else if (kwh > 500 && kwh <= 1000) {
        bill = (500 * 0.18 + (kwh - 500) * 0.21);
    } else if (kwh > 1000) {
        bill = (500 * 0.18 + 500 * 0.21 + (kwh - 1000) * 0.25);
    }
    printf("Total electricity bill this month is %.2f EUR.\n", bill);
    
    return 0;
}