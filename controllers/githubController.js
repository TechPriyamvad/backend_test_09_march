const githubService = require('../services/githubService');

class GitHubController {
  async getUserData(req, res, next) {
    try {
      const userData = await githubService.getUserData();
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getRepoData(req, res, next) {
    try {
      const { repoName } = req.params;
      const repoData = await githubService.getRepoData(repoName);
      res.json(repoData);
    } catch (error) {
      next(error);
    }
  }

  async createIssue(req, res, next) {
    try {
      const { repoName } = req.params;
      const { title, body } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Issue title is required' });
      }
      
      const issue = await githubService.createIssue(repoName, { title, body });
      res.status(201).json({
        message: 'Issue created successfully',
        issueUrl: issue.html_url,
        issueData: issue
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GitHubController();