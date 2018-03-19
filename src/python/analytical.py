#! /usr/bin/env python
from utils import *
from sklearn import lda
from sklearn import qda

classifier = lda.LDA()
classifier.fit(train[['x', 'y']].values, train['cls'].values)
prediction = classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(classifier.predict_proba)
savePlot('lda_classifier.png')
print("LDA", score(train, classifier.predict_proba), score(test, classifier.predict_proba), score(full, classifier.predict_proba))

classifier = qda.QDA()
classifier.fit(train[['x', 'y']].values, train['cls'].values)
prediction = classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(classifier.predict_proba)
savePlot('qda_classifier.png')
print("LDA", score(train, classifier.predict_proba), score(test, classifier.predict_proba), score(full, classifier.predict_proba))
