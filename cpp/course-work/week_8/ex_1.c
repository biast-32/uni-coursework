#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    char name[10];
    char species[10];
    int age;
} Pet;

Pet *create_pet(char *name, char *species, int age) {
    Pet *new_pet = (Pet*)malloc(sizeof(Pet));

    if (new_pet == NULL) {
        puts("Memory allocation failed");
        return NULL;
    }

    strcpy(new_pet->name, name);
    strcpy(new_pet->species, species);
    new_pet->age = age;

    return new_pet;
}

int main() {
    int nr_pets = 0;

    printf("How many pets would you like to add?\n");
    scanf("%d", &nr_pets);

    Pet **pets = (Pet**)malloc(nr_pets * sizeof(Pet*));

    if (pets == NULL) {
        puts("Memory allocation failed");
        return 1;
    }

    for (int i = 0; i < nr_pets; i++) {

        char name[10];
        char species[10];
        int age;

        printf("Enter the name for pet %d:\n", i + 1);
        scanf("%s", name);

        printf("Enter the species for pet %d:\n", i + 1);
        scanf("%s", species);

        printf("Enter the age for pet %d:\n", i + 1);
        scanf("%d", &age);

        pets[i] = create_pet(name, species, age);
        
        if (pets[i] == NULL) {
            puts("Memory allocation failed");
            return 1;
        }
    }

    printf("\nPets:\n");

    for (int i = 0; i < nr_pets; i++) {
        printf("No.%d Name: %s, Species: %s, Age: %d\n", i + 1, pets[i]->name, pets[i]->species, pets[i]->age);
    }

    free(pets);

    return 0;
}