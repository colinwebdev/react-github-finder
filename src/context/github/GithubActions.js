import axios from 'axios'
// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: process.env.REACT_APP_GITHUB_URL,
    headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
})

// Get search results
export async function searchUsers(text) {
    let params = new URLSearchParams({
        q: text,
    })
    const response = await github.get(`/search/users?${params}`)
    return response.data.items

}

// Get user and repos
export async function getUserAndRepos(login) {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {user: user.data, repos: repos.data}
}

