const fetch = (url, init = {}) => {
  if (process.env.TEST_ENV) {
    // in test environment we proxy the request to our local test server
    url = url.replace(new URL(url).origin, `http://localhost:${process.env.TEST_SERV_PORT}`)
  }
  require('node-fetch')(url, init)
}

module.exports = () => {
  const token = process.env.CC_TOKEN
  if (!token) {
    console.log('ERROR: no CC_TOKEN environment variable found. Please provide your Code Climate token as CC_TOKEN environment variable...')
    return
  }
  const repo = process.env.GITHUB_REPOSITORY
  return addRepo(repo, token)
}

function checkRepo (repo) {
  const init = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }
  return fetch(`https://api.github.com/repos/${repo}`, init).then(res => res.status === 200)
}

async function addRepo (repo, token) {
  const repoExists = await checkRepo(repo)
  if (!repoExists) {
    console.log(`ERROR: repository ${repo} is either private or does not exist. Not proceeding to add it to Code Climate...`)
    return
  }
  console.log('INFO: adding repository to Code Climate...')
  const body = {
    data: {
      type: 'repos',
      attributes: {
        url: `https://github.com/${repo}`
      }
    }
  }
  const init = {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Token token=${token}`
    },
    body: JSON.stringify(body)
  }
  return fetch('https://api.codeclimate.com/v1/github/repos', init).then(res => { console.log('SUCCESS: repository added to Code Climate!') })
}
