#include <stdio.h>
#include <string.h>
#include <stdlib.h>

//////////////// 2.0 STRUCTURES ////////////////

typedef struct node { 
    char key[30]; 
    char description[200]; 
    struct node *left; 
    struct node *right; 
    } Node;

typedef struct { 
    Node *root; 
    } Tree; 



//////////////// NODE FUNCTIONS ////////////////

//////////////////////////////// 2.1 CREATE NODE ////////////////////////////////

int isValidKey(const char* key);

int isValidDescription(const char* description);

Node* createNode(const char* key, const char* description) {
    Node* newNode = (Node*)malloc(sizeof(Node));

    if (newNode == NULL) {
        printf("Error 1.1: Memory allocation failed =<\n");
        return NULL;
    } else {
        printf ("Memory allocation successful =D\n");
    }

    strcpy (newNode->key, key);
    strcpy (newNode->description, description);
    
    newNode->left = NULL;
    newNode->right = NULL;

    return newNode;
}

int isValidKey(const char* key) {
    if (key == NULL || strlen(key) == 0) {
        printf("Error 1.2.4: Key is empty =< Try again\n");
        return 0;
    }

    if (strlen(key) > 29) {
        printf("Error 1.2.1: Key has more than 29 characters =< Try again\n");
        return 0;
    }

    for (int i = 0; key[i] != '\0'; i++) {
        if (key[i] == ' ') {
            printf("Error 1.2.2: Key contains space(s) =< Try again\n");
            return 0;
        } else if (key[i] == ':' || key[i] == '.') {
            printf("Error 1.2.3: Key contains invalid character(s) =< Try again\n");
            return 0;
        }
    }

    return 1;
}

int isValidDescription(const char* description) {
    if (description == NULL || strlen(description) == 0) {
        printf("Error 1.3.3: Description is empty =< Try again\n");
        return 0;
    }

    if (strlen(description) > 199) {
        printf("Error 1.3.1: Description has more than 199 characters =< Try again\n");
        return 0;
    }

    for (int i = 0; description[i] != '\0'; i++) {
        if (description[i] ==':' || description[i] == '.') {
            printf("Error 1.3.2: Description contains invalid character(s) =< Try again\n");
            return 0;
        }
    }

    return 1;
}


//////////////////////////////// 2.2 PRINT NODE ////////////////////////////////

void printNode(Node* node) {
    if (node == NULL) {
        printf("Error 2.1: The node is NULL =<\n");
    } else {
        printf("%s:%s.\n", node->key, node->description);
    }
}



//////////////// TREE FUNCTIONS ////////////////

//////////////////////////////// 2.3 CREATE TREE ////////////////////////////////

Tree* createTree() {
    Tree* newTree = (Tree*)malloc(sizeof(Tree));

    if (newTree == NULL) {
        printf("Error 3.1: Memory allocation failed =<\n");
        return NULL;
    }

    newTree->root = NULL;

    return newTree;
}


//////////////////////////////// 2.4 TREE EMPTY ////////////////////////////////

int treeEmpty(Tree* tree) {
    if (tree == NULL || tree->root == NULL) {
        return 1;
    }

    return 0;
}


//////////////////////////////// 2.5 INSERT NODE ////////////////////////////////

void insertNode(Tree* tree, Node* newNode) {
    if (tree->root == NULL) {
        tree->root = newNode;
        return;
    } 

    Node* current = tree->root;
    Node* parent = NULL;

    while (current != NULL){
        parent = current;

        if (strcmp(newNode->key, current->key) < 0) {
           current = current->left;
           if (current == NULL){
            parent->left = newNode;
            return;
           }
        } else if (strcmp(newNode->key, current->key) > 0) {
            current = current->right;
            if (current == NULL){
             parent->right = newNode;
             return;
            }
         } else {
            return;
         }
    }
}


//////////////////////////////// 2.6 SEARCH ////////////////////////////////

Node* search(Tree* tree, char* key) {
    Node* current = tree->root;

    while (current != NULL){
        if (strcmp(key, current->key) < 0) {
            current = current->left;
        } else if (strcmp(key, current->key) > 0) {
            current = current->right;
        } else {
            return current;
        }
    }
    return NULL;
}


//////////////////////////////// 2.7 DELETE ////////////////////////////////

