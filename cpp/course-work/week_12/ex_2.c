#include <stdio.h>

struct Student {
    int ID;
    char name[50];
    float GPA;
};

int main() {

    FILE *file = fopen("students.bin", "rb");

    if (file == NULL) {
        printf("Error: Opening file failed =<\n");
        return 1;
    }

    struct Student readData;

    fseek(file, 2 * sizeof(struct Student), SEEK_SET);

    fread(&readData, sizeof(struct Student), 1, file);
    printf("ID: %d, Name: %s, GPA: %.2f\n", readData.ID, readData.name, readData.GPA);

    fclose(file);

    return 0;
}