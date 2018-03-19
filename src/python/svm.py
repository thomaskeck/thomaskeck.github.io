#! /usr/bin/env python
from utils import *

import sklearn.svm

# Linear SVM
linear_svm_classifier = sklearn.svm.SVC(kernel='linear', probability=True)
linear_svm_classifier.fit(train[['x', 'y']].values, train['cls'].values)
linear_svm_prediction = linear_svm_classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(linear_svm_classifier.predict_proba)
savePlot('linear_svm_classifier.png')
print(score(train, linear_svm_classifier.predict_proba), score(test, linear_svm_classifier.predict_proba), score(full, linear_svm_classifier.predict_proba))

# rbf SVM
rbf_svm_classifier = sklearn.svm.SVC(kernel='rbf', probability=True)
rbf_svm_classifier.fit(train[['x', 'y']].values, train['cls'].values)
rbf_svm_prediction = rbf_svm_classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(rbf_svm_classifier.predict_proba)
savePlot('rbf_svm_classifier.png')
print(score(train, rbf_svm_classifier.predict_proba), score(test, rbf_svm_classifier.predict_proba), score(full, rbf_svm_classifier.predict_proba))

# sigmoid SVM
poly_svm_classifier = sklearn.svm.SVC(kernel='poly', probability=True)
poly_svm_classifier.fit(train[['x', 'y']].values, train['cls'].values)
poly_svm_prediction = poly_svm_classifier.predict_proba(test[['x', 'y']].values)[:, 1]
plotData(test)
plotContour(poly_svm_classifier.predict_proba)
savePlot('poly_svm_classifier.png')
print(score(train, poly_svm_classifier.predict_proba), score(test, poly_svm_classifier.predict_proba), score(full, poly_svm_classifier.predict_proba))


