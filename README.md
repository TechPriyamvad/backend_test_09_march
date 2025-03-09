# GitHub API Integration

A Node.js backend service that integrates with GitHub API to show user activity and repository information.

## Overview

This application provides a REST API's that connects to the GitHub API to fetch user data, repository information, and allows creating issues in repositories. It's built using Express.js and designed to be deployed on Vercel.

## Features

- Fetch GitHub profile data (followers, following, repositories)
- Get detailed information about specific repositories
- Create issues in repositories

## API Endpoints

### GET `/github`
Returns user profile data including:
- Profile information
- List of repositories
- Number of followers
- Number of following


### GET `/github/:repoName`
Returns detailed information about a specific repository.



### POST `/github/:repoName/issues`
Creates a new issue in the specified repository.

**Request Body:**
```json
{
  "title": "Issue title",
  "body": "Issue description"
}
```

## Prerequisites

- Node.js (v14 or higher)
- GitHub account with a personal access token

# Installation

- Clone the repository
```json
git clone <repository-url>
cd backend_test_09_03_2025
```
- Install dependencies
```json
npm install
```
- Create a .env file based on the .env.example
- Update the .env file with your GitHub credentials
- To create a GitHub token:
  - Go to GitHub → Settings → Developer settings → Personal access tokens
  - Generate a new fine grained token with repo scope (for creating issues) with below setup
    -  provide all repositories access
    -  In repository permission
       -  enable read access for content and metadata parameter
       -  enable read and write access for issues parameter
- How to run locally
```json
npm run start
```
    - The server will start on port 3000 (or the port specified in your environment).

## Testing

### Using postman

- Import the following requests into Postman using curls provided
  
#### Get user data

- Method: GET
- URL: http://localhost:3000/github

curl --location 'http://localhost:3000/github'

#### Get Repository Data

- URL: http://localhost:3000/github/{repo-name}
- Replace {repo-name} with an actual repository name

curl --location 'http://localhost:3000/github/event-booking-system'

#### Create issue

- Method: POST
- URL: http://localhost:3000/github/{repo-name}/issues
- Replace {repo-name} with an actual repository name
- Body (raw JSON):
```json
{
  "title": "Test Issue",
  "body": "This is a test issue created via API"
}
```
curl --location 'http://localhost:3000/github/web-development/issues' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Test Issue5 created from API",
  "body": "This is a test issue created via the API."
}'

## Common Issues
- 401 Unauthorized: Check if your GitHub token is valid
- 403 Forbidden: Your token might not have the required permissions
- 404 Not Found: Repository might not exist or you might not have access to it