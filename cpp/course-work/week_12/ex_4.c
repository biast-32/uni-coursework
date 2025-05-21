#include <stdio.h>

void printBinary(unsigned int num) {
    char aux[32];
    int poz = 0;

    while (num > 0) {
        if ((num & 1) == 1) {
            aux[poz] = '1';
        } else {
            aux[poz] = '0';
        }

        poz++;
        num = num >> 1;
    }

    for (int i = poz - 1; i >= 0; i--) {
        putchar(aux[i]);
    }
}

int main() {
    int num;

    printf("Enter a non-negative integer:\n");
    scanf("%d", &num);

    printf("Binary representation: ");
    printBinary(num);

    return 0;
}