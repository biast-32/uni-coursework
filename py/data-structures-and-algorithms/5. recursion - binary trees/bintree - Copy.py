class Node:
    def _init_(self, key: int):
        self.key = key
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None
        self.is_mirrored = False

    def insert(self, key: int):
        if self.root is None:
            self.root = Node(key)
        else:
            self._insert_recursive(self.root, key)

    def _insert_recursive(self, node: Node, key: int):
        if key < node.key:
            if node.left is None:
                node.left = Node(key)
            else:
                self._insert_recursive(node.left, key)
        elif key > node.key:
            if node.right is None:
                node.right = Node(key)
            else:
                self._insert_recursive(node.right, key)

    def preorder(self):
        self._traverse(self.root, "pre")
        print()

    def inorder(self):
        self._traverse(self.root, "in")
        print()

    def postorder(self):
        self._traverse(self.root, "post")
        print()

    def _traverse(self, node: Node, order: str):
        if node is None:
            return
        left, right = (node.right, node.left) if self.is_mirrored else (node.left, node.right)

        if order == "pre":
            print(node.key, end=" ")
            self._traverse(left, order)
            self._traverse(right, order)
        elif order == "in":
            self._traverse(left, order)
            print(node.key, end=" ")
            self._traverse(right, order)
        elif order == "post":
            self._traverse(left, order)
            self._traverse(right, order)
            print(node.key, end=" ")

    def search(self, key: int) -> bool:
        return self._search_recursive(self.root, key)

    def _search_recursive(self, node: Node, key: int) -> bool:
        if node is None:
            return False
        if key == node.key:
            return True
        elif key < node.key:
            return self._search_recursive(node.left, key)
        else:
            return self._search_recursive(node.right, key)

    def remove(self, key: int):
        self.root = self._remove_recursive(self.root, key)

    def _remove_recursive(self, node: Node, key: int) -> Node:
        if node is None:
            return node
        if key < node.key:
            node.left = self._remove_recursive(node.left, key)
        elif key > node.key:
            node.right = self._remove_recursive(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            max_node = self._get_max_node(node.left)
            node.key = max_node.key
            node.left = self._remove_recursive(node.left, max_node.key)
        return node

    def _get_max_node(self, node: Node) -> Node:
        current = node
        while current.right is not None:
            current = current.right
        return current

    def breadthfirst(self):
        if self.root is None:
            return
        queue = deque([self.root])
        while queue:
            node = queue.popleft()
            print(node.key, end=" ")
            left, right = (node.right, node.left) if self.is_mirrored else (node.left, node.right)
            if left: queue.append(left)
            if right: queue.append(right)
        print()

    def mirror(self):
        self.is_mirrored = not self.is_mirrored


if __name__ == "__main__":
    Tree = BST()
    keys = [5, 9, 1, 3, 7, 7, 4, 6, 2]

    for key in keys:
        Tree.insert(key)

    Tree.preorder()
    Tree.mirror()
    Tree.preorder()

    Tree.insert(8)
    Tree.remove(3)
    print(Tree.search(2))
    Tree.preorder()
    Tree.mirror()
    Tree.preorder()