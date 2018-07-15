# Machine Learning Lectures

This repository contains an updated version of my lectures and workshops given at:
  - The CERN Computing School in [Mol 2016](https://indico.cern.ch/event/502875/) and in [Madrid 2017](https://indico.cern.ch/event/581756/)
  - The [GRIDKA School in Karlsruhe 2017](https://indico.scc.kit.edu/indico/event/285/)
  - The [KSETA Topical Courses in Karlsruhe 2017](http://www.kseta.kit.edu/690.php)
  - The [Machine learning workshop in Paris 2018](http://www2.iap.fr/users/charnock/conferences/ML2018)

The talks are javascript and html-based using [reveal.js](https://revealjs.com/) and [d3.js](https://d3js.org/). They can be viewed online via github pages:
  - On [Traditional Machine Learning](https://thomaskeck.github.io/talks/MachineLearning.html)
  - On [Deep Learning](https://thomaskeck.github.io/talks/DeepLearning.html)
  - On [Machine Learning at KIT and Belle II](https://thomaskeck.github.io/talks/PhDThesis.html)

The workshops are provided as [jupyter notebooks](http://jupyter.org/), which can be served as [reveal.js](https://revealjs.com/) presentations.

## Howto clone this repository

This repository uses git submodules:

> git clone --recurse-submodules https://github.com/thomaskeck/thomaskeck.github.io


## Howto print the slides

There are two options to convert the html-based presentation into a printable pdf file
- Chrome: In chrome you can append ?print-pdf to the URL of the talk and print the website into a pdf. Check the preview in chrome in order to ensure that the output looks reasonable.
- [Decktape](https://github.com/astefanutti/decktape): with decktape you can render the html slides and take screenshots, this has the advantage that it works with the animations

I usually do something like this:
First I serve the slides on a local web-server using python

> python3 -m http.server

Afterwards I use decktape via docker to create screenshots of each rendered page with a large pause in between the screenshots to ensure that the animations finish.

> docker run --shm-size 2G --rm -t --net=host -v `pwd`:/slides astefanutti/decktape  generic --key=n --screenshots -p 15000 --max-slides 150 http://localhost:8000/talks/MachineLearning.html temp.pdf

Finally I remove all uninteresting slides by hand to create a clean version of the pdf.

> convert $(ls -v screenshots/*.png) machine_learning.pdf

## Deprecated Repositories

The original repositories with the previous content and exercises are available here:
  - [CSC Lecture](https://github.com/thomaskeck/MultivariateClassificationLecture)
  - [GridKA School](https://github.com/thomaskeck/GridKaSchool)


## Further Reading

An (incomplete) list of interesting books:

  - Christopher M. Bishop. Pattern Recognition and Machine Learning
  - Trevor Hastie, Robert Tibshirani, and Jerome Friedman. The Elements of Statistical Learning.
  - J. Han, M. Kamber, J. Pei. Data Mining: Concepts and Techniques 
  - O. Behnke, K. Kröninger, G. Scott, T. Schörner-Sadenius. Data Analysis in High Energy Physics: A Practical Guide to Statistical Methods
  - [I. Goodfellow, Y. Bengio, A. Courville. Deep Learning (Adaptive Computation and Machine Learning)](http://www.deeplearningbook.org/)
  - [R. S. Sutton, and A. G. Barto. Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book-2nd.html)


You can find a list of research publications I enjoyed reading [here](https://thomaskeck.github.io/articles/)

