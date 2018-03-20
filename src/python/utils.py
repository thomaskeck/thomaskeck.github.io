import pydot
import subprocess

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import sklearn
import sklearn.tree

sns.set(font_scale=3.2)
sns.set_style("white")

train = pd.read_csv('../../talks/animations/train_dataset.csv')
test = pd.read_csv('../../talks/animations/test_dataset.csv')
full = pd.read_csv('../../talks/animations/full_dataset.csv')

def savePlot(filename):
    figure = plt.gcf()
    figure.set_size_inches(20, 12)
    plt.savefig(filename, transparent=True)
    plt.clf()

def plotData(X):
    plt.scatter(X.loc[X['cls'] == 1, 'x'], X.loc[X['cls'] == 1, 'y'], marker='o', s=150, color='#f05050')
    plt.scatter(X.loc[X['cls'] == 0, 'x'], X.loc[X['cls'] == 0, 'y'], marker='o', s=150, color='#5050f0')
    plt.xlim((-2.5, 2.5))
    plt.ylim((-3.5, 4))
    sns.despine()

def plotContour(response, stepsize=0.01):
    support = np.arange(-5.0, 5.0, stepsize)
    R = np.array([[float(response(np.array([[x,y]]))[:, 1]) for x in support] for y in support])
    X, Y = np.meshgrid(support, support)
    return plt.contourf(X, Y, R ,alpha=0.35, cmap=plt.cm.Greys)

def plot_tree(dt, depth):
    from sklearn.externals.six import StringIO
    dot_data = StringIO()
    sklearn.tree.export_graphviz(dt, out_file=dot_data, feature_names=['x', 'y'], class_names=['Background', 'Signal'], filled=True, rounded=True, special_characters=True, impurity=False, proportion=True, label='root')
    graph = pydot.graph_from_dot_data(dot_data.getvalue())
    graph[0].write_png('tree_visualization_{depth}.png'.format(depth=depth))
    subprocess.call("convert -resize 2000x1200 tree_visualization_{depth}.png -transparent white tree_visualization_{depth}.png".format(depth=depth), shell=True)

def score(data, response):
    return 1 - ((response(data[['x', 'y']].values)[:,0] < 0.5) == (data.cls==1)).mean()
