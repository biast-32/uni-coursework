#include <stdio.h>
#define PI 3.14159
int main(){
    float radius, area;
    printf("Enter the radius of the circle:\n");
    scanf("%f", &radius);
    printf("The current value of pi is: %.5f\n", PI);
    printf("The radius of the circle is: %.5f\n", radius);
    area = radius*radius*PI;
    printf("The area of the circle is: %.6f\n", area);
    return 0;
}