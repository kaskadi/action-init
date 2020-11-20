/* eslint prefer-promise-reject-errors: off */
module.exports = (utils, repo) => {
  const token = process.env.CC_TOKEN
  if (!token) {
    return Promise.reject('ERROR: no CC_TOKEN environment variable found. Please provide your Code Climate token as CC_TOKEN environment variable...')
  }
  return checkRepo(utils, repo)
    .then(repoExists => {
      if (!repoExists) {
        return Promise.reject(`ERROR: repository ${repo} is either private or does not exist. Not proceeding to add it to Code Climate...`)
      }
      return addRepo(utils, repo, token)
    })
}

function checkRepo ({ fetch }, repo) {
  const init = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }
  return fetch(`https://api.github.com/repos/${repo}`, init).then(res => res.status === 200)
}

function addRepo ({ fetch, checkStatus }, repo, token) {
  console.log('INFO: adding repository to Code Climate...')
  const body = {
    data: {
      type: 'repos',
      attributes: { url: `https://github.com/${repo}` }
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
  return fetch('https://api.codeclimate.com/v1/github/repos', init)
    .then(checkStatus('ERROR: could not add repository to Code Climate...'))
    .then(res => {
      console.log('SUCCESS: repository added to Code Climate!')
      return res.json()
    })
}
