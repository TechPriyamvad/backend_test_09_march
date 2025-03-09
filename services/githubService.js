class GitHubService {
    constructor(axios, config) {
        this.axios = axios;
        this.baseUrl = config.baseUrl;
        this.token = config.token;
    }

    async fetchUserData(username) {
        try {
            const response = await this.axios.get(`${this.baseUrl}/users/${username}`, {
                headers: {
                    Authorization: `token ${this.token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching user data from GitHub API');
        }
    }

    async fetchRepoData(username, repoName) {
        try {
            const response = await this.axios.get(`${this.baseUrl}/repos/${username}/${repoName}`, {
                headers: {
                    Authorization: `token ${this.token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching repository data from GitHub API');
        }
    }

    async createGitHubIssue(username, repoName, title, body) {
        try {
            const response = await this.axios.post(`${this.baseUrl}/repos/${username}/${repoName}/issues`, {
                title,
                body
            }, {
                headers: {
                    Authorization: `token ${this.token}`
                }
            });
            return response.data.html_url;
        } catch (error) {
            throw new Error('Error creating issue in GitHub repository');
        }
    }
}

export default GitHubService;