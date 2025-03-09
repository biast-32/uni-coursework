#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int main() {
    FILE *fp;
    char filename[MAX];

    printf("Enter the file name to be read:\n");
    scanf("%s", filename);

    fp = fopen(filename, "r");

    if (fp == NULL) {
        printf("Error opening file: %s\n", filename);
        return 1;
    }

    char line[200];
    fgets(line, sizeof(line), fp);

    printf("\nReading CSV file...\n");

    while (fgets(line, sizeof(line), fp)) {
        char *year_str, *f_name, *l_name, *gender;
        int year, age;

        year_str = strtok(line, ",");
        f_name = strtok(NULL, ",");
        l_name = strtok(NULL, ",");
        gender = strtok(NULL, ",\n\r");

        year = atoi(year_str);
        age = 2100 - year;

        printf("Name: %s %s, Gender: %s, Birth Year: %d, Age in 2100: %d\n", f_name, l_name, gender, year, age);
    }

    fclose(fp);
    
    return 0;
}