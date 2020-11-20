module.exports = (url, init) => {
  if (process.env.TEST_ENV) {
    // in test environment we proxy the request to our local test server
    url = url.replace(new URL(url).origin, `http://localhost:${process.env.TEST_SERV_PORT}`)
  }
  return require('node-fetch')(url, init)
}
