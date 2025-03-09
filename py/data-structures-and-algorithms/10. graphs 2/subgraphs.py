class Graph:
    def __init__(self, n):
        self.n = n
        self.adj_list = {i: [] for i in range(n)}


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

    def subgraphs(self):
        visited = [False] * self.n
        k = 0

        def dfs(v):
            if visited[v]:
                return
            visited[v] = True
            for neighbour in self.adj_list[v]:
                if not visited[neighbour]:
                    dfs(neighbour)

        for v in range(self.n):
            if not visited[v]:
                k += 1
                dfs(v)
        
        return k

if __name__ == "__main__":
    graph = Graph(6)

    edges = ((0, 4), (2, 1), (2, 5), (3, 0), (5, 1))
    for u, v in edges:
        graph.add(u, v)
    
    print(graph.subgraphs())
    
    more_edges = ((0, 2), (2, 3), (3, 5), (4, 5))
    for u, v in more_edges:
        graph.add(u, v)

    print(graph.subgraphs())