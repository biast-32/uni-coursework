#include <stdio.h>
#include <math.h>

int main() {

    int r;
    float a, L;

    printf("Enter the radius of the circle:\n");
    scanf("%d", &r);

    printf("Enter the angle in degrees:\n");
    scanf("%f", &a);

    L = 2 * M_PI * r * (a / 360);

    printf("The circular arc length is %.2f\n", L);

    return 0;
}