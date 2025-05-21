#include <stdio.h>

typedef float (*FunctPtr)(int, int);

float add(int a, int b) {
    return a + b;
}

float subtract(int a, int b) {
    return a - b;
}

float multiply(int a, int b) {
    return a * b;
}

float divide(int a, int b) {
    if (b == 0){
        printf("Error: Division by zero\n");
        return 0.0;
    }

    return a / b;
}

int main(){
    int choice;
    FunctPtr operation;
    float a, b, result;

    printf("Enter the first number:\n");
    scanf("%f", &a);

    printf("Enter the second number:\n");
    scanf("%f", &b);

    printf("Menu:\n");
    printf("1. Add\n2. Subtract\n3. Multiply\n4. Divide\n");

    printf("Enter your choice:\n");
    scanf("%d", &choice);

    if (choice == 1) {
        operation = add;
    } else if (choice == 2) {
        operation = subtract;
    } else if (choice == 3) {
        operation = multiply;
    } else if (choice == 4) {
        operation = divide;
    }

    result = operation(a,b);

    if (result != 0.0) {
        printf("Result: %.2f\n", operation(a, b));
    }

    return 0;
}