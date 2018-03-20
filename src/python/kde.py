#! /usr/bin/env python
from utils import *
import scipy.stats

sig_kde = scipy.stats.gaussian_kde(train[['x', 'y']][train.cls == 1].values.T)
bkg_kde = scipy.stats.gaussian_kde(train[['x', 'y']][train.cls == 0].values.T)

def kde_predict(x):
    f = sig_kde(x[0]) / (bkg_kde(x[0]) + sig_kde(x[0]))
    return np.array([[1-f, f]])

plotData(test)
plotContour(kde_predict, stepsize=0.03)
savePlot('kde_classifier.png')

def kde_predict(x):
    f = sig_kde(x.T) / (bkg_kde(x.T) + sig_kde(x.T))
    return np.vstack([1-f, f]).T

print(score(train, kde_predict), score(test, kde_predict), score(full, kde_predict))
