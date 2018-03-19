# Interesting articles on Machine Learning

An (incomplete) list of articles on Machine Learning that I read, mainly used as a reference I can access when I'm not at home


## On Deep Learning

Deep Learning is the current revolution ongoing in the field of machine learning. Everything from self-driving cars, speech recognition and playing Go can be accomplished using Deep Learning. There is a lot of research going on in HEP, howto take advantage of Deep Learning in our analysis. 

[Pierre Baldi, Peter Sadowski, and Daniel Whiteson. „Searching for Exotic Particles in High-Energy Physics with Deep Learning“](https://arxiv.org/abs/1402.4735)

[Henry W. Lin, Max Tegmark, and David Rolnick. Why does deep and cheap learning work so well?](https://arxiv.org/abs/1608.08225)

[Yann Lecun, Yoshua Bengio, and Geoffrey Hinton. „Deep learning“.](https://www.cs.toronto.edu/~hinton/absps/NatureDeepReview.pdf)

[Yoshua Bengio, Aaron C. Courville, and Pascal Vincent. „Unsupervised Feature Learning and Deep Learning: A Review and New Perspectives“.](https://arxiv.org/abs/1206.5538)


### Adversarial Networks

Adversarial networks allow to prevent that a neural networks uses a certain information in its prediction

[Gilles Louppe, Michael Kagan, and Kyle Cranmer. „Learning to Pivot with Adversarial Networks“.](https://arxiv.org/abs/1611.01046)


### Hyper Parameter Optimization
All multivariate methods have hyper-parameters, so some parameters which influence the performance of the algorithm and have to be set by the user. It is common to automatically optimize these hyper-parmaeters using different optimization algorithms. There are four different approaches: grid-search, random-search, gradient, bayesian

[James Bergstra and Yoshua Bengio. „Random Search for Hyper-parameter Optimization“](http://www.jmlr.org/papers/volume13/bergstra12a/bergstra12a.pdf)

[Dougal Maclaurin, David Duvenaud, and Ryan Adams. „Gradient-based Hyperparameter Optimization through Reversible Learning“.](http://jmlr.org/proceedings/papers/v37/maclaurin15.pdf)

[Jasper Snoek, Hugo Larochelle, and Ryan P Adams. „Practical Bayesian Optimization of Machine Learning Algorithms“.](http://papers.nips.cc/paper/4522-practical-bayesian-optimization-of-machine-learning-algorithms.pdf)


## On Boosted Decision Trees

Boosted decision trees are the working horse of classification / regression in HEP. They have a good out-of-the-box performance, are reasonable fast, and robust

[Jerome H. Friedman. „Stochastic gradient boosting“](http://statweb.stanford.edu/~jhf/ftp/stobst.pdf)

[Jerome H. Friedman. „Greedy Function Approximation: A Gradient Boosting Machine“](http://statweb.stanford.edu/~jhf/ftp/trebst.pdf)


### Boosting to Uniformity
Boosting to uniformity allows to enforce a uniform selection efficiency of the classifier for a certain variable to leave it untouched for a fit

[Justin Stevens, Mike Williams "uBoost: A boosting method for producing uniform selection efficiencies from multivariate classifiers"](https://arxiv.org/abs/1305.7248)

[Alex Rogozhnikov et al. „New approaches for boosting to uniformity“.](http://iopscience.iop.org/article/10.1088/1748-0221/10/03/T03002/meta)


## On Data Analysis Techniques

With sPlot you can train a classifier directly on data, other similar methods are: side-band substration and training data vs mc, both are described in the second paper below

[Muriel Pivk and Francois R. Le Diberder. „SPlot: A Statistical tool to unfold data distributions“.](https://arxiv.org/abs/physics/0402083)

[D. Martschei, M. Feindt, S. Honc, and J. Wagner-Kuhr. „Advanced event reweighting using multivariate analysis“.](http://iopscience.iop.org/article/10.1088/1742-6596/368/1/012028)


## On Machine Learning Tools and Frameworks

[**FastBDT**](https://github.com/thomaskeck/FastBDT)

[Thomas Keck. „FastBDT: A Speed-Optimized Multivariate Classification Algorithm for the Belle II Experiment“.](https://link.springer.com/article/10.1007/s41781-017-0002-8)

[**TMVA**](http://tmva.sourceforge.net/)

[Andreas Hoecker et al. „TMVA: Toolkit for Multivariate Data Analysis“.](https://arxiv.org/abs/physics/0703039)

[**FANN**](http://fann.sourceforge.net/)
[S. Nissen. Implementation of a Fast Artificial Neural Network Library (fann).](http://fann.sourceforge.net/fann.pdf)

[**SKLearn**](http://scikit-learn.org/)

[F. Pedregosa et al. „Scikit-learn: Machine Learning in Python“.](http://www.jmlr.org/papers/volume12/pedregosa11a/pedregosa11a.pdf)

[**hep_ml**](https://arogozhnikov.github.io/hep_ml/)

[**XGBoost**](Website https://xgboost.readthedocs.io/en/latest/)

[Tianqi Chen and Carlos Guestrin. „XGBoost: A Scalable Tree Boosting System“.](https://arxiv.org/abs/1603.02754)

[**Tensorflow**](https://www.tensorflow.org/)

[Martin Abadi et al. „TensorFlow: A system for large-scale machine learning“](https://arxiv.org/abs/1605.08695)

[**Theano**](http://deeplearning.net/software/theano/)

[Rami Al-Rfou et al. „Theano: A Python framework for fast computation of mathematical expressions“](https://arxiv.org/abs/1605.02688)

[**NeuroBayes**](https://github.com/blue-yonder/NeurobayesCppInterface)

[M. Feindt and U. Kerzel. „The NeuroBayes neural network package“](http://www-ekp.physik.uni-karlsruhe.de/~feindt/acat05-neurobayes)
