#include <stdio.h>

int countUpBits(unsigned int num) {
    int k = 0;
    
    while (num > 0) {
        if (num & 1 == 1) {
            k++;
        }
        num = num >> 1;
    }
    return k;
}

int main() {

    int n;
    printf("Enter an unsigned integer:\n");
    scanf("%d", &n);

    printf("Amount of 1 bits: %d\n", countUpBits(n));

    return 0;
}