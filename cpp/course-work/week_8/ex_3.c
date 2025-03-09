#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

typedef struct {
    Node *top;
} Stack;

Stack *createStack() {
    Stack* s = (Stack*)malloc(sizeof(Stack));
    s->top = NULL;
    printf("Stack created successfully!\n");
    return s;
}

int StackEmpty(Stack *s) {
    return(s->top == NULL);
}

void pushStack(Stack *s, int key) {
    Node *new_ptr;
    new_ptr = (Node*)malloc(sizeof(Node));
    new_ptr->data = key;
    new_ptr->next = NULL;

    new_ptr->next = s->top;
    s->top = new_ptr;
}

int popStack(Stack *s) {
    if(StackEmpty(s)){
        return -1;
    }

    Node *first;
    first = s->top;
    int key = s->top->data;
    s->top = s->top->next;

    printf("Popped element: %d\n", key);

    free(first);
    return(key);
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
    Stack *S = NULL;
    int choice;
    int nr;
    int first_time = 1;

    do {
        if (first_time){
            printf("Menu:\n");
            first_time = 0;
        } else {
            printf("\nMenu:\n");
        }
        printf("1.Create an empty stack\n2.Push element to a stack\n3.Pop element from a stack\n4.Print stack contents\n0.Exit\nEnter your choice:\n");
        scanf("%d", &choice);
        
        switch(choice) {
            case 1:
                S = createStack();
                break;

            case 2:
                if(S == NULL) {
                    printf("The stack does not exist, please create a stack first!\n");
                } else {
                    printf("Enter an integer to be pushed:\n");
                    scanf("%d", &nr);
                    pushStack(S, nr);
                }
                break;

            case 3:
            if(S == NULL) {
                printf("The stack does not exist, please create a stack first!\n");
            } else {
                popStack(S);
            }
            break;

            case 4:
            if(S == NULL) {
                printf("The stack does not exist, please create a stack first!\n");
            } else if (S->top == NULL) {
                printf("Stack is empty!\n");
            } else {
                print_list(S->top);
            }
            break;
            
            case 0:
                printf("Exiting program...\n");
                break;

            default:
                printf("Invalid choice!\n");
        }

    } while(choice != 0);

    return 0;
}