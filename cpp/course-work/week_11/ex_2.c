#include <stdio.h>
#include <math.h>

int main() {

    float v, O, H, T;

    printf("Enter initial speed v (m/s):\n");
    scanf("%f", &v);

    printf("Enter launch angle θ (radians):\n");
    scanf("%f", &O);

    printf("Maximum Height:\n");
    
    H = (pow(v, 2) * pow(sin(O), 2)) / (2 * 9.8);

    printf("--Exact: %.2f m\n", H);
    printf("--Floor: %.2f m\n", floor(H));
    printf("--Ceil : %.2f m\n", ceil(H));

    printf("\nTotal Flight Time:\n");
    
    T = (2 * v * sin(O)) / 9.8;

    printf("--Exact: %.2f s\n", T);
    printf("--Floor: %.2f s\n", floor(T));
    printf("--Ceil : %.2f s\n", ceil(T));

    return 0;
}