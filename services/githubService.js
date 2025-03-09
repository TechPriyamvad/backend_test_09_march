require('dotenv').config();
const axios = require('axios');

class GitHubService {
  constructor() {
    this.apiUrl = process.env.GITHUB_API_URL;
    this.username = process.env.GITHUB_USERNAME;
    this.token = process.env.GITHUB_TOKEN;
    this.axiosInstance = axios.create({
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  }

  async getUserData() {
    try {
      const [userResponse, reposResponse, followersResponse, followingResponse] = await Promise.all([
        this.axiosInstance.get(`${this.apiUrl}/users/${this.username}`),
        this.axiosInstance.get(`${this.apiUrl}/users/${this.username}/repos`),
        this.axiosInstance.get(`${this.apiUrl}/users/${this.username}/followers`),
        this.axiosInstance.get(`${this.apiUrl}/users/${this.username}/following`)
      ]);

      return {
        profile: userResponse.data,
        repositories: reposResponse.data,
        followers: followersResponse.data.length,
        following: followingResponse.data.length
      };
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw new Error('Failed to fetch GitHub user data');
    }
  }

  async getRepoData(repoName) {
    try {
      const response = await this.axiosInstance.get(
        `${this.apiUrl}/repos/${this.username}/${repoName}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching repo ${repoName}:`, error.message);
      throw new Error(`Repository '${repoName}' not found or not accessible`);
    }
  }

  async createIssue(repoName, issueData) {
    try {
      const response = await this.axiosInstance.post(
        `${this.apiUrl}/repos/${this.username}/${repoName}/issues`,
        {
          title: issueData.title,
          body: issueData.body
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating issue in repo ${repoName}:`, error.message);
      throw new Error('Failed to create issue');
    }
  }
}

module.exports = new GitHubService();