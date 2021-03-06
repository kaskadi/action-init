/* eslint prefer-promise-reject-errors: off */
module.exports = (utils, repo) => repoData => {
  const ghToken = process.env.GH_ACCESS_TOKEN
  if (!ghToken) {
    utils.warning('No GH_ACCESS_TOKEN environment variable found.')
    return Promise.reject('ERROR: no GH_ACCESS_TOKEN environment variable found. Please provide your GitHub personal access token with repo scope as GH_ACCESS_TOKEN environment variable...')
  }
  const reporterId = repoData.data.attributes.test_reporter_id
  if (!reporterId) {
    utils.warning('Unable to automatically set REPORTER_ID secret, please update it manually.')
    return Promise.reject('ERROR: no test reporter ID was provided by Code Climate - it may be that the repository is not ready on their side just yet. Please proceed to add the REPORTER_ID secret to your GitHub repository manually...')
  }
  const baseInit = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${ghToken}`
    }
  }
  return getPublicKey(utils, repo, baseInit).then(addSecret(utils, repo, reporterId, baseInit))
}

function getPublicKey ({ fetch, checkStatus }, repo, baseInit) {
  console.log('INFO: retrieving repository secrets\' public key...')
  return fetch(`https://api.github.com/repos/${repo}/actions/secrets/public-key`, { ...baseInit })
    .then(checkStatus(`ERROR: unable to retrieve public key for ${repo}. To make sure this does not come from access right to GitHub API, please provide a GITHUB_TOKEN to this action which has repo scope.`))
    .then(res => {
      console.log('SUCCESS: successfully retrieved repository secrets\' public key!')
      return res.json()
    })
}

function addSecret ({ fetch, checkStatus }, repo, reporterId, baseInit) {
  return pubKey => {
    console.log('INFO: updating REPORTER_ID secret in repository...')
    const sodium = require('tweetsodium')
    const idBytes = Buffer.from(reporterId)
    const keyBytes = Buffer.from(pubKey.key, 'base64')
    const encryptedBytes = sodium.seal(idBytes, keyBytes)
    const body = {
      encrypted_value: Buffer.from(encryptedBytes).toString('base64'),
      key_id: pubKey.key_id
    }
    const init = {
      ...baseInit,
      method: 'PUT',
      body: JSON.stringify(body)
    }
    return fetch(`https://api.github.com/repos/${repo}/actions/secrets/REPORTER_ID`, init)
      .then(checkStatus(`ERROR: unable to set REPORTER_ID secret for ${repo}. To make sure this does not come from access right to GitHub API, please provide a GITHUB_TOKEN to this action which has repo scope.`))
      .then(() => {
        console.log('SUCCESS: successfully updated REPORTER_ID secret in repository!')
      })
  }
}
