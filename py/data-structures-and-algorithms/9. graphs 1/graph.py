class Graph:
    def __init__(self, n):
        self.n = n
        self.adj_list = {i: [] for i in range(n)}

    def dft(self, start):
        visited = [False] * self.n

        def dfs_recursive(v):
            if visited[v]:
                return
            print(v, end=" ")
            visited[v] = True

            for neighbor in sorted(self.adj_list[v]):
                dfs_recursive(neighbor)

        dfs_recursive(start)
        
        print()  

    def add(self, u, v):
        if v not in self.adj_list[u]:
            self.adj_list[u].append(v)
        if u not in self.adj_list[v]:
            self.adj_list[v].append(u)

    def remove(self, u, v):
        if v in self.adj_list[u]:
            self.adj_list[u].remove(v)
        if u in self.adj_list[v]:
            self.adj_list[v].remove(u)

if __name__ == "__main__":
    graph = Graph(6)
    connections = ((0, 2), (0, 4), (2, 1),
                   (2, 3), (2, 5), (3, 0),
                   (3, 5), (4, 5), (5, 1))
    for u, v in connections:
        graph.add(u, v)
        
    graph.dft(0)

    graph.remove(0, 2)
    graph.remove(2, 5)
    graph.remove(1, 4)

    graph.dft(0)