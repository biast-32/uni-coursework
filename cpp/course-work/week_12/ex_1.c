#include <stdio.h>

int main() {
    char str[50];
    FILE *fp = fopen("string.bin", "wb");

    if (fp == NULL) {
        printf("Error: Opening file failed =<\n");
        return 1;
    }

    printf("Enter a string (max 49 characters):\n");
    fgets(str, sizeof(str), stdin);
    fwrite(&str, sizeof(str), 1, fp);
    fclose(fp);


    int n;
    fp = fopen("string.bin", "ab");

    if (fp == NULL) {
        printf("Error: Opening file failed =<\n");
        return 1;
    }

    printf("Enter an integer:\n");
    scanf("%d", &n);
    fwrite(&n, sizeof(int), 1, fp);
    fclose(fp);


    fp = fopen("string.bin", "rb");

    if (fp == NULL) {
        printf("Error: Opening file failed =<\n");
        return 1;
    }

    printf("---\n");

    fread(str, sizeof(char), 50, fp);
    printf("String: %s", str);

    fread(&n, sizeof(int), 1, fp);
    printf("Integer: %d", n);
    
    fclose(fp);

    return 0;
}