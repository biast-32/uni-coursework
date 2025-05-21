#include <stdio.h>

int isPowerOfTwo(unsigned int num) {
   return (num & (num - 1)) == 0;
}

int main() {

    unsigned int n;

    printf("Enter an unsigned integer:\n");
    scanf("%u", &n);

    if (isPowerOfTwo(n) == 0) {
        printf("%u is not a power of 2.", n);
    } else {
        printf("%u is a power of 2.", n);
    }

    return 0;
}