#include <stdio.h>

typedef int (*FuncPtr)(int);

int square(int num){
    return num * num;
}

int doubleValue(int num){
    return 2 * num;
}

void calculation(int a, FuncPtr op, const char* description) {
    printf("The %s value of %d is: %d\n", description, a, op(a));
}

int main(){

    FuncPtr op;
    int num;

    printf("Enter a number:\n");
    scanf("%d", &num);

    calculation(num, square, "square");
    calculation(num, doubleValue, "double");

    return 0;
}