void delete(Tree* tree, char* key) {
    Node* byeNode = search(tree, key);

    if (byeNode == NULL){
        printf("Error 7.1: Key not found =<\n");
        return;
    }

    Node* parent = NULL;
    Node* current = tree->root;

    while (current != byeNode && current != NULL) {
        parent = current;
        if (strcmp(key, current->key) < 0) {
            current = current->left;
        } else {
            current = current->right;
        }
    }

    if (byeNode->left == NULL && byeNode->right == NULL) {
        if (parent == NULL) {
            tree->root = NULL;
        } else if (parent->left == byeNode) {
            parent->left = NULL;
        } else {
            parent->right = NULL;
        }
        free(byeNode);

    } else if (byeNode->left != NULL && byeNode->right == NULL) { 
        if (parent == NULL){
            tree->root = byeNode->left;
        } else if (parent->left == byeNode) {
            parent->left = byeNode->left;
        } else {
            parent->right = byeNode->left;
        }
        free(byeNode);

    } else if (byeNode->left == NULL && byeNode->right != NULL) {
        if (parent == NULL){
            tree->root = byeNode->right;
        } else if (parent->left == byeNode) {
            parent->left = byeNode->right;
        } else {
            parent->right = byeNode->right;
        }
        free(byeNode);

    } else {
        Node* nextParent = byeNode;
        Node* next = byeNode->right;

        while (next->left != NULL) {
            nextParent = next;
            next = next->left;
        }

        strcpy(byeNode->key, next->key);
        strcpy(byeNode->description, next->description);

        if (nextParent->left == next) {
            nextParent->left = next->right;
        } else {
            nextParent->right = next->right;
        }
        free(next);
    }
}

//////////////////////////////// 2.8 INORDER PRINT ////////////////////////////////

void inorderPrintHelper(Node* node, int* count, int n);

void inorderPrint(Tree* tree, int n){
    int count = 0; 

    inorderPrintHelper(tree->root, &count, n);
}

void inorderPrintHelper(Node* node, int* count, int n){
    if (node == NULL || *count == n) {
        return;
    }

    inorderPrintHelper(node->left, count, n);
    
    if (*count < n) {
        printNode(node);
        (*count)++;
    }

    if (*count < n) {
    inorderPrintHelper(node->right, count, n);
    }
}


//////////////////////////////// 2.9 LOAD TEXT FILE ////////////////////////////////

void loadTextFile(Tree* tree, char* filename) {
    FILE* fp;
    
    fp = fopen(filename, "r");

    if (fp == NULL) {
        printf("Error 9.1: File not found =<\n");
        return;
    }

    char line[500];

    while (fgets(line, sizeof(line), fp)) {
        line[strcspn(line, "\n")] = '\0';

        if (strlen(line) == 0) {
            printf("Error 9.2: Blank line =<\n");
            continue;
        }

        int colonCount = 0;
        int dotCount = 0;

        for (int i = 0; line[i] != '\0'; i++) {
            if (line[i] == ':') {
                colonCount++;
            }

            if (line[i] == '.') {
                dotCount++;
            }
        }

        if (colonCount != 1 || dotCount != 1) {
            printf("Error 9.3.1: Invalid format --> Incorrect number of `:` or `.` =<\n");
            continue;
        }
        
        char *colonPosition = strchr(line, ':');
        char *dotPosition = strchr(line, '.');
    
        if (!colonPosition || !dotPosition || dotPosition != &line[strlen(line) - 1]) {
            printf("Error 9.3.2: Invalid format --> Missing or misplaced `:` or `.` =<\n");
            continue;
        }
    
        if (colonPosition == line || *(colonPosition - 1) == ' ' || *(colonPosition + 1) == ' ') {
            printf("Error 9.3.3: Invalid format --> Spaces around `:` =<\n");
            continue;
        }
    
        char *key, *description;
    
        key = strtok(line, ":");
        description = strtok(NULL, ".");
    
        if (!key || !description || strlen(key) == 0 || strlen(description) == 0 || strchr(key, ' ')) {
            printf("Error 9.3.4: Invalid format --> Missing or invalid key or description =<\n");
            continue;
        }

        Node* newNode = createNode(key, description);

        if (newNode == NULL) {
            printf("Error 9.4: Memory allocation failed =<\n");
            continue;
        }

        insertNode(tree, newNode);
    }

    fclose(fp);
}


//////////////////////////////// 2.10 STORE TEXT FILE ////////////////////////////////

void writeInPreorder(Node* node, FILE* fp);

void storeTextFile(Tree* tree, char* filename) {
    FILE* fp;
    
    fp = fopen(filename, "w");

    if (fp == NULL){
        printf("Error 10.1: File unable to open =<\n");
        return;
    }

    writeInPreorder(tree->root, fp);

    fclose(fp);
}

void writeInPreorder(Node* node, FILE* fp){
    if (node == NULL || fp == NULL) {
        return;
    }

    fprintf(fp, "%s:%s.\n", node->key, node->description);

    writeInPreorder(node->left, fp);
    writeInPreorder(node->right, fp);
}


//////////////////////////////// 2.11 FREE TREE ////////////////////////////////

void freeTreeHelper(Node* node);

void freeTree(Tree* tree) {
    if (treeEmpty(tree)) {
        return;
    }

    freeTreeHelper(tree->root);
    tree->root = NULL;
}

void freeTreeHelper(Node* node) {
    if (node == NULL){
        return;
    }

    freeTreeHelper(node->left);
    freeTreeHelper(node->right);
    
    free(node);
}



//////////////////////////////// 2.12 MAIN ////////////////////////////////

