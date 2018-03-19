This repository contains the exercises and slides in for of IPython notebooks
for the Scipy Stack Workshop at GridKA 2017
https://indico.scc.kit.edu/indico/event/285/session/2/contribution/7

The IPython notebooks will be discussed in the following order:
  * Introduction.ipynb
  * Numpy.ipynb
  * Matplotlib.ipynb
  * SciPy.ipynb
  * Pandas.ipynb
  * SymPy.ipynb
  * Optimization.ipynb (optional)
  
The slides can be generated out of the notebooks using:

ipython3 nbconvert Introduction.ipynb --to slides  --post serve

or since version 5.2.1 of nbconvert

jupyter nbconvert Introduction.ipynb --to slides --post serve --SlidesExporter.reveal_transition=cube --SlidesExporter.reveal_theme=sky


The necessary dataset for the pandas example is not in the repository,
but can be found here:
https://github.com/bpb27/political_twitter_archive
