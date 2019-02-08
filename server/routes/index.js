const express = require('express');
const router = express.Router();
const projectController = require('./projectController');
const featureController = require('./featureController');


router.get('/projectList', projectController.getProjectList);
router.post('/addProject', projectController.addProject);

router.get('/featureList/:projectId', featureController.getFeatureList);
router.post('/addFeature', featureController.addFeature);


module.exports = router;