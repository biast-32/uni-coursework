class Graph:
    def __init__(self, n):
        self.n = n
        self.edges = []

    def add(self, u, v, w):
        self.edges.append((w, u, v))

    def remove(self, u, v):
        new_edges = []
        for weight, vertex1, vertex2 in self.edges:
            if not (vertex1 == u and vertex2 == v or vertex1 == v and vertex2 == u):
                new_edges.append((weight, vertex1, vertex2))
        self.edges = new_edges

    def find_set(self, parent, v):
        if parent[v] != v:
            parent[v] = self.find_set(parent, parent[v])
        return parent[v]

    def union(self, parent, size, a, b):
        root_a = self.find_set(parent, a)
        root_b = self.find_set(parent, b)

        if root_a != root_b:
            if size[root_a] > size[root_b]:
                parent[root_b] = root_a
            elif size[root_a] < size[root_b]:
                parent[root_a] = root_b
            else:
                parent[root_b] = root_a
                size[root_a] += 1

    def min_cost(self):
        self.edges.sort()

        parent = [i for i in range(self.n)]
        size = [0] * self.n

        mst_weight = 0
        mst_edges = 0

        for w, u, v in self.edges:
            if self.find_set(parent, u) != self.find_set(parent, v):
                self.union(parent, size, u, v)
                mst_weight += w
                mst_edges += 1
                if mst_edges == self.n - 1:
                    break

        if mst_edges != self.n - 1:
            return -1

        return mst_weight
    
if __name__ == "__main__":
    graph = Graph(6)
    edges = ((0, 2, 7), (0, 4, 9), (2, 1, 5),
                   (2, 3, 1), (2, 5, 2), (3, 0, 6),
                   (3, 5, 2), (4, 5, 1), (5, 1, 6))
    for u, v, w in edges:
        graph.add(u, v, w)

    print(graph.min_cost())

    graph.remove(2, 3)

    print(graph.min_cost())