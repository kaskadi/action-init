const baseInit = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}` // this will always be there but may not have the proper scope
  }
}

module.exports = (utils, repo) => repoData => getPublicKey(utils, repo).then(addSecret(utils, repo, repoData))

function getPublicKey ({ fetch, checkStatus }, repo) {
  return fetch(`https://api.github.com/repos/${repo}/actions/secrets/public-key`, { ...baseInit })
    .then(checkStatus(`ERROR: unable to retrieve public key for ${repo}. To make sure this does not come from access right to GitHub API, please provide a GITHUB_TOKEN to this action which has repo scope.`))
    .then(res => res.json())
}

function addSecret ({ fetch, checkStatus }, repo, repoData) {
  return pubKey => {
    const sodium = require('tweetsodium')
    const idBytes = Buffer.from(repoData.data.attributes.test_reporter_id)
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
    return fetch(`https://api.github.com/repos/${repo}/actions/secrets/CC_REPORTER_ID`, init)
      .then(checkStatus(`ERROR: unable to set CC_REPORTER_ID secret for ${repo}. To make sure this does not come from access right to GitHub API, please provide a GITHUB_TOKEN to this action which has repo scope.`))
  }
}
