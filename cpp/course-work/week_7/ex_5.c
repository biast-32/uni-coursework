#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 1000

typedef struct {
    int birthYear;
    char firstName[50];
    char lastName[50];
    char gender[20];
} Person;

void sortRecordsByBirthYear(Person people[], int count) {
    for (int i = 0; i < count - 1; i++) {
        for (int j = 0; j < count - i - 1; j++) {
            if (people[j].birthYear > people[j + 1].birthYear) {
                Person temp = people[j];
                people[j] = people[j + 1];
                people[j + 1] = temp;
            }
        }
    }
}

int main() {
    FILE *fp;
    char filename[MAX];
    int recordCount = 0;
    Person people[MAX];

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
        char *year_str, *f_name, *l_name,*gender;

        year_str = strtok(line, ",");
        f_name = strtok(NULL, ",");
        l_name = strtok(NULL, ",");
        gender = strtok(NULL, ",\n\r");

        people[recordCount].birthYear = atoi(year_str);
        strcpy(people[recordCount].firstName, f_name);
        strcpy(people[recordCount].lastName, l_name);
        strcpy(people[recordCount].gender, gender);

        recordCount++;

    }

    fclose(fp);

    sortRecordsByBirthYear(people, recordCount);

    printf("\nSorted Records (by Birth Year):\n");
    for (int i = 0; i < recordCount; i++) {
        printf("Birth Year: %d, Name: %s %s, Gender: %s\n", people[i].birthYear,people[i].firstName, people[i].lastName, people[i].gender);
    }
    
    return 0;
}