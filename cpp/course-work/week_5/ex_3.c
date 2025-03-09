#include <stdio.h>

float celsiusToFahrenheit(float celsius){
    float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

    return fahrenheit;
}

int main(){
    float celsius;

    printf("Enter temperature in Celsius:\n");
    scanf("%f", &celsius);

    float fahrenheit = celsiusToFahrenheit(celsius);

    printf("%.2f Celsius is equal to %.2f Fahrenheit", celsius, fahrenheit);
}