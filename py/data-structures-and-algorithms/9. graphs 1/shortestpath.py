class Graph:
    def __init__(self, n):
        self.n = n
        self.adj_list = {i: [] for i in range(n)}

    def add(self, u, v, w):
        self.adj_list[u].append((v, w))

    def shortest_path(self, start, end):
        infinity = 1000000000
        D = [infinity] * self.n
        D[start] = 0

        visited = [False] * self.n
        prev_vertex = [None] * self.n

        def dijkstra():
            min_dist = infinity
            min_vertex = -1
            for i in range(self.n):
                if not visited[i] and D[i] < min_dist:
                    min_dist = D[i]
                    min_vertex = i
            return min_vertex

        for _ in range(self.n):
            v = dijkstra()
            if v == -1:
                break
            visited[v] = True
            for neighbor, weight in self.adj_list[v]:
                if D[neighbor] > D[v] + weight:
                    D[neighbor] = D[v] + weight
                    prev_vertex[neighbor] = v

        if D[end] == infinity:
            print(-1)
            return

        path = []
        current = end
        while current is not None:
            path.append(current)
            current = prev_vertex[current]
        path.reverse()
        print(" ".join(map(str, path)))


if __name__ == "__main__":

    graph = Graph(10)
    connections = ((0, 1, 25), (0, 2,  6), (1, 3, 10),
                   (1, 4,  3), (2, 3,  7), (2, 5, 25),
                   (3, 4, 12), (3, 5, 15), (3, 6,  4),
                   (3, 7, 15), (3, 8, 20), (4, 7,  2),
                   (5, 8,  2), (6, 7,  8), (6, 8, 13),
                   (6, 9, 15), (7, 9,  5), (8, 9,  1))
    for u, v, w in connections:
        graph.add(u, v, w)

    graph.shortest_path(0, 9)
