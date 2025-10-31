import numpy as np

grid = [
    ["S", 0, -1, "G"],
    [0, -10, 0, 0],
    [0, 0, 0, -10],
    [0, -1, 0, 0],
]

n, m = 4, 4
gamma = 0.9
actions = ["U", "D", "L", "R"]
action_arrows = {"U": "↑", "D": "↓", "L": "←", "R": "→"}

rewards = np.zeros((n, m))
goal_state = (0, 3)

for i in range(n):
    for j in range(m):
        if grid[i][j] == "G":
            rewards[i][j] = 10
        elif grid[i][j] == "S":
            rewards[i][j] = 0
        else:
            rewards[i][j] = grid[i][j]

def move(i, j, action):
    if action == "U":
        return max(i - 1, 0), j
    if action == "D":
        return min(i + 1, n - 1), j
    if action == "L":
        return i, max(j - 1, 0)
    if action == "R":
        return i, min(j + 1, m - 1)

def get_transitions(i, j, action):
    """Returns [(prob, next_state, reward)] for given action"""
    if (i, j) == goal_state:
        return [(1.0, (i, j), rewards[i][j])]

    if action == "U":
        directions = [("U", 0.8), ("L", 0.1), ("R", 0.1)]
    elif action == "D":
        directions = [("D", 0.8), ("L", 0.1), ("R", 0.1)]
    elif action == "L":
        directions = [("L", 0.8), ("U", 0.1), ("D", 0.1)]
    else:
        directions = [("R", 0.8), ("U", 0.1), ("D", 0.1)]

    result = []
    for a, prob in directions:
        ni, nj = move(i, j, a)
        result.append((prob, (ni, nj), rewards[ni][nj]))
    return result

def value_iteration(theta=1e-4, max_iterations=1000):
    V = np.zeros((n, m))
    policy = np.full((n, m), " ", dtype=str)

    for _ in range(max_iterations):
        delta = 0
        new_V = np.copy(V)

        for i in range(n):
            for j in range(m):
                if (i, j) == goal_state:
                    continue
                values = []
                for a in actions:
                    q_value = 0
                    for prob, (ni, nj), reward in get_transitions(i, j, a):
                        q_value += prob * (reward + gamma * V[ni][nj])
                    values.append(q_value)

                best_value = max(values)
                new_V[i][j] = best_value
                delta = max(delta, abs(V[i][j] - best_value))

        V = new_V
        if delta < theta:
            break

    for i in range(n):
        for j in range(m):
            if (i, j) == goal_state:
                policy[i][j] = "G"
                continue
            values = []
            for a in actions:
                q_value = 0
                for prob, (ni, nj), reward in get_transitions(i, j, a):
                    q_value += prob * (reward + gamma * V[ni][nj])
                values.append(q_value)
            best_action = actions[np.argmax(values)]
            policy[i][j] = action_arrows[best_action]

    return V, policy

if __name__ == "__main__":
    V, policy = value_iteration()
    print("\nOptimal Value Function:")
    print(np.round(V, 2))
    print("\nOptimal Policy:")
    for row in policy:
        print(" ".join(row))
