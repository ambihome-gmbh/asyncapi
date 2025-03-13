import matplotlib.pyplot as plt
import numpy as np
import json


with open('random.json', 'r') as f:
    numbers = json.load(f)

# Plot histogram
plt.figure(figsize=(8, 5))
plt.hist(numbers, bins=50, density=True, alpha=0.6, edgecolor='black')

# Fit a normal distribution curve
mu, sigma = np.mean(numbers), np.std(numbers)
x = np.linspace(min(numbers), max(numbers), 100)
plt.plot(x, (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma) ** 2), linewidth=2)

# Labels and title
plt.xlabel('Value')
plt.ylabel('Density')
plt.title(f'Histogram of Generated Gaussian Numbers (μ={mu:.2f}, σ={sigma:.2f})')

# Show plot
plt.show()
