class AVLNode:
    # Initialize new node
    def __init__(self, key):
        self.key = key
        self.left = self.right = None
        self.balance = 0


class AVL:
    # Initialize new tree
    def __init__(self) -> None:
        self.root = None
        self.is_balanced = True

    # Inserts a new key to the search tree
    def insert(self, key):
        self.root = self.insert_help(self.root, key)

    def insert_help(self, root, key):
        if not root:
            root = AVLNode(key)
            self.is_balanced = False
            return root

        if key < root.key:
            root.left = self.insert_help(root.left, key)
            if not self.is_balanced: # Check for possible rotations
                if root.balance >= 0: # No Rotations needed
                    root.balance -= 1
                    self.is_balanced = root.balance == 0
                else: # Rotation(s) needed
                    if root.left.balance == -1:
                        root = self.right_rotation(root) # Single
                    else:
                        root = self.left_right_rotation(root) # Double
                    self.is_balanced = True
        elif key > root.key:
            root.right = self.insert_help(root.right, key)
            if not self.is_balanced:
                if root.balance <= 0:
                    root.balance += 1
                    self.is_balanced = root.balance == 0
                else:
                    if root.right.balance == 1:
                        root = self.left_rotation(root)
                    else:
                        root = self.right_left_rotation(root)
                    self.is_balanced = True

        return root

    # Single rotation: life rotation around root
    def right_rotation(self, root):
        child = root.left # Set variable for child node
        root.left = child.right # Rotate
        child.right = root
        root.balance = 0
        child.balance = root.balance = 0 # Fix balance variables
        return child

    # Single rotation: right rotation around root
    def left_rotation(self, root):
        child = root.right # Set variable for child node
        root.right = child.left # Rotate
        child.left = root
        child.balance = root.balance = 0 # Fix balance variables
        return child

    # Double rotation: left rotation around child node followed by right rotation around root
    def left_right_rotation(self, root: AVLNode):
        child = root.left
        grandchild = child.right # Set variables for child node and grandchild node
        child.right = grandchild.left # Rotate
        grandchild.left = child
        root.left = grandchild.right
        grandchild.right = root
        if grandchild.balance == -1:
            root.balance = 1
            child.balance = 0 
        elif grandchild.balance == 1:
            child.balance = -1
            root.balance = 0
        else:
            root.balance = 0
            child.balance = 0
        grandchild.balance = 0
        return grandchild

    # Double rotation: left rotation around child node followed by right rotation around root
    def right_left_rotation(self, root: AVLNode):
        child = root.right
        grandchild = child.left
        child.left = grandchild.right # Set variables for child node and grandchild node
        grandchild.right = child
        root.right = grandchild.left # Rotate
        grandchild.left = root
        if grandchild.balance == 1:
            root.balance = -1
            child.balance = 0
        elif grandchild.balance == -1:
            child.balance = 1
            root.balance = 0
        else:
            root.balance = 0
            child.balance = 0
        grandchild.balance = 0
        return grandchild

    def preorder(self):
        self.preorder_help(self.root)
        print()

    def preorder_help(self, node):
        if node:
            balance_sign = ""
            if node.balance > 0:
                balance_sign = "+"
            elif node.balance < 0:
                balance_sign = "-"
            print(f"{node.key}{balance_sign}", end=" ")
            self.preorder_help(node.left)
            self.preorder_help(node.right)


if __name__ == "__main__":
    Tree = AVL()
    for key in [9, 10, 11, 3, 2, 6, 4, 7, 5, 1]:
        Tree.insert(key)
    Tree.preorder()
