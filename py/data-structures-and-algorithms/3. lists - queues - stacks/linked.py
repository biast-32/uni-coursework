class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next
    

class LinkedList:
    def __init__(self):
        self.head = None
  

    def print(self):
        curr = self.head
        elements = []

        while curr:
            elements.append(str(curr.data))
            curr = curr.next
        print(' -> '.join(elements))
        

    def append(self, data):
        new_node = Node(data)

        if self.head is None:
            self.head = new_node
        else:
            curr = self.head
            while curr.next:
                curr = curr.next
            curr.next = new_node
    

    def insert(self, data, i):
        new_node = Node(data)

        if i == 0:
            new_node.next = self.head
            self.head = new_node
        else:
            curr = self.head
            k = 0
            while curr and k < i - 1:
                curr = curr.next
                k += 1
            if curr is None:
                return
            new_node.next = curr.next
            curr.next = new_node


    def delete(self, i):
        if self.head is None:
            return None
        
        if i == 0:
            del_node = self.head
            self.head = self.head.next
            return del_node.data
        else:
            curr = self.head
            k = 0
            while curr and k < i - 1:
                curr = curr.next
                k += 1
            if curr is None or curr.next is None:
                return None
            del_node = curr.next
            curr.next = del_node.next
            return del_node.data
        

    def index(self, data):
        if self.head is None:
            return -1
        
        curr = self.head
        i = 0
        while curr:
            if curr.data == data:
                return i
            curr = curr.next
            i += 1
        return -1
            
    
    def swap(self, i, j):
        if self.head is None or i < 0 or j < 0 or i == j:
            return
        
        before_i = before_j = None
        node_i = node_j = self.head

        k = 0
        while node_i and k < i:
            before_i = node_i
            node_i = node_i.next
            k += 1
        if node_i is None:
            return
        
        k = 0
        while node_j and k < j:
            before_j = node_j
            node_j = node_j.next
            k += 1
        if node_j is None:
            return
        
        if before_i:
            before_i.next = node_j
        else:
            self.head = node_j

        if before_j:
            before_j.next = node_i
        else:
            self.head = node_i

        node_i.next, node_j.next = node_j.next, node_i.next


    def isort(self):
        if self.head is None or self.head.next is None:
            return
        
        curr = self.head
        sorted_list_head = None
        while curr:
            next_node = curr.next

            if sorted_list_head is None or sorted_list_head.data >= curr.data:
                curr.next = sorted_list_head
                sorted_list_head = curr
            else:
                sorted_list_curr = sorted_list_head

                while sorted_list_curr.next and sorted_list_curr.next.data < curr.data:
                    sorted_list_curr = sorted_list_curr.next

                curr.next = sorted_list_curr.next
                sorted_list_curr.next = curr
            
            curr = next_node

        self.head = sorted_list_head


if __name__ == "__main__":
    L = LinkedList()
    for num in (3, 5, 2, 7, 8, 10, 6):
        L.append(num)
    L.print()
    L.isort()
    L.print()