import sys
import json
import numpy as np
from sklearn.cluster import AgglomerativeClustering
from sklearn.mixture import GaussianMixture

# Debug: Print input data
print("Input data received:", sys.argv[1], file=sys.stderr)

# Load data from command line
try:
    data = json.loads(sys.argv[1])
    X = np.array([list(d.values()) for d in data])
except Exception as e:
    print(f"Error parsing input data: {e}", file=sys.stderr)
    sys.exit(1)

# Debug: Print processed data
print("Processed data:", X, file=sys.stderr)

# Hierarchical Clustering
try:
    hierarchical = AgglomerativeClustering(n_clusters=3)
    hierarchical_labels = hierarchical.fit_predict(X)
except Exception as e:
    print(f"Error in hierarchical clustering: {e}", file=sys.stderr)
    sys.exit(1)

# Gaussian Mixture Model
try:
    gmm = GaussianMixture(n_components=3)
    gmm_labels = gmm.fit_predict(X)
except Exception as e:
    print(f"Error in Gaussian Mixture Model: {e}", file=sys.stderr)
    sys.exit(1)

# Combine results (you can choose one or combine both)
final_labels = hierarchical_labels  # or gmm_labels

# Debug: Print final labels
print("Final cluster labels:", final_labels, file=sys.stderr)

# Output cluster labels
print(json.dumps(final_labels.tolist()))