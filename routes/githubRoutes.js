const express = require('express');
const githubController = require('../controllers/githubController');

const router = express.Router();

//Show user data
router.get('/', githubController.getUserData);

//Show repo data
router.get('/:repoName', githubController.getRepoData);

//Create an issue in particular repo
router.post('/:repoName/issues', githubController.createIssue);

module.exports = router;