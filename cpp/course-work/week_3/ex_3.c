#include <stdio.h>
int main(){
    int value = (int)sizeof(double);
    char out_str[30];
    sprintf(out_str,"The size of double is %d bytes.", value);
    puts(out_str);
    return 0;
}