# OCEAN Evaluator
OCEAN Evaluator is a tool for evaluating projects in terms of the psychological motivation factors that a project satisfies. By understanding what kinds of motivations a project may satisfy, teams will have deeper insight into the kind of product it is and the kind of market it appeals to. This tool is based on Jason Vandenberghe's "Domain's of Play" research correlating facets in the OCEAN model to video game mechanics and player purchasing patterns.

OCEAN Evaluator is a work in progress, currently boasting only its most basic features and nearly no design.

## Walkthrough
![alt Home](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/home.png)
This is the home page. It offers a brief explanation of the project (yes, it's very ugly for now -- I promise actual design is coming!).

Click on the link at the bottom to go to the "Projects" page.

### Create a Project
![alt Projects](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/projectsEmpty.png)
This is the "Projects" page. We currently have no projects. To create a project, click the add button.

![alt Add Project](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/addProject.png)
This is the form for adding a new project. Let's fill it out with a hypothetical idea for a social network for cooking enthusiasts. Click "Submit" to finalize your project.

![alt Projects](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/projectsUpdate.png)
We can see our new project! To view this project and perform analysis, click on the project link.

### Add a Feature
![alt Project Evaluator](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/projectEvaluationEmpty.png)
We're now looking at our project info, but there isn't anything there. Now we get to see this thing. It has no content. In order to add data, add features.

![alt Add Feature](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/addFeature.png)
First, add the feature basic data. Here, we're adding a feature describing recipe sharing on the network.

![alt Add Feature](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/addFeatureOceanData.png)
Now, let's add the OCEAN data. Click the "Add Ocean Factor" button and select any of the five factors from the dropdown. Add values to any of the facets. Here, we're adding an "Adventurousness" score of 60.

After adding a few more scores, we'll click "Save" to finalize this feature.

### View Features
![alt View Features](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/viewFeatures.png)
Now that we have a feature, our evaluation card has some data in the facets we put scores in. To check our features, click the "View All Features" button.

![alt Add Feature](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/addFeatureOceanData2.png)
Things get more interesting when you have multiple features affecting the same facet. Let's add another feature with an "Adventurousness" score.

![alt Project Evaluator](https://github.com/JusticeSquad/OceanEvaluator/blob/master/images/projectEvaluation.png)
Each facet score across all features are aggregated in the main evaluator section, as can be seen with the "Achievement-striving" and "Cautiousness" facets that come from different features. "Adventurousness" has multiple scores, so the evaluation accepts the highest score to emphasize the extremes that the project satisfies.

## Status
OCEAN Evaluator has its basic functionality in place. Teams are able to create a project, add features to that project, and view summary panels that evaluate the OCEAN data from those features.

Outstanding features include:
- Add Material UI & responsive design
- Design / usability improvements for viewing data
- Add User Login & Permissions
- Add editing existing features and projects
- Add reminder information for OCEAN factors and facets
- Add splitting a project into different versions that can be easily compared to each other
- Add different options for evaluating OCEAN scores

## Installation
Requires NodeJS. [Download the latest version from the main site and follow the instructions to install.](https://nodejs.org/en/download/)

After installing NodeJS and downloading OCEAN Evaluator, go to the root directory and enter the following commands to install the dependencies:

```
$ cd client
$ npm install
$ cd ..\server
$ npm install
```

Once the dependencies are installed, run with the following command inside the server folder:

```
$ npm start
```

To run the tests, use the following command inside the server folder:

```
$ npm test
```

## References
- [OCEAN Factors / Facets Explanation](http://www.testsonthenet.com/Factors-facets.htm)
- [OCEAN Facets Cheat Sheet](https://www.ets.org/s/workforce_readiness/pdf/21332_big_5.pdf)
- [Jason Vandenberghe's Talk on Domains of Play](https://www.youtube.com/watch?v=cnZ9Fx_tsE8)