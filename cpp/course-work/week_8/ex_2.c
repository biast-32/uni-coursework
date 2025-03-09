#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

typedef struct {
    Node * head;
} List;

List *create() {
    List *L = (List*)malloc(sizeof(List));
    L->head = NULL;
    return L;
}

void insert(List *L, int key) {
    Node* new_ptr;
    new_ptr = (Node*)malloc(sizeof(Node));
    new_ptr->data = key;
    new_ptr-> next = L->head;
    L->head = new_ptr;
}

void reverse(List *L) {
    Node *prev = NULL;
    Node *curr = L->head;
    Node *next = NULL;

    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    L->head = prev;
}

void print_list(Node *ptr) {
    puts("Printing...");
    int position = 1;
    while (ptr != NULL) {
        printf("Node position %d: %d\n", position, ptr->data);
        position = position + 1;
        ptr = ptr->next;
    }
}

int main() {
    List *L = create();
    int element;
    char choice = 'y';
   
    while(choice == 'y'){
        printf("Enter an integer to add:\n");
        scanf("%d", &element);
        insert(L, element);

        printf("Do you want to add more numbers? (y/n):\n");
        scanf(" %c", &choice);
    }

    printf("\nOriginal List:\n");
    print_list(L->head);

    reverse(L);

    printf("\nReversed List:\n");
    print_list(L->head);

    return 0;
}