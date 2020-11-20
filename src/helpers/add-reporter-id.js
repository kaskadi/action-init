const baseInit = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}` // this will always be there but may not have the proper scope
  }
}

module.exports = (utils, repo) => repoData => {
  return getPublicKey(utils, repo).then(addSecret(utils, repo, repoData))
}

function getPublicKey ({ fetch, checkStatus }, repo) {
  const init = { ...baseInit }
  return fetch(`https://api.github.com/repos/${repo}/actions/secrets/public-key`, init)
    .then(checkStatus(`ERROR: unable to retrieve public key for ${repo}. To make sure this does not come from access right to GitHub API, please provide a GITHUB_TOKEN to this action which has repo scope.`))
    .then(res => res.json())
}

function addSecret ({ fetch, checkStatus }, repo, repoData) {
  return pubKey => {
    const sodium = require('tweetsodium')
    const value = repoData.data.attributes.test_reporter_id
    // Convert the message and key to Uint8Array's (Buffer implements that interface)
    const msgBytes = Buffer.from(value)
    const keyBytes = Buffer.from(pubKey.key, 'base64')
    // Encrypt using LibSodium.
    const encryptedBytes = sodium.seal(msgBytes, keyBytes)
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
      .then(res => res.json())
  }
}
