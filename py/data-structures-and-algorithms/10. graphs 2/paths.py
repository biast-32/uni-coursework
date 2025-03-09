class Graph:
    def __init__(self, n):
        self.infinity = 1000000000
        self.n = n
        self.adj_matrix = [[self.infinity] * n for _ in range(n)]
        for i in range(n):
            self.adj_matrix[i][i] = 0

    def add(self, u, v, w):
        self.adj_matrix[u][v] = w

    def remove(self, u, v):
        self.adj_matrix[u][v] = self.infinity

    def all_paths(self):
        d = [r[:] for r in self.adj_matrix]

        for k in range(self.n):
            for i in range (self.n):
                for j in range(self.n):
                    if d[i][j] > d[i][k] + d[k][j]:
                        d[i][j] = d[i][k] + d[k][j]

        for i in range(self.n):
            for j in range(self.n):
                if d[i][j] == self.infinity:
                    d[i][j] = -1
                
        return d 

if __name__ == "__main__":
    graph = Graph(6)
    edges = ((0, 2, 7), (0, 4, 9), (2, 1, 5),
                   (2, 3, 1), (2, 5, 2), (3, 0, 6),
                   (3, 5, 2), (4, 5, 1), (5, 1, 6))
    for u, v, w in edges:
        graph.add(u, v, w)

    M = graph.all_paths()
    for weights in M:
        for weight in weights:
            print(f"{weight:3d}", end="")
        print()