int main() {
    Tree* newTree = createTree();
    
    int choice = -1;

        printf("Welcome to the Binary Search Tree program =D\n");

    while(1){
        printf("\nMenu:\n");
        printf("1: CREATE NODE\n");
        printf("2: PRINT NODE\n");
        printf("4: TREE EMPTY\n");
        printf("6: SEARCH\n");
        printf("7: DELETE\n");
        printf("8: INORDER PRINT\n");
        printf("9: LOAD TEXT FILE\n");
        printf("10: STORE TEXT FILE\n");
        printf("11: FREE TREE\n");
        printf("0: EXIT\n");
    
        printf("\nWhat would you like to do? Please enter your choice:\n");
        scanf("%d", &choice);

        while(getchar() != '\n');

        switch(choice)
        {
            case 1:
                char case1Key[30];
                char case1Description[200];

                printf("Please enter the key (a single word, no spaces, no ':' or '.', max 29 characters):\n");

                while(1) {
                    fgets(case1Key, sizeof(case1Key), stdin);
                    case1Key[strcspn(case1Key, "\n")] = '\0';
                    if (isValidKey(case1Key)) {
                        break;
                    }
                }

                if (search(newTree, case1Key) != NULL) {
                    printf("Error 12.1.1: Node with %s key already exists =<\n", case1Key);
                    break;
                }

                printf("Please enter the description (no ':' or '.', max 199 characters):\n");

                while(1) {
                    fgets(case1Description, sizeof(case1Description), stdin);
                    case1Description[strcspn(case1Description, "\n")] = '\0';
                    if (isValidDescription(case1Description)) {
                        break;
                    }
                }
                
                Node* newNode = createNode(case1Key, case1Description);
                insertNode(newTree, newNode);

                break;

            case 2:
                char case2Key[30];

                printf("Please enter the key of the node to be printed:\n");
                fgets(case2Key, sizeof(case2Key), stdin);
                case2Key[strcspn(case2Key, "\n")] = '\0';


                Node* case2Node = search(newTree, case2Key);
                if (case2Node == NULL) {
                    printf("Error 12.2.1: No node with '%s' key was found =<\n", case2Key);
                    break;
                } else {
                    printNode(case2Node);
                    break;
                }

                break;

            case 4:
                if (treeEmpty(newTree)) {
                    printf("The tree is empty.\n");
                } else {
                    printf("The tree is not empty.\n");
                }

                break;

            case 6:
                if (treeEmpty(newTree)) {
                    printf("Error 12.6.1: The tree is empty =<\n");
                    break;
                }

                char case6Key[30];
                Node* case6Node = NULL;

                printf("Please enter the key of the node to be searched:\n");
                fgets(case6Key, sizeof(case6Key), stdin);
                case6Key[strcspn(case6Key, "\n")] = '\0';

                case6Node = search(newTree, case6Key);

                if (case6Node != NULL) {
                    printNode(case6Node);
                } else {
                    printf("Error 12.6.2: Node with key '%s' does not exist in the tree =<\n", case6Key);
                }

                break;

            case 7:
                if (treeEmpty(newTree)) {
                    printf("Error 12.7.1: The tree is empty =<\n");
                    break;
                }

                char case7Key[30];

                printf("Please enter the key of the node to be deleted:\n");
                fgets(case7Key, sizeof(case7Key), stdin);
                case7Key[strcspn(case7Key, "\n")] = '\0';

                if (search(newTree, case7Key) != NULL) {
                    delete(newTree, case7Key);
                    printf("Node successfully deleted =D\n");
                } else {
                    printf("Error 12.7.2: Node with key '%s' does not exist in the tree =<\n", case7Key);
                }

                break;

            case 8:
                if (treeEmpty(newTree)) {
                    printf("Error 12.8.1: The tree is empty =<\n");
                    break;
                }

                int n;

                printf("Please enter the maximum number of nodes from the tree to be printed inorder:\n");
                scanf("%d", &n);

                inorderPrint(newTree, n);

                break;

            case 9:
                char case9File[100];

                printf("Please enter the .txt file to be loaded:\n");
                fgets(case9File, sizeof(case9File), stdin);
                case9File[strcspn(case9File, "\n")] = '\0';

                loadTextFile(newTree, case9File);

                break;

            case 10:
                if (treeEmpty(newTree)) {
                    printf("Error 12.10.1: The tree is empty =<\n");
                    break;
                }

                char case10File[] = "storage.txt";

                storeTextFile(newTree, case10File);

                printf("Tree successfully stored =D\n");

                break;

            case 11:
                if (treeEmpty(newTree)) {
                    printf("Error 12.11.1: The tree is empty =<\n");
                    break;
                }

                freeTree(newTree);

                printf("Tree successfully freed =D\n");

                break;

            case 0:
                free(newTree);

                printf("Thank you for using the program. Bye!\n");
                return 0;

            default: 
                printf("Error 12.0: Invalid choice =< Please choose a valid number\n");
                break;
        }
    }

    return 0;
}