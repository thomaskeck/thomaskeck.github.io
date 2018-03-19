import pydot
import subprocess

import pandas as pd
import numpy as np
import sklearn.tree
import seaborn as sns
import matplotlib.pyplot as plt

from utils import *

def overfitting(depth):
    dt = sklearn.tree.DecisionTreeClassifier(min_impurity_split=0, criterion='entropy', max_depth=depth)
    dt.fit(train[['x', 'y']].values, train['cls'].values)
    return score(full, dt.predict_proba), score(train, dt.predict_proba), score(test, dt.predict_proba)


dt = sklearn.tree.DecisionTreeClassifier(min_impurity_split=0, criterion='entropy')
dt.fit(train[['x', 'y']].values, train['cls'].values)
print("Train max", score(train, dt.predict_proba))
print("Test max", score(test, dt.predict_proba))
print("Full max", score(full, dt.predict_proba))
plotData(train)
plotContour(dt.predict_proba)
savePlot("full_contour_train.png")

plotData(test)
plotContour(dt.predict_proba)
savePlot("full_contour_test.png")

dt = sklearn.tree.DecisionTreeClassifier(min_impurity_split=0, criterion='entropy', max_depth=2)
dt.fit(train[['x', 'y']].values, train['cls'].values)
print("Train simple", score(train, dt.predict_proba))
print("Test simple", score(test, dt.predict_proba))
print("Full simple", score(full, dt.predict_proba))
plotData(test)
plotContour(dt.predict_proba)
savePlot("simple_contour_test.png")

for i in list(range(1, 15)) + [30]:
    dt = sklearn.tree.DecisionTreeClassifier(min_impurity_split=0, criterion='entropy', max_depth=i)
    dt.fit(train[['x', 'y']].values, train['cls'].values)
    plot_tree(dt, i)

depths = list(range(1, 20))
train_scores = [overfitting(d)[0] for d in depths]
test_scores = [overfitting(d)[1] for d in depths]
print(train_scores)
print(test_scores)

plt.plot(depths, train_scores)
plt.plot(depths, test_scores)
plt.show()
