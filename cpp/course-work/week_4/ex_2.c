#include <stdio.h>

int main(){
    float kwh;
    float bill = 0.00;

    printf("How much electricity did you use this month?\n");
    scanf("%f", &kwh);

    int tier = (int)kwh / 500;

    switch (tier) {
        case 0:
            bill = (kwh * 0.18);
            break;
        case 1:
            bill = (500 * 0.18 + (kwh - 500) * 0.21);
            break;
        default:
             bill = (500 * 0.18 + 500 * 0.21 + (kwh - 1000) * 0.25);
             break;
    }
   
    printf("Total electricity bill this month is %.2f EUR.\n", bill);
    
    return 0;
}