class Node:
    def __init__(self, key: int):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
        self.isMirrored = False

    def preorder(self):
        self.goThroughTree(self.root,"preorder")
        print()

    def postorder(self):
        self.goThroughTree(self.root,"postorder")
        print()

    def inorder(self):
        self.goThroughTree(self.root,"inorder")
        print()

    def goThroughTree(self, node, order):
        if node is None:
            return
        
        if self.isMirrored:
            left, right = (node.right, node.left)
        else:
            left, right = (node.left, node.right)

        if order == "preorder":
            print(node.key, end=" ")
            self.goThroughTree(left, order)
            self.goThroughTree(right, order)
        elif order == "postorder":
            elf.goThroughTree(left, order)
            self.goThroughTree(right, order)
            print(node.key, end=" ")
        elif order == "inorder":
            elf.goThroughTree(left, order)
            print(node.key, end=" ")
            self.goThroughTree(right, order)

    def breadthfirst(self):
        self.breadthfirstHelp(self.root)
        print()

    def breadthfirstHelp(self, node):
        if node is None:
            return

        queue = [node]
        while len(queue) > 0:
            currNode = queue[0]

            print(currNode.key, end=" ")

            if currNode.left:
                queue.append(currNode.left)
        
            if currNode.right:
                queue.append(currNode.right)
        
            queue.pop(0)
            
    def insert(self, key: int):
        self.root = self.insertHelp(self.root, key)

    def insertHelp(self, node, key):
        if node is None:
            return Node(key)
        elif key < node.key:
            node.left = self.insertHelp(node.left, key)
        elif key > node.key:
            node.right = self.insertHelp(node.right, key)
        return node 

    def search(self, key: int):
        return self.searchHelp(self.root, key)

    def searchHelp(self, node, key):
        if node is None:
            return False
        elif key < node.key:
            return self.searchHelp(node.left, key)
        elif key > node.key:
            return self.searchHelp(node.right, key)
        else:
            return True

    def remove(self, key):
        self.root = self.removeHelp(self.root, key)

    def removeHelp(self, node, key):
        if node is None:
            return None
        elif key < node.key:
            node.left = self.removeHelp(node.left, key)
        elif key > node.key:
            node.right = self.removeHelp(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            else:
                node.key = self.getmax(node.left)
                node.left = self.removemax(node.left)
        return node

    def removemax(self, node):
        if node.right is None:
            return node.left
        node.right = self.removemax(node.right)
        return node

    def getmax(self, node):
        if node.right is None:
            return node.key
        else:
            return self.getmax(node.right)
        
    def mirror(self):
        self.isMirrored = not self.isMirrored

        
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
 