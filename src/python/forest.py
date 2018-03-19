#! /usr/bin/env python
from utils import *
import sklearn.ensemble

forest_classifier = sklearn.ensemble.GradientBoostingClassifier(subsample=0.5, max_depth=3, n_estimators=50)
forest_classifier.fit(train[['x', 'y']].values, train['cls'].values)
forest_prediction = forest_classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(forest_classifier.predict_proba)
savePlot('forest_classifier.png')
print(score(train, forest_classifier.predict_proba), score(test, forest_classifier.predict_proba), score(full, forest_classifier.predict_proba))


