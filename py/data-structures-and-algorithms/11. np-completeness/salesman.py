def salesman(city_map):
    n = len(city_map)
    start_city = 0
    infinity = 1000000000

    def get_initial_bound():
        start_bound = 0
        for i in range(n):
            min1 = infinity
            min2 = infinity
            for j in range(n):
                if i != j:
                    if city_map[i][j] < min1:
                        min2 = min1
                        min1 = city_map[i][j]
                    elif city_map[i][j] < min2:
                        min2 = city_map[i][j]
            start_bound += (min1 + min2) / 2
        return start_bound

    def branch_and_bound(bound, visited, current_cost, best_cost, path, best_path):
        current_city = path[-1]

        if len(path) == n:
            total_cost = current_cost + city_map[current_city][start_city]
            if best_cost > total_cost:
                best_cost = total_cost
                best_path = path + [start_city]
            return best_cost, best_path

        for next_city in range(n):
            if next_city not in visited:
                new_cost = current_cost + city_map[current_city][next_city]

                if len(visited) == 1:
                    fix_bound = min(city_map[current_city])
                else:
                    fix_bound = 0

                new_bound = bound + city_map[current_city][next_city] - fix_bound

                if best_cost > new_bound:
                    best_cost, best_path = branch_and_bound( new_bound, visited | {next_city},  new_cost, best_cost, path + [next_city], best_path
                    )

        return best_cost, best_path

    best_cost = infinity
    best_path = []

    start_bound = get_initial_bound()
    best_cost, best_path = branch_and_bound(start_bound, {start_city}, 0, best_cost, [start_city], best_path)

    return best_path

if __name__ == "__main__":
    
    cost = 0

    city_map = [
    #     0   1   2   3   4
        [ 0, 12, 19, 16, 29],   # 0
        [12,  0, 27, 25,  5],   # 1
        [19, 27,  0,  8,  4],   # 2
        [16, 25,  8,  0, 14],   # 3
        [29,  5,  4, 14,  0]    # 4
        ]

    path = salesman(city_map)
    for i in range(len(city_map)):
        cost += city_map[path[i]][path[i+1]]
    
    print(path)
    print(cost)