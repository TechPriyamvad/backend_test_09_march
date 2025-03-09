class GitHubController {
    constructor(githubService) {
        this.githubService = githubService;
    }

    async getGitHubData(req, res) {
        try {
            const userData = await this.githubService.fetchUserData();
            res.json(userData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch GitHub data' });
        }
    }

    async getRepoData(req, res) {
        const { repoName } = req.params;
        try {
            const repoData = await this.githubService.fetchRepoData(repoName);
            res.json(repoData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch repository data' });
        }
    }

    async createIssue(req, res) {
        const { repoName } = req.params;
        const { title, body } = req.body;
        try {
            const issueUrl = await this.githubService.createGitHubIssue(repoName, title, body);
            res.json({ url: issueUrl });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create issue' });
        }
    }
}

export default GitHubController;