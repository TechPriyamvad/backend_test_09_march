import express from 'express';
import GitHubController from '../controllers/githubController.js';

const router = express.Router();
const githubController = new GitHubController();

export const setRoutes = (app) => {
    app.use('/github', router);
    router.get('/', githubController.getGitHubData);
    router.get('/:repoName', githubController.getRepoData);
    router.post('/:repoName/issues', githubController.createIssue);
};