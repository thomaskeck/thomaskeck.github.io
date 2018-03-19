#! /usr/bin/env python
from utils import *
from sklearn import neural_network

classifier = neural_network.MLPClassifier(activation='tanh', hidden_layer_sizes=(3,), random_state=3, solver='lbfgs')
classifier.fit(train[['x', 'y']].values, train['cls'].values)
prediction = classifier.predict_proba(test[['x', 'y']].values)[:, 1]
print(score(train, classifier.predict_proba), score(test, classifier.predict_proba), score(full, classifier.predict_proba))
plotData(test)
plotContour(classifier.predict_proba)
savePlot('mpl_classifier.png')


