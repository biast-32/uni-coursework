#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX = 100

int main() {
    
    FILE *fp;
    char filename[]= "chap6_task4_output.txt";

    fp = fopen(filename, "w");

    if (fp == NULL) {
        printf("Error opening file: %s\n", filename);
        return 1;
    }

    char name[100], gender[100], choice[100];
    int age;

    do {
    
        printf("Enter name (without spaces):\n");
        scanf("%s", &name);

        printf("Enter age: \n");
        scanf("%d", &age);

        printf("Enter gender: \n");
        scanf("%s", &gender);

        fprintf(fp, "%s,%d,%s\n", name, age, gender);

        printf("Do you want to add another person? (y/n):\n");
        scanf("%s", &choice);
    
    } while (strcmp(choice, "y") == 0);

    if (strcmp(choice, "y") != 0) {
      printf("Data saved successfully to %s.\n", filename);
    }

    fclose(fp);

    return 0;
}