#! /usr/bin/env python
from utils import *
import sklearn.ensemble

dt = sklearn.tree.DecisionTreeClassifier(max_depth=4)
dt.fit(train[['x', 'y']].values, train['cls'].values)
dt_prediction = dt.predict_proba(test[['x', 'y']].values)[:, 1]
print(score(train, dt.predict_proba), score(test, dt.predict_proba), score(full, dt.predict_proba))
plotData(test)
plotContour(dt.predict_proba)
savePlot('tree_classifier.png')


