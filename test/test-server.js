// this is a mockup server to emulate response from external services
const express = require('express')
const app = express()
const port = process.env.TEST_SERV_PORT

app.use(express.json())

app.get('/repos/:owner/:name', (req, res) => {
  process.env.GITHUB_API_CALL = true
  const { owner, name } = req.params
  if (owner === 'test' && name === 'test') {
    process.env.REPO_PUBLIC = true
    res.send('OK')
  } else {
    process.env.REPO_PUBLIC = false
    res.status(404).send('Not found...')
  }
})

app.post('/v1/github/repos', (req, res) => {
  process.env.CC_API_CALL = true
  res.status(201).json({})
})

app.listen(port, () => {
  console.log(`READY: test server started at http://localhost:${port}`)
